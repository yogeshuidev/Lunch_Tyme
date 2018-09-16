import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RestaurantBridgeService {
  public currentlySelectedRestaurant: any;
  public detailDisplayIsOpen = new Subject<boolean>();
}
