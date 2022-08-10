import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  register_user_url: string = "http://localhost:3000/api/registerUser";
  login_user: string = 'http://localhost:3000/api/loginUser';

  constructor(private http: HttpClient) { }

  //takes in username and password and use it to make an API call to create the user into MongoDb
  registerUser(username: string, password: string, role: string) {
    return this.http.post<any[]>(this.register_user_url, {
      'username': username,
      'password': password,
      'role': role
    })
  }

  //takes in username and password and use it to make an API call to validate the username and password with MongoDB
  loginUser(username: string, password: string) {
    return this.http.post<any[]>(this.login_user, {
      'username': username,
      'password': password,
    })
  }

  //save the username into the session storage
  setSecureToken(secure_token: string) {
    sessionStorage.setItem('LoggedIn', secure_token)
  }

  //retrieve the username from the session storage
  getSecureToken() {
    return sessionStorage.getItem('LoggedIn')
  }

  //save the role of the logged-in user into the session storage
  setUserRole(role: string) {
    sessionStorage.setItem('UserRole', role);
  }

  //retrieve the role of the logged-in user from the session storage
  getUserRole() {
    return sessionStorage.getItem('UserRole');
  }

  //remove username and user's role from the session storage
  logout() {
    sessionStorage.removeItem('LoggedIn');
    sessionStorage.removeItem('UserRole');
  }

  //returns true if the user has logged into the web app
  isLoggedIn() {
    return this.getSecureToken() !== null;
  }

  //returns true if an author had logged into the web app
  isAuthor() {
    return this.getUserRole() == "admin";
  }

  //returns true if a normal user had logged into the web app
  isUser() {
    return (this.getUserRole() == "user" || this.getUserRole() == "admin");
  }

}
