import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { GoogleMapsService } from '../../../services/common/google.service';
import { RestaurantBridgeService } from '../../../services/cmp_services/restaurant_bridge.service';

@Component({
  selector: 'app-restaurant-detail-cmp',
  templateUrl: './restaurant-detail.component.html',
  styleUrls: ['./restaurant-detail.component.css']
})
export class RestaurantDetailComponent implements OnInit, OnDestroy {
  private _restaurantData;
  @Input()
  set restaurantData(restaurantData) {
    if (restaurantData) {
      this._restaurantData = restaurantData;
      this.initData();
      this.openPanel();
      this.showGoogleMaps(100, 100);
    } else if (restaurantData === null) {
      this.closePanel();
    }
  }

  get restaurantData() {
    return this._restaurantData;
  }

  @Output()
  public clearParentDataEmitter: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  public detailDisplayOpenStatusEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();

  private _isOpen = false;
  get isOpen() { return this._isOpen; }
  set isOpen(isOpen: boolean) { this._isOpen = isOpen; }

  private _restaurantName = '';
  get restaurantName() { return this._restaurantName; }
  set restaurantName(name: string) { this._restaurantName = name; }

  private _restaurantCategory = '';
  get restaurantCategory() { return this._restaurantCategory; }
  set restaurantCategory(category: string) { this._restaurantCategory = category; }

  private _restaurantAddress1 = '';
  get restaurantAddress1() { return this._restaurantAddress1; }
  set restaurantAddress1(address: string) { this._restaurantAddress1 = address; }

  private _restaurantAddress2 = '';
  get restaurantAddress2() { return this._restaurantAddress2; }
  set restaurantAddress2(address: string) { this._restaurantAddress2 = address; }

  private _restaurantAddress3 = '';
  get restaurantAddress3() { return this._restaurantAddress3; }
  set restaurantAddress3(address: string) { this._restaurantAddress3 = address; }

  private _restaurantPhoneNo = '';
  get restaurantPhoneNo() { return this._restaurantPhoneNo; }
  set restaurantPhoneNo(phoneNo: string) { this._restaurantPhoneNo = phoneNo; }

  private _restaurantTwitter = '';
  get restaurantTwitter() { return this._restaurantTwitter; }
  set restaurantTwitter(twitter: string) { this._restaurantTwitter = twitter ? ('@' + twitter) : ''; }

  private _restaurantLatitude = 0;
  get restaurantLatitude() { return this._restaurantLatitude; }
  set restaurantLatitude(lat: number) { this._restaurantLatitude = lat; }

  private _restaurantLongitude = 0;
  get restaurantLongitude() { return this._restaurantLongitude; }
  set restaurantLongitude(lng: number) { this._restaurantLongitude = lng; }

  get restaurantDataLoaded() { return this.restaurantData ? true : false; }

  constructor(private googleMapsService: GoogleMapsService,
    private restaurantBridgeService: RestaurantBridgeService) {
  }

  ngOnInit() {
    this.initData();
  }

  private showGoogleMaps(lat: number, lng: number): void {
    if (this.restaurantData) {
      this.restaurantLatitude = this.restaurantData.location ? this.restaurantData.location.lat : 0;
      this.restaurantLongitude = this.restaurantData.location ? this.restaurantData.location.lng : 0;
      if (this.restaurantLatitude && this.restaurantLongitude) {
        this.googleMapsService.showMap(this.restaurantLatitude, this.restaurantLongitude);
      }
    }
  }

  private initData() {
    if (this.restaurantData) {
      this.restaurantName = this.restaurantData.name || '';
      this.restaurantCategory = this.restaurantData.category || '';
      this.restaurantAddress1 = this.restaurantData.location ? this.restaurantData.location.formattedAddress[0] : '';
      this.restaurantAddress2 = this.restaurantData.location ? this.restaurantData.location.formattedAddress[1] : '';
      this.restaurantAddress3 = this.restaurantData.location ? this.restaurantData.location.formattedAddress[2] : '';
      this.restaurantPhoneNo = this.restaurantData.contact ? this.restaurantData.contact.formattedPhone : '';
      this.restaurantTwitter = this.restaurantData.contact ? this.restaurantData.contact.twitter : '';
    }
  }

  ngOnDestroy() {
    this.clearData();
  }

  closePanel() {
    this.detailDisplayIsClosed();
    this.clearParentData();
    this._restaurantData = null;
  }

  openPanel() {
    if (this.restaurantData) {
      this.detailDisplayIsOpen();
    }
  }

  clearData() {
    this.clearParentData();
  }

  clearParentData() {
    this.clearParentDataEmitter.emit();
  }

  detailDisplayIsOpen() {
    this.isOpen = true;
    this.detailDisplayOpenStatusEmitter.emit(true);
    this.restaurantBridgeService.detailDisplayIsOpen.next(true);
  }

  detailDisplayIsClosed() {
    this.isOpen = false;
    this.detailDisplayOpenStatusEmitter.emit(false);
  }
}
