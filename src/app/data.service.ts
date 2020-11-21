import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Record } from './entities/Record'

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private _recordsUrl: string = './assets/records.json'; 

  constructor(private http: HttpClient) { }

  getRecords(){
    return this.http.get<Record[]>(this._recordsUrl);
  }
}
