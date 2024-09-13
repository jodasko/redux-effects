import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private URL_REQRES = 'https://reqres.in/api';

  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http
      .get(`${this.URL_REQRES}/users?per_page=6`)
      .pipe(map((resp: any) => resp['data']));
  }

  getUserById(id: string) {
    return this.http
      .get(`${this.URL_REQRES}/users/${id}`)
      .pipe(map((resp: any) => resp['data']));
  }
}
