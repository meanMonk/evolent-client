/**
 * Author : Sahil kashetwar [sahilkashetwar24@gmail.com]
 **/

import { Component, OnInit } from '@angular/core';
import { User } from './contact.model';
import { RestService } from '../services/rest.service';
import { StorageService } from '../services/storage.service';
import { Router } from '@angular/router';
import toastr from 'toastr';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit {

  userList: User[];

  constructor( private restService: RestService,
               private router : Router, 
               private storageService: StorageService) { }

  ngOnInit() {
    this.loadData()
  }

  loadData() {
    this.restService.getUsers().subscribe(
      (res : User[]) => {
        this.userList = res;
        toastr.success('Data loaded sucessfully !')
      },
      (err) => {
        console.log('error occured', err.message);
        toastr.error('Error Occured !')
      }
    )
  }

  editUser(user) { 
    this.storageService.setBlob(user);
    this.router.navigate(['/create'])
  }

  deleteUser(userId) { 
    this.restService.deleteUser(userId).subscribe(
      (res)=>{
          toastr.success('User deleted sucessfully !');
          console.log(res);
          this.loadData();
      },
      (err) => {
          console.log('error occured', err.message);
          toastr.error('Error Occured !')
      }
    )
  }


}
