import { Injectable } from '@angular/core';
import { User } from '../contact-list/contact.model';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  
  userBlob : User;
  
  constructor() { }

  getBlob() { 
    return this.userBlob || {};
  }

  setBlob(user) {
    this.userBlob = user;
  }

}
