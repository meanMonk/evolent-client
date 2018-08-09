/**
 * Author : Sahil kashetwar [sahilkashetwar24@gmail.com]
 **/


import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StorageService } from '../services/storage.service';
import { User } from '../contact-list/contact.model';
import { RestService } from '../services/rest.service';
import { Router } from '@angular/router';
import toastr from 'toastr';
import { FormControl } from '@angular/forms';


/** 
 * Email Validator for validating the EMAILS
 * */
export class EmailValidator {
  static isValid(control: FormControl) {
    const re = /^(([^<>()\[\]\\.,;:\s@']+(\.[^<>()\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(control.value);

    if (re) {
      return null;
    }
    return {'invalidEmail': true};
  }
}


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  contactForm : FormGroup;
  userId : string;

  constructor(private storageService : StorageService,
              private restService : RestService,
              private router : Router,
              private _fb: FormBuilder) { }

  ngOnInit() {
    let userBlob = this.storageService.getBlob();
    this.initializeForm(userBlob)
  }

  initializeForm(user){
    this.userId = user._id;
    this.contactForm = this._fb.group({
      first_name : [user.first_name || '', [Validators.required]],
      last_name : [user.last_name  || '', [Validators.required]],
      email : [ user.email || '', [Validators.compose([Validators.required, EmailValidator.isValid])]],
      phone : [ user.phone || '', [Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10)])]],
      status : [ user.status || 'active']
    })
  }

  saveContact(formBlob : User) {
    /**
     * Check if userid is present
     * !userId : true then create new user
     * !userId : false then update existing user
     **/
    if(!this.userId) {
      this.restService.newUser(formBlob).subscribe(
        (res) =>{
            toastr.success('New user created !');
            this.router.navigate(['/list']);
            this.storageService.setBlob({});
        },
        (err) =>{ 
          console.log(err);
          toastr.error('Error Occurred !');
          this.router.navigate(['/list']);
          this.storageService.setBlob({});
        }
      )
    }
    else {
      this.restService.updateUser(formBlob, this.userId).subscribe(
        (res) =>{
            toastr.success('User updated successfully !');
            this.router.navigate(['/list']);
            this.storageService.setBlob({});
        },
        (err) =>{ 
          console.log(err);
          toastr.error('Error Occurred !');
          this.router.navigate(['/list']);
          this.storageService.setBlob({});
        }
      )
    }
  }

}
