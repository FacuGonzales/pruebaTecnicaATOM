import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SERVICE_PATH } from '../shared/config/service-path';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  constructor(private http: HttpClient) { }

  getDataMovies(data: any): Observable<any> {
    const paramsId =  data.id ? `i=${data.id}` : '';
    const paramsYear =  data.year ? `y=${data.year}` : '';
    const paramsTitle =  data.title ? `s=${data.title}` : '';
    const paramsType =  data.type ? `type=${data.type}` : '';
    // getById i=imdbID

    // getByTitle s=

    // getByYears y=

    // getByType type=movie, series, episode

    let sendParams = '';

    if(paramsId) sendParams = `&${paramsId}`;

    if(paramsYear) sendParams = sendParams.concat(`&${paramsYear}`);
    if(paramsTitle) sendParams = sendParams.concat(`&${paramsTitle}`);
    if(paramsType) sendParams = sendParams.concat(`&${paramsType}`);

    // if(paramsYear) {
    //   sendParams = sendParams ? sendParams.concat(`&${paramsYear}`) : `&${paramsYear}`;
    // }

    // const sendParams = (paramsId && paramsYear && paramsTitle && paramsType) ? `&${paramsId}&${paramsYear}&${paramsTitle}&${paramsType}` :
    //                    (paramsYear && paramsTitle && paramsType) ? `&${paramsYear}&${paramsTitle}&${paramsType}` :
    //                    (paramsTitle && paramsType) ? `&${paramsTitle}&${paramsType}` :
    //                    (paramsType) ? `&${paramsType}` :
    //                    '';

    return this.http.get<any>(`${SERVICE_PATH.addresses.data}${sendParams}`);
  }
}
