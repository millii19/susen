import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { WindSolarPanel } from './entities/windSolarPanel';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  localUrl = "http://localhost:8080/v1/"

  constructor(private httpClient: HttpClient) { }

  getSimulate(budget: number, latitude: number, longitude: number) {
    let url = this.localUrl + "simulate/";
    const options = { params: new HttpParams().set('budget', budget)
                    .set('latitude', latitude)
                    .set('longitude', longitude) };
    return this.httpClient.get<WindSolarPanel>(url, options)
  }
}
