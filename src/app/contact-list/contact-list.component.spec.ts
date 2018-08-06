import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactListComponent } from './contact-list.component';

describe('ContactListComponent', () => {
  let component: ContactListComponent;
  let fixture: ComponentFixture<ContactListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactListComponent ]
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

  describe('@loadData() should has to load the data', ()=>{
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
  })

});
