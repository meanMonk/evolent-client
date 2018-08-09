import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactComponent } from './contact.component';
import { APP_BASE_HREF } from '@angular/common';
import { AppModule } from '../app.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

describe('ContactComponent', () => {
  let component: ContactComponent;
  let fixture: ComponentFixture<ContactComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AppModule
      ],
      providers: [
        { provide: APP_BASE_HREF, useValue: '/' }
      ]
    })

    fixture = TestBed.createComponent(ContactComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
  }));


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Forms and its field should be invalid when empty', () => {
    expect(component.contactForm.valid).toBeFalsy();
    expect(component.contactForm.controls['first_name'].valid).toBeFalsy();
    expect(component.contactForm.controls['last_name'].valid).toBeFalsy();
    expect(component.contactForm.controls['email'].valid).toBeFalsy();
    expect(component.contactForm.controls['phone'].valid).toBeFalsy();
    expect(component.contactForm.controls['status'].valid).toBeTruthy();
  });

  it('Email field validity test', () => {
    let email = component.contactForm.controls['email'];
    let errors = {}
    email.setValue("test");
    errors = email.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['invalidEmail']).toBeTruthy();
    email.setValue("test@example.com");
    errors = email.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['invalidEmail']).toBeFalsy();
  });
  it('Phone field validity test', () => {
    let email = component.contactForm.controls['phone'];
    let errors = {}
    email.setValue("123456");
    errors = email.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['minlength']).toBeTruthy();
    email.setValue("1234567890");
    errors = email.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['minlength']).toBeFalsy();
  });
  
});
