import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SERVICE_PATH } from '../shared/config/service-path';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  constructor(private http: HttpClient) { }

  getDataMovies(data: any, page: number = 1): Observable<any> {
    const paramsId =  data.id ? `i=${data.id}` : '';
    const paramsYear =  data.year ? `y=${data.year}` : '';
    const paramsTitle =  data.title ? `s=${data.title}` : '';
    const paramsType =  data.type ? `type=${data.type}` : '';
    const paramasPage = page ? `page=${page}` : 1;

    let sendParams = '';
    if(paramsId) sendParams = sendParams.concat(`&${paramsId}`);
    if(paramsYear) sendParams = sendParams.concat(`&${paramsYear}`);
    if(paramsTitle) sendParams = sendParams.concat(`&${paramsTitle}`);
    if(paramsType) sendParams = sendParams.concat(`&${paramsType}`);

    return this.http.get<any>(`${SERVICE_PATH.addresses.data}&${paramasPage}${sendParams}`);
  }
}
