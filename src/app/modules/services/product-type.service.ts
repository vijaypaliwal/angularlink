import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, switchMap, take } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Tag, Task } from '../../../app/modules/admin/product-type/product-type-new/product.types';
import { user } from 'app/mock-api/common/user/data';
@Injectable({
  providedIn: 'root'
})
export class ProductTypeService {
  // private _tasks: any;
  private _tasks: BehaviorSubject<Task[] | null> = new BehaviorSubject(null);
  tasks$: any;
  tags$: any;

  constructor(private httpClient: HttpClient) { }

  //add product type

  saveProductType(data: any) {
    var apiKey = localStorage.getItem("accessAPIKey");
    var apiSecret = localStorage.getItem("accessAPISecret");
    var headers_object = new HttpHeaders().set("X-UserId", user.id).set("X-Api-Key", apiKey).set("X-Api-Secret", apiSecret);
    const httpOptions = {
      headers: headers_object
    };

    return this.httpClient.post<any>(`${environment.gobalServerUrl}ProductType`, data, httpOptions)
  }


  updateProductType(data: any, productTypeId: string) {
    var apiKey = localStorage.getItem("accessAPIKey");
    var apiSecret = localStorage.getItem("accessAPISecret");
    var headers_object = new HttpHeaders().set("X-UserId", user.id).set("X-Api-Key", apiKey).set("X-Api-Secret", apiSecret);
    const httpOptions = {
      headers: headers_object
    };

    return this.httpClient.put<any>(`${environment.gobalServerUrl}ProductType/${productTypeId}`, data, httpOptions)
  }

  getProductTypeList() {
    var apiKey = localStorage.getItem("accessAPIKey");
    var apiSecret = localStorage.getItem("accessAPISecret");
    var headers_object = new HttpHeaders().set("X-UserId", user.id).set("X-Api-Key", apiKey).set("X-Api-Secret", apiSecret);
    const httpOptions = {
      headers: headers_object
    };
    return this.httpClient.get<any>(`${environment.gobalServerUrl}ProductType`, httpOptions)

  }
  createTask(type: string): Observable<Task> {
    return this._tasks.pipe(
      take(1),
      switchMap(tasks => this.httpClient.post<Task>('api/apps/tasks/task', { type }).pipe(
        map((newTask) => {

          // Update the tasks with the new task
          this._tasks.next([newTask, ...tasks]);

          // Return the new task
          return newTask;
        })
      ))
    );
  }

  updateFields(data: any, id: string) {
    var apiKey = localStorage.getItem("accessAPIKey");
    var apiSecret = localStorage.getItem("accessAPISecret");
    var headers_object = new HttpHeaders().set("X-UserId", user.id).set("X-Api-Key", apiKey).set("X-Api-Secret", apiSecret);
    const httpOptions = {
      headers: headers_object
    };

    return this.httpClient.put<any>(`${environment.gobalServerUrl}Fields/${id}`, data, httpOptions)

  }

  addFields(data: any) {
    var apiKey = localStorage.getItem("accessAPIKey");
    var apiSecret = localStorage.getItem("accessAPISecret");
    var headers_object = new HttpHeaders().set("X-UserId", user.id).set("X-Api-Key", apiKey).set("X-Api-Secret", apiSecret);
    const httpOptions = {
      headers: headers_object
    };

    return this.httpClient.post<any>(`${environment.gobalServerUrl}Fields`, data, httpOptions)
  }

  getAllField() {
    var apiKey = localStorage.getItem("accessAPIKey");
    var apiSecret = localStorage.getItem("accessAPISecret");
    var headers_object = new HttpHeaders().set("X-UserId", user.id).set("X-Api-Key", apiKey).set("X-Api-Secret", apiSecret);
    const httpOptions = {
      headers: headers_object
    };

    return this.httpClient.get<any>(`${environment.gobalServerUrl}Fields`, httpOptions)
  }

  deleteField(id: string) {
    var apiKey = localStorage.getItem("accessAPIKey");
    var apiSecret = localStorage.getItem("accessAPISecret");
    var headers_object = new HttpHeaders().set("X-UserId", user.id).set("X-Api-Key", apiKey).set("X-Api-Secret", apiSecret);
    const httpOptions = {
      headers: headers_object
    };

    return this.httpClient.delete<any>(`${environment.gobalServerUrl}Fields/${id}`, httpOptions)
  }

}
