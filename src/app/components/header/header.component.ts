import { Component } from '@angular/core';
import { RestaurantBridgeService } from '../../services/cmp_services/restaurant_bridge.service';

@Component({
  selector: 'app-header-component',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isOpen: boolean;
  constructor(private restaurantBridgeService: RestaurantBridgeService) {
    this.restaurantBridgeService.detailDisplayIsOpen.subscribe(state => {
      this.isOpen = state;
    });
  }

  closeDetailDisplay() {
    this.restaurantBridgeService.detailDisplayIsOpen.next(false);
  }
}
