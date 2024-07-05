import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'environments/environment';
import { User } from 'app/core/user/user.types';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionnairesService {
  user: User;
  constructor(private httpClient: HttpClient) { }

  createOrganizationWithInventory(data: any): Observable<any> {
    return this.httpClient.post(`${environment.identityLoginServer}Inventory`, data);
  }

  setupInventory(data: any): Observable<any> {
    var token = localStorage.getItem("accessToken");
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + token);
    const httpOptions = {
      headers: headers_object
    };
    return this.httpClient.post(`${environment.gobalServerUrl}ProductType/QuestionnaireToInventorySetup`, data, httpOptions);
  }

}
