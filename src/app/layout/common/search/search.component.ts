import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, HostBinding, Input, OnChanges, OnDestroy, OnInit, Output, Renderer2, SimpleChanges, ViewChild, ViewEncapsulation } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatAutocomplete } from '@angular/material/autocomplete';
import { debounceTime, filter, map, Subject, takeUntil } from 'rxjs';
import { fuseAnimations } from '@fuse/animations/public-api';
import { ProductService } from 'app/modules/admin/products/product.service';
import { cloneDeep } from 'lodash';
import { FuseNavigationItem, FuseNavigationService } from '@fuse/components/navigation';
import { defaultNavigation } from 'app/mock-api/common/navigation/data';
import { Router } from '@angular/router';

@Component({
    selector: 'search',
    templateUrl: './search.component.html',
    encapsulation: ViewEncapsulation.None,
    exportAs: 'fuseSearch',
    animations: fuseAnimations
})
export class SearchComponent implements OnChanges, OnInit, OnDestroy {
    @Input() appearance: 'basic' | 'bar' = 'basic';
    @Input() debounce: number = 300;
    @Input() minLength: number = 2;
    @Output() search: EventEmitter<any> = new EventEmitter<any>();

    opened: boolean = false;
    resultSets: any[];
    productsResults: any[] = [];
    locationsResults: any[] = [];
    productTypesResults: any[] = [];
    searchControl: UntypedFormControl = new UntypedFormControl();
    private _matAutocomplete: MatAutocomplete;
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    private readonly _defaultNavigation: FuseNavigationItem[] = defaultNavigation;
    /**
     * Constructor
     */
    constructor(
        private _elementRef: ElementRef,
        private _httpClient: HttpClient,
        private _renderer2: Renderer2,
        private _productService: ProductService,
        private _fuseNavigationService: FuseNavigationService,
        private router: Router,
        private cdr: ChangeDetectorRef
    ) {

    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Host binding for component classes
     */
    @HostBinding('class') get classList(): any {
        return {
            'search-appearance-bar': this.appearance === 'bar',
            'search-appearance-basic': this.appearance === 'basic',
            'search-opened': this.opened
        };
    }

    /**
     * Setter for bar search input
     *
     * @param value
     */
    @ViewChild('barSearchInput')
    set barSearchInput(value: ElementRef) {
        // If the value exists, it means that the search input
        // is now in the DOM, and we can focus on the input..
        if (value) {
            // Give Angular time to complete the change detection cycle
            setTimeout(() => {

                // Focus to the input element
                value.nativeElement.focus();
            });
        }
    }

    /**
     * Setter for mat-autocomplete element reference
     *
     * @param value
     */
    @ViewChild('matAutocomplete')
    set matAutocomplete(value: MatAutocomplete) {
        this._matAutocomplete = value;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On changes
     *
     * @param changes
     */
    ngOnChanges(changes: SimpleChanges): void {
        // Appearance
        if ('appearance' in changes) {
            // To prevent any issues, close the
            // search after changing the appearance
            this.close();
        }
    }


    onSelFunc(item) {


        switch (item.link) {
            case "products":
                this.router.navigate(['/products'], { queryParams: { page: item.title } });
                this._productService.productFilterString = item.title;
                break;

            case "pages":
                if (item.id == "productstype") {
                    item.id = "product-type";
                }
                if (item.id == "userdefinelist") {
                    item.id = "user-defined";
                }
                this.router.navigate(['/' + item.id]);
                break;

            case "locations":
                this.router.navigate(['/location'], { queryParams: { page: item.name } });
                break;
            case "productTypes":
                this.router.navigate(['/product-type'], { queryParams: { page: item.name } });
                break;

            default:
                break;
        }
        // this.close()

    }


    /**
     * On init
     */
    isSearchStart = false;
    ngOnInit(): void {
        // Subscribe to the search field value changes
        this.searchControl.valueChanges
            .pipe(
                debounceTime(this.debounce),
                takeUntil(this._unsubscribeAll),
                map((value) => {

                    if (value.length > 1) {
                        this.isSearchStart = true;
                        this.cdr.detectChanges();


                    }

                    // Set the resultSets to null if there is no value or
                    // the length of the value is smaller than the minLength
                    // so the autocomplete panel can be closed
                    if (!value || value.length < this.minLength) {
                        this.resultSets = null;
                    }

                    // Continue
                    return value;
                }),
                // Filter out undefined/null/false statements and also
                // filter out the values that are smaller than minLength

                filter(value => value && value.length >= this.minLength)
            )
            .subscribe((value) => {



                const query = value.toLowerCase();
                const flatNavigation = this._fuseNavigationService.getFlatNavigation(this._defaultNavigation);

                this._productService.globalSearchAPISources(value).subscribe(res => {
                    this.isSearchStart = false;
                    // Prepare the results array
                    const results = [];
                    const pagesResults = cloneDeep(flatNavigation)
                        .filter(page => (page.title?.toLowerCase().includes(query) || (page.subtitle && page.subtitle.includes(query))));

                    // If there are page results...
                    if (pagesResults.length > 0) {
                        // Normalize the results
                        pagesResults.forEach((result: any) => {

                            // Add the page title as the value
                            result.value = result.title;
                            result.link = "pages"
                        });

                        // Add to the results
                        results.push({
                            id: 'pages',
                            label: 'Pages',
                            results: pagesResults
                        });
                    }

                    this.productsResults = res.entity.products
                    // If there are contacts results...
                    if (this.productsResults.length > 0) {
                        // Normalize the results
                        this.productsResults.forEach((result) => {

                            // Add a link
                            // result.link = '/apps/contacts/' + result.Title;

                            result.link = 'products';
                            // Add the name as the value
                            result.value = result.Title;
                        });

                        // Add to the results
                        results.push({
                            id: 'products',
                            label: 'Products',
                            results: this.productsResults
                        });
                    }

                    this.locationsResults = res.entity.locations
                    // If there are tasks results...
                    if (this.locationsResults.length > 0) {
                        // Normalize the results
                        this.locationsResults.forEach((result) => {

                            // Add a link
                            result.link = 'locations';

                            // Add the title as the value
                            result.value = result.name;
                            if (result.tags) {
                                result.tagsarray = result.tags.split(',');
                            }
                        });

                        // Add to the results
                        results.push({
                            id: 'locations',
                            label: 'Locations',
                            results: this.locationsResults
                        });
                    }

                    this.productTypesResults = res.entity.productTypes
                    // If there are tasks results...
                    if (this.productTypesResults.length > 0) {
                        // Normalize the results
                        this.productTypesResults.forEach((result) => {

                            // Add a link
                            result.link = 'productTypes';

                            // Add the title as the value
                            result.value = result.TypeName;
                            if (result.tags) {
                                result.tagsarray = result.tags.split(',');
                            }
                        });

                        // Add to the results
                        results.push({
                            id: 'productTypes',
                            label: 'productTypes',
                            results: this.productTypesResults
                        });
                    }
                    this.resultSets = results;
                    this.search.next(results);

                })


                // this._productService.globalSearchSources(value).subscribe(responseList => {

                //     this.isSearchStart = false;

                //     const pagesResults = cloneDeep(flatNavigation)
                //         .filter(page => (page.title?.toLowerCase().includes(query) || (page.subtitle && page.subtitle.includes(query))));


                //     // Prepare the results array
                //     const results = [];
                //     this.productsResults = responseList[0].entity.Products
                //     // If there are contacts results...
                //     if (this.productsResults.length > 0) {
                //         // Normalize the results
                //         this.productsResults.forEach((result) => {

                //             // Add a link
                //             result.link = '/apps/contacts/' + result.Title;

                //             result.link = 'products';
                //             // Add the name as the value
                //             result.value = result.Title;
                //         });

                //         // Add to the results
                //         results.push({
                //             id: 'products',
                //             label: 'Products',
                //             results: this.productsResults
                //         });
                //     }

                //     // If there are page results...
                //     if (pagesResults.length > 0) {
                //         // Normalize the results
                //         pagesResults.forEach((result: any) => {

                //             // Add the page title as the value
                //             result.value = result.title;
                //             result.link = "pages"
                //         });

                //         // Add to the results
                //         results.push({
                //             id: 'pages',
                //             label: 'Pages',
                //             results: pagesResults
                //         });
                //     }
                //     this.locationsResults = responseList[1].entity.locations
                //     // If there are tasks results...
                //     if (this.locationsResults.length > 0) {
                //         // Normalize the results
                //         this.locationsResults.forEach((result) => {

                //             // Add a link
                //             result.link = 'locations';

                //             // Add the title as the value
                //             result.value = result.name;
                //             if (result.tags) {
                //                 result.tagsarray = result.tags.split(',');
                //             }
                //         });

                //         // Add to the results
                //         results.push({
                //             id: 'locations',
                //             label: 'Locations',
                //             results: this.locationsResults
                //         });
                //     }
                //     this.resultSets = results;
                //     this.search.next(results);

                // })



                // this._httpClient.post('api/common/search', { query: value })
                //     .subscribe((resultSets: any) => {

                //         // Store the result sets
                //         this.resultSets = resultSets;

                //         // Execute the event
                //         this.search.next(resultSets);
                //     });
            });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * On keydown of the search input
     *
     * @param event
     */
    onKeydown(event: KeyboardEvent): void {
        // Escape
        if (event.code === 'Escape') {
            // If the appearance is 'bar' and the mat-autocomplete is not open, close the search
            if (this.appearance === 'bar' && !this._matAutocomplete.isOpen) {
                this.close();
            }
        }
    }




    /**
     * Open the search
     * Used in 'bar'
     */
    open(): void {
        // Return if it's already opened
        if (this.opened) {
            return;
        }

        // Open the search
        this.opened = true;
    }

    /**
     * Close the search
     * * Used in 'bar'
     */
    close(): void {
        // Return if it's already closed
        if (!this.opened) {
            return;
        }

        // Clear the search input
        this.searchControl.setValue('');

        // Close the search
        this.opened = false;
    }

    /**
     * Track by function for ngFor loops
     *
     * @param index
     * @param item
     */
    trackByFn(index: number, item: any): any {
        return item.id || index;
    }
}
function flatNavigation(flatNavigation: any) {
    throw new Error('Function not implemented.');
}

