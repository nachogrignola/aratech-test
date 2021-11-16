import { of } from 'rxjs';

import { HomeService } from './home.service';

describe('HomeService', () => {
  let service: HomeService;
  let httpClientSpy: { get: jasmine.Spy };

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    service = new HomeService(httpClientSpy as any);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be two users', () => {
    const users = [
      {id:1, name:'user1'}, 
      {id:2, name:'user2'}
    ]
    httpClientSpy.get.and.returnValue(of(users));
    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');

  })
});

