import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { WindSolarPanel } from './entities/windSolarPanel';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) { }

  getSimulate(budget: number, latitude: number, longitude: number): Observable<WindSolarPanel> {
    const headers = new HttpHeaders({"Access-Control-Allow-Origin": "*"})
    const options = { params: new HttpParams().set('budget', budget)
                      .set('latitude', latitude)
                      .set('longitude', longitude) };
    return this.httpClient.get<WindSolarPanel>("/v1/simulate", options);
  }
}
