import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpClient: HttpClient) {}

  database = 'http://localhost:3000';

  login(username: string, password: string): Observable<any> {
    return this.httpClient
      .post(this.database + '/api/user/login', {
        username: username,
        password: password,
      })
      .pipe(
        map((resp: any) => {
          return resp;
        })
      );
  }

  register(username: string, password: string, name: string): Observable<any> {
    return this.httpClient
      .post(this.database + '/api/user/register', {
        username: username,
        password: password,
        name: name,
      })
      .pipe(
        map((resp: any) => {
          return resp;
        })
      );
  }
}
