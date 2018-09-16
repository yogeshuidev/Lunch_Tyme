/// <reference types="@types/googlemaps" />
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GoogleMapsService {

  public showMap(latitude: number, longitude: number) {

    const map = new google.maps.Map(document.getElementById('map'), {
      zoom: 7,
      center: { lat: latitude, lng: longitude }
    });

    const marker = new google.maps.Marker({
      position: { lat: latitude, lng: longitude },
      map: map,
      title: ''
    });
  }
}
