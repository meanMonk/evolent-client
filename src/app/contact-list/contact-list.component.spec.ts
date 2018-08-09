import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactListComponent } from './contact-list.component';
import { AppModule } from '../app.module';
import { APP_BASE_HREF } from '@angular/common';

describe('ContactListComponent', () => {
  let component: ContactListComponent;
  let fixture: ComponentFixture<ContactListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AppModule
      ],
      providers: [
        {provide: APP_BASE_HREF, useValue: '/'}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /* describe('@loadData() should has to load the data', ()=>{
    it('should update the userList array if success', () => {
      expect(component).toBeTruthy();
    });
    it('Should send an error if response is error', () => {
      expect(component).toBeTruthy();
    });
  })

  describe('@deleteUser() should has to load the data', ()=>{
    it('should update the userList array if success', () => {
      expect(component).toBeTruthy();
    });
    it('Should send an error if response is error', () => {
      expect(component).toBeTruthy();
    });
  })

  describe('@editUser() should has to load the data', ()=>{
    it('should update the userList array if success', () => {
      expect(component).toBeTruthy();
    });
  }) */

});
