import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { GLOBAL } from '../global';

@Injectable()

export class LoginService {
  public url: string;

  constructor(public http: HttpClient) {
    this.url = GLOBAL.url;
  }

  login(user): Observable<any> {
    let params = JSON.stringify(user);
    let headers = new HttpHeaders({ 'Content-type': 'application/json' });
    return this.http.post(this.url + "user/login", params, { headers: headers })
  }

}      