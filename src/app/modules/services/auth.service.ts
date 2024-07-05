import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  constructor(private httpClient: HttpClient, private router: Router) { }

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }
  getAuthStatus() {
    var token = localStorage.getItem("token");
    if (token)
      return true;
    else
      return false;
  }


  loginUser(data: any) {
    return this.httpClient.post<any>(`${environment.gobalServerUrl}User/Login`, data)
  }


  login(token: string) {
    if (token !== '') { // {3}
      this.loggedIn.next(true);
      this.router.navigate(['/product']);
    }
  }

  logout() {                            // {4}
    this.loggedIn.next(false);
    localStorage.removeItem("token");
    this.router.navigate(['']);
  }
  // changePassword() {
  //   return this.httpClient.post<any>(`${environment.gobalAccountService}User/ChangePassword`,)
  // }

}
