import { Injectable } from '@angular/core';
import {environment} from "../environments/environment.development";
import {HttpClient} from "@angular/common/http";
import {bussijaamCoordinates, tartuCoordinates} from "./constants";
import {map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BurgerAppService {
  constructor(private _http: HttpClient) { }
  public getBurgerVenues(isFromBussijaam?: boolean) {
    return this._http.get(environment.FSApiUrl + 'search', {
      headers: {
        Accept: 'application/json',
        Authorization: environment.FSAccessToken,
      },
      params: {
        ll: isFromBussijaam ? bussijaamCoordinates.lat + ',' + bussijaamCoordinates.lng
          : tartuCoordinates.lat + ',' + tartuCoordinates.lng,
        query: 'burger',
        limit: 50,
        radius: isFromBussijaam? 1000 : 10000,
      }
    });
  }
  public getBurgerVenuePhoto(id: string) {
    return this._http.get(environment.FSApiUrl + id + '/photos', {
      headers: {
        Accept: 'application/json',
        Authorization: environment.FSAccessToken,
      }});
  }
  public getPicturesWithBurger(urls: string[]) {
    return this._http.post("https://73kh1kvgx4.execute-api.eu-west-1.amazonaws.com/prod/recognize", {
      headers: {
        Accept: 'application/json',
      },
      urls
    });
  }
}
