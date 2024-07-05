import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'app/core/user/user.types';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  user: User;

  constructor(private httpClient: HttpClient,) {
    this.user = JSON.parse(localStorage.getItem("user"));

  }


  saveProduct(data: any) {

    var apiKey = localStorage.getItem("accessAPIKey");
    var apiSecret = localStorage.getItem("accessAPISecret");
    var headers_object = new HttpHeaders().set("X-UserId", this.user.userId).set("X-Api-Key", apiKey).set("X-Api-Secret", apiSecret);
    const httpOptions = {
      headers: headers_object
    };

    return this.httpClient.post<any>(`${environment.gobalServerUrl}Product/AddProduct`, data, httpOptions)
  }


  updateProduct(data: any, productId: string) {
    var apiKey = localStorage.getItem("accessAPIKey");
    var apiSecret = localStorage.getItem("accessAPISecret");
    var headers_object = new HttpHeaders().set("X-UserId", this.user.userId).set("X-Api-Key", apiKey).set("X-Api-Secret", apiSecret);
    const httpOptions = {
      headers: headers_object
    };

    return this.httpClient.put<any>(`${environment.gobalServerUrl}Product/UpdateProduct/${productId}`, data, httpOptions)

  }

  getProductList(query: any) {

    var apiKey = localStorage.getItem("accessAPIKey");
    var apiSecret = localStorage.getItem("accessAPISecret");
    var headers_object = new HttpHeaders().set("X-UserId", this.user.userId).set("X-Api-Key", apiKey).set("X-Api-Secret", apiSecret);
    const httpOptions = {
      headers: headers_object
    };
    return this.httpClient.post<any>(`${environment.gobalServerUrl}Product/GetProductList`, query, httpOptions)

  }

  getProductHistory(query: any, productId) {
    var apiKey = localStorage.getItem("accessAPIKey");
    var apiSecret = localStorage.getItem("accessAPISecret");
    var headers_object = new HttpHeaders().set("X-UserId", this.user.userId).set("X-Api-Key", apiKey).set("X-Api-Secret", apiSecret);
    const httpOptions = {
      headers: headers_object
    };
    return this.httpClient.post<any>(`${environment.gobalServerUrl}ProductHistory/GetProductHistory/${productId}`, query, httpOptions)
  }

  uploadImages(files: any) {
    var apiKey = localStorage.getItem("accessAPIKey");
    var apiSecret = localStorage.getItem("accessAPISecret");
    var headers_object = new HttpHeaders()
      .set("X-UserId", this.user.userId)
      .set("X-Api-Key", apiKey)
      .set("X-Api-Secret", apiSecret);
    const httpOptions = {
      headers: headers_object
    };
    return this.httpClient.post<any>(`${environment.gobalServerUrl}ProductMediaUpload/UploadImages`, files, httpOptions)
  }

  applyLabel(labels) {
    var apiKey = localStorage.getItem("accessAPIKey");
    var apiSecret = localStorage.getItem("accessAPISecret");
    var headers_object = new HttpHeaders()
      .set("X-UserId", this.user.userId)
      .set("X-Api-Key", apiKey)
      .set("X-Api-Secret", apiSecret);
    const httpOptions = {
      headers: headers_object
    };
    return this.httpClient.post<any>(`${environment.gobalServerUrl}Product/apply-label`, labels, httpOptions)

  }



  DeleteImages(files: any) {
    var apiKey = localStorage.getItem("accessAPIKey");
    var apiSecret = localStorage.getItem("accessAPISecret");
    var headers_object = new HttpHeaders().set("X-UserId", this.user.userId).set("X-Api-Key", apiKey).set("X-Api-Secret", apiSecret);
    const httpOptions = {
      headers: headers_object
    };
    return this.httpClient.post<any>(`${environment.gobalServerUrl}ProductMediaUpload/DeleteUploadImages/`, files, httpOptions)
  }

}
