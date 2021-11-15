import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient) { }

  private url = 'https://reqres.in/api/users'

  cargaUsuarios(page:number){

    return this.http.get(`${this.url}?page=${page}`).pipe( map ((resp:any) => {
      return resp
    }))

  }

}
