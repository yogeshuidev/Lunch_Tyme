import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  // private amazonDataUrl:string = 'https://s3.amazonaws.com/br-codingexams/restaurants.json';
  private amazonDataUrl = 'src/app/mock/restaurants.json';

  constructor(private http: HttpClient) { }

  public fetchRestaurantData(): Observable<Object> {
    return this.http.get(this.amazonDataUrl);
  }
}
