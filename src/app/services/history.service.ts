import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { GLOBAL } from '../global';

@Injectable()

export class HistoryService {
  public url: string;

  constructor(public http: HttpClient) {
    this.url = GLOBAL.url;
    // this.url = 'http://localhost:5000/';
  }

  seeHistory(shop_number): Observable<any> {
    let params = shop_number;
    let headers = new HttpHeaders({ 'Content-type': 'application/json' });
    return this.http.post(this.url + 'history/report/by-shop/last', params, { headers: headers });
  }

  search(keyword): Observable<any> { // reports by shop all
    let params = keyword;
    let headers = new HttpHeaders({ 'Content-type': 'application/json' });
    return this.http.post(this.url + 'shops/search-shop', params, { headers: headers });
  }

}      