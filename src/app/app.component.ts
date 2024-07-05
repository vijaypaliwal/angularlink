import { Component } from '@angular/core';

@Component({
    selector   : 'app-root',
    templateUrl: './app.component.html',
    styleUrls  : ['./app.component.scss']
})
export class AppComponent
{
    /**
     * Constructor
     */
    showDrawer=false;
    constructor()
    {
    }

    onBackdropClicked(): void {
        this.showDrawer = false;
      }
}
