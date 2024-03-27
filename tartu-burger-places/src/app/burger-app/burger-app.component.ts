import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import {} from 'google.maps';
import { RouterOutlet } from '@angular/router';
import { GoogleMap, GoogleMapsModule, MapInfoWindow, MapMarker } from '@angular/google-maps';
import {NgClass, NgForOf, NgIf} from '@angular/common';
import { bussijaamCoordinates, tartuCoordinates } from './constants';
import {BurgerPlace, BurgerPlacePhoto} from './types';
import { BurgerAppService } from './burger-app.service';
import {HttpErrorResponse} from "@angular/common/http";
@Component({
  selector: 'burger-app',
  standalone: true,
  imports: [RouterOutlet, GoogleMapsModule, GoogleMap, NgForOf, NgIf, NgClass],
  templateUrl: './burger-app.component.html',
  styleUrl: './burger-app.component.scss'
})
export class BurgerAppComponent implements OnInit {
  @ViewChildren(MapInfoWindow) infoWindowsView: QueryList<MapInfoWindow> | undefined;
  public title: string = 'Venues';
  public loadingText: string ='';
  public placeName: string = '';

  public mapOptions: google.maps.MapOptions ={
    zoom: 13,
    center: tartuCoordinates,
    mapTypeId: 'roadmap'
  }
  public circleOptions: google.maps.CircleOptions ={
    center: bussijaamCoordinates,
    radius: 1000,
  }
  private allBurgerPlaces: BurgerPlace[] = [];
  private excludedBurgerPlaces: BurgerPlace[] = [];
  public burgerPlaces: BurgerPlace[] = [];
  public burgerPlacesPhotos: BurgerPlacePhoto[] = [];
  constructor(private service: BurgerAppService) {}

  ngOnInit(): void {
    this.getExcludedBurgerPlaces(true);
  }
  private filterBurgerPlaces(): void {
    this.burgerPlaces = this.allBurgerPlaces.filter(place =>
      !this.excludedBurgerPlaces.map(exPlace => exPlace.name).includes(place.name));
    this.loadingText = '';
    this.burgerPlaces.forEach((place: BurgerPlace) => this.getVenuePhotos(place.id));
  }

  private getExcludedBurgerPlaces(isExcludedPlaces?: boolean): void {
    this.loadingText = 'Getting data...'
    this.service.getBurgerVenues(isExcludedPlaces).subscribe((response: any) => {
      if (response) {
        response.results.forEach((place: any) => {
          this.excludedBurgerPlaces.push({
            id: place.fsq_id,
            name: place.name,
            location: {lat: place.geocodes.main.latitude, lng: place.geocodes.main.longitude}
          })
        })
        this.getAllBurgerPlaces();
      }
    });
  }
  private getAllBurgerPlaces(): void {
    this.service.getBurgerVenues().subscribe((response: any) => {
      if (response) {
        response.results.forEach((place: any) => {
          this.allBurgerPlaces.push({
            id: place.fsq_id,
            name: place.name,
            location: {lat: place.geocodes.main.latitude, lng: place.geocodes.main.longitude},
          })
        })
       this.filterBurgerPlaces();
      }
    });
  }
  public openInfoWindow(marker: MapMarker, name: string): void {
    if (this.infoWindowsView) {
      this.infoWindowsView.forEach((window: MapInfoWindow) => {
        this.placeName = name;
        window.open(marker);
      });
    }
  }
  private getVenuePhotos(placeId: string): void {
    this.service.getBurgerVenuePhoto(placeId).subscribe((response: any) => {
      const urls: string[] = [];
      if (response.length) {
        response.forEach((item: any) => {
          urls.push(item.prefix + "original" + item.suffix)
        })
        this.isPictureWithBurger(urls, placeId);
      }
    });
  }
  private isPictureWithBurger(urls: string[], id: string): void {
    this.service.getPicturesWithBurger(urls).subscribe((response: any) => {
      this.burgerPlacesPhotos.push({id: id, picture: response.urlWithBurger, isBurgerPicture: true})
    }, (error: HttpErrorResponse) => {
      if (error.error.error === "No Burger For You" && error.status === 404) {
        this.burgerPlacesPhotos.push({id: id, picture: urls[0], isBurgerPicture: false})
      }
    });
  }
}
