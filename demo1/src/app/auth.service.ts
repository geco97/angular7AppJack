import { Injectable } from '@angular/core';
import { User } from './user';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class AuthService {
 _apiurl: string = "http://localhost:3001/api";

  constructor(private http: HttpClient) {}

  public login(userInfo: User) {
    return this.http.post(`${this._apiurl}/users/login`, userInfo);
  }
  getAll() {
    return this.http.get<User[]>(`${this._apiurl}/users/all`,{
        headers:{
            'authorization': 'bearer ' + localStorage.getItem('ACCESS_TOKEN')
        }
    });
}

getById(_id: string) {
 return this.http.get<User[]>(`${this._apiurl}/users/${_id}`,{
  headers:{
      'authorization': 'bearer ' + localStorage.getItem('ACCESS_TOKEN')
  }
});
    
}

 register(_id: User) {
    return this.http.post(`${this._apiurl}/users/register`, _id);
  }

  update(user: User) {
    return this.http.put(`${this._apiurl}/users/${user._id}`, user , {
      headers:{
          'authorization': 'bearer ' + localStorage.getItem('ACCESS_TOKEN')
      }});
  }

delete(_id: number) {
  return this.http.delete(`${this._apiurl}/users/${_id}`,{
      headers:{
          'authorization': 'bearer ' + localStorage.getItem('ACCESS_TOKEN')
      }});
}

  public isLoggedIn() {
    return localStorage.getItem('ACCESS_TOKEN') !== null;
  }

  public logout() {
    localStorage.removeItem('ACCESS_TOKEN');
    localStorage.removeItem('USER_ID');
    localStorage.removeItem('USER_EMAIL');
  }


}
