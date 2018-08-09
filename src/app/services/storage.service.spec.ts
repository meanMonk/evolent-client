import { TestBed, inject, getTestBed } from '@angular/core/testing';
import { StorageService } from './storage.service';

import { User } from './rest.service';

describe('StorageService', () => {
  let storageservice : StorageService;
  let injector : TestBed;
  let expectedResult : User;
  beforeEach(() => {
    expectedResult =  {
      first_name : 'test',
      last_name : 'last',
      email : 'last@email.com',
      phone : '1234567890',
      status : 'active'
    };
    TestBed.configureTestingModule({
      providers: [StorageService]
    });
    injector = getTestBed();
    storageservice = injector.get(StorageService);
  });

  it('should be created', inject([StorageService], (service: StorageService) => {
    expect(service).toBeTruthy();
  }));
  describe(">> GetBlob()",()=>{
      it("> Should store the data in the blob object",(done)=>{
        storageservice.userBlob = expectedResult;
        let result = storageservice.getBlob()
        expect(result).toEqual(expectedResult);
        done();
      })
  })

  describe(">> setBlob()",()=>{
      it("> Should set the data in the blob object",(done)=>{
        let result = storageservice.setBlob(expectedResult)
        expect(storageservice.userBlob).toEqual(expectedResult);
        done();
      });
  })
});
