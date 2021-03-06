/**
 * Author : Sahil kashetwar [sahilkashetwar24@gmail.com]
 **/

import { Injectable } from '@angular/core';
import { User } from '../contact-list/contact.model';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

export interface User {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  status: string;
}

@Injectable({
  providedIn: 'root'
})
export class RestService {

  API_URL : string = environment.API_URL + '/api';

  constructor(private http : HttpClient) { }

  getUsers() {
    return this.http.get<User[]>(this.API_URL + '/users')
  }
  
  newUser(user) {
    return this.http.post(this.API_URL + '/users', user, httpOptions)
  }

  updateUser(user, id) {
    return this.http.put(this.API_URL + '/users/' +id , user, httpOptions);
  }

  deleteUser(userId) {
    return this.http.delete(this.API_URL + '/users/' + userId);
  }

}
