import { TestBed, inject, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'

import { RestService, User } from './rest.service';

describe('RestService', () => {
  let httpMock: HttpTestingController;
  let restService: RestService;
  let injector: TestBed;

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RestService,]
    });
    injector = getTestBed();
    restService = injector.get(RestService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', inject([RestService], (service: RestService) => {
    expect(service).toBeTruthy();
  }));

  describe(">> getUsers()", () => {
    it("> should return an Observable of Users[]", () => {
      const dummyUsers: User[] = [
        {
          first_name: "john",
          last_name: "doe",
          email: "johndoe@info.com",
          phone: "1234567890",
          active: "false"
        },
        {
          first_name: "abc",
          last_name: "test",
          email: "johndoe@info.com",
          phone: "1234567890",
          active: "true"
        }
      ];

      restService.getUsers().subscribe((users) => {
        expect(users.length).toBe(2);
        expect(users[0].first_name).toEqual('john');
      })

      const req = httpMock.expectOne(`${restService.API_URL}/users`);
      expect(req.request.method).toBe("GET");
      req.flush(dummyUsers);

    });
  });
  describe(">> newUser(user)", () => {
    it("> should create new user and send the message as successfull", () => {
      let user = {
        first_name: "john",
        last_name: "doe",
        email: "johndoe@info.com",
        phone: "1234567890",
        active: "false"
      };
      let result = {
        message: "User created successfully"
      }
      restService.newUser(user).subscribe((res) => {
        expect(res).toEqual(result);
      })

      const req = httpMock.expectOne(`${restService.API_URL}/users`);
      expect(req.request.method).toBe("POST");
      req.flush(result);
    })
  })
  describe(">> updateUser(user, id)", () => {
    it("> should user data", () => {
      let user = {
        first_name: "doe"
      };
      let result = {
        message: "Successfully updated"
      }
      restService.updateUser(user, 'a').subscribe((res) => {
        expect(res).toEqual(result);
      })

      const req = httpMock.expectOne(`${restService.API_URL}/users/a`);
      expect(req.request.method).toBe("PUT");
      req.flush(result);
    })
  })
  describe(">> deleteUser(userID)", () => {
    it("> should delete the user", () => {
      let result = {
        message: "User deleted successfully"
      }
      restService.newUser('a').subscribe((res) => {
        expect(res).toEqual(result);
      })

      const req = httpMock.expectOne(`${restService.API_URL}/users/a`);
      expect(req.request.method).toBe("DELETE");
      req.flush(result);
    })
  })
});
