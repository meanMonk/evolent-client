/**
 * Author : Sahil kashetwar [sahilkashetwar24@gmail.com]
 **/

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ContactComponent } from './contact.component';
import { APP_BASE_HREF } from '@angular/common';
import { AppModule } from '../app.module';
import {RestService} from "../services/rest.service";
import {StorageService} from '../services/storage.service';
import toastr from 'toastr';
import {of} from "rxjs/index";

describe('ContactComponent', () => {
  let component: ContactComponent;
  let fixture: ComponentFixture<ContactComponent>;
  const testUsers = [
    {
      first_name : 'test',
      last_name : 'last name',
      email : 'last@gmail.com',
      phone : '1234567890',
      status : 'active'
    }
  ];

  const MockRestService = {
    newUser: () => {
      return of(testUsers);
    },
    updateUser: ( uid ) => {
      return of({message : 'user deleted successfully'});
    }
  };

  const MockStorageService = {
    setBlob : jasmine.createSpy('setBlob'),
    getBlob : jasmine.createSpy('getBlob').and.returnValue({_id:'a'})
  };

  const MockRouter = {
    navigate : jasmine.createSpy('navigate')
  };


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AppModule
      ],
      providers: [
        { provide: APP_BASE_HREF, useValue: '/' },
        {provide: RestService, useValue: MockRestService},
        {provide: StorageService, useValue: MockStorageService}
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    spyOn(toastr, 'success');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('@saveContact()', () => {
    it('Should create new user if userId is null', () => {
      component.userId = null;
      component.saveContact(testUsers[0]);
      expect(toastr.success).toHaveBeenCalledWith('New user created !' );
      expect(MockStorageService.setBlob).toHaveBeenCalledWith({});
    });
    it('Should create update existing user if userId is not null', () => {
      component.saveContact(testUsers[0]);
      expect(toastr.success).toHaveBeenCalledWith('User updated successfully !' );
      expect(MockStorageService.setBlob).toHaveBeenCalledWith({});
    });
  });

  describe('@InitializeForm', () => {
    it('Forms and its field should be invalid when empty', () => {
      expect(component.contactForm.valid).toBeFalsy();
      expect(component.contactForm.controls['first_name'].valid).toBeFalsy();
      expect(component.contactForm.controls['last_name'].valid).toBeFalsy();
      expect(component.contactForm.controls['email'].valid).toBeFalsy();
      expect(component.contactForm.controls['phone'].valid).toBeFalsy();
      expect(component.contactForm.controls['status'].valid).toBeTruthy();
    });
    describe('Email Field Validation', ()=>{
      let email, errors = {};
      beforeEach(function () {
        email = component.contactForm.controls['email'];
      });
      it('Correct Email should have to work', () => {
        email.setValue('test@example.com');
        errors = email.errors || {};
        expect(errors['required']).toBeFalsy();
        expect(errors['invalidEmail']).toBeFalsy();
      });
      it('Wrong email should throw an error', ()=>{
        email.setValue('test');
        errors = email.errors || {};
        expect(errors['required']).toBeFalsy();
        expect(errors['invalidEmail']).toBeTruthy();
      });
    });
    describe('Phone Number validation', ()=>{
      let phone, errors = { };
      beforeEach(function () {
        phone = component.contactForm.controls['phone'];
      });

      it('Invalid phone number should throw err', () => {
        phone.setValue('12345');
        errors = phone.errors || {};
        expect(errors['required']).toBeFalsy();
        expect(errors['minlength']).toBeTruthy();
      });
      it('Valid number should has to be work', ()=>{
        phone.setValue('1234567890');
        errors = phone.errors || {};
        expect(errors['required']).toBeFalsy();
        expect(errors['minlength']).toBeFalsy();
      });
  });

});
