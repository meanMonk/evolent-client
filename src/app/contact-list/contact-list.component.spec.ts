/**
 * Author : Sahil kashetwar [sahilkashetwar24@gmail.com]
 **/

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ContactListComponent } from './contact-list.component';
import { AppModule } from '../app.module';
import { APP_BASE_HREF } from '@angular/common';
import { RestService } from '../services/rest.service';
import { of } from 'rxjs/index';
import toastr from 'toastr';
import {StorageService} from '../services/storage.service';
import {Router} from '@angular/router';

describe('ContactListComponent', () => {
  let component: ContactListComponent;
  let fixture: ComponentFixture<ContactListComponent>;
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
    getUsers: () => {
       return of(testUsers);
    },
    deleteUser: ( uid ) => {
      return of({message : 'user deleted successfully'});
    }
  };

  const MockStorageService = {
      setBlob : jasmine.createSpy('setBlob')
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
        {provide: APP_BASE_HREF, useValue: '/'},
        {provide: RestService, useValue: MockRestService},
        {provide: StorageService, useValue: MockStorageService},
        {provide: Router, useValue: MockRouter }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    spyOn(window.console, 'log');
    spyOn(toastr, 'success');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('@ngOnInit()', () => {
    it('should update the userList data', () => {
      component.ngOnInit();
      expect(component.userList).toEqual(testUsers);
      expect(toastr.success).toHaveBeenCalledWith('Data loaded successfully !');
    });
  });

  describe('@deleteUser()', () => {
    it('should delete the user', () => {
      component.deleteUser('uid');
      expect(toastr.success).toHaveBeenCalledWith('User deleted successfully !');
      expect(window.console.log).toHaveBeenCalledWith({message : 'user deleted successfully'});
    });
  });

  describe('@editUser()', () => {
    it('should update the storage service and call navigate of router', () => {
      component.editUser({name: 'test'});
      expect(MockStorageService.setBlob).toHaveBeenCalledWith({name: 'test'});
      expect(MockRouter.navigate).toHaveBeenCalledWith(['/create']);
    });
  });

});
