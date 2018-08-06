import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StorageService } from '../services/storage.service';
import { User } from '../contact-list/contact.model';
import { RestService } from '../services/rest.service';
import { Router } from '@angular/router';
import toastr from 'toastr';

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
      email : [ user.email || '', [Validators.compose([Validators.email, Validators.required])]],
      phone : [ user.phone || '', [Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10)])]],
      active : [ user.active || false]
    })
  }

  saveContact(formBlob) {
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
        }
      )
    }
  }

}
