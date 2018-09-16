import { Component, OnInit } from '@angular/core';
import { SafeStyle } from '@angular/platform-browser';

import { HomeService } from '../../services/cmp_services/home.service';
import { RestaurantBridgeService } from '../../services/cmp_services/restaurant_bridge.service';
import { UtilityService } from '../../services/common/utility.service';

@Component({
  selector: 'app-restaurant-cmp',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.css']
})
export class RestaurantComponent implements OnInit {
  public restaurantData: any;
  public currentlySelectedRestaurant: any;
  public overlayIsVisible = false;

  constructor(private homeService: HomeService,
    private utilityService: UtilityService,
    private restaurantBridgeService: RestaurantBridgeService) {
  }

  ngOnInit(): void {
    this.fetchRestaurantDataOnInit();
    this.restaurantBridgeService.detailDisplayIsOpen.subscribe(state => {
      if (!state) {
        this.clearSelectedRestaurant();
        this.changeOverlayStatus(false);
      }
    });
  }

  fetchRestaurantDataOnInit(): void {
    this.homeService.fetchRestaurantData()
      .subscribe((data: any) => {
        this.restaurantData = data.restaurants ? data.restaurants : data;
      });
  }

  selectRestaurantOnClick(restaurant: any): void {
    this.currentlySelectedRestaurant = restaurant;
  }

  sanitizeImage(imageUrl: string): SafeStyle {
    return this.utilityService.sanitizeImage(imageUrl);
  }

  clearSelectedRestaurant() {
    this.currentlySelectedRestaurant = null;
  }

  changeOverlayStatus(openStatus: boolean) {
    this.overlayIsVisible = openStatus;
  }
}
