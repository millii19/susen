import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Panel } from './entities/Panel';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) { }

  getSimulate(budget: number, usageQuota: number, latitude: number, longitude: number): Observable<Panel[]> {
    const headers = new HttpHeaders({"Access-Control-Allow-Origin": "*"})
    const options = { params: new HttpParams()
                      .set('budget', budget)
                      .set('usage_quota', usageQuota)
                      .set('latitude', longitude)
                      .set('longitude', latitude) };
    return this.httpClient.get<Panel[]>("/v1/simulate", options);
  }
}
