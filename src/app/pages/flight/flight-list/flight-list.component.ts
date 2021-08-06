import { Component, HostListener, Input, OnInit } from '@angular/core';
import { FlightList } from '../models/flight.model';

@Component({
  selector: 'app-flight-list',
  templateUrl: './flight-list.component.html',
  styleUrls: ['./flight-list.component.scss'],
})
export class FlightListComponent implements OnInit {
  @Input() flightList: FlightList[];
  @Input() flightListBackUp: FlightList[];
  public sidenavOpen: boolean = true;
  public priceFrom: number = 500;
  public priceTo: number = 1500;
  public maxPrice: number = 1;
  public viewType: string = 'list';
  public viewCol: number = 50;
  public counts = [5,10, 15, 20];
  public count: any;
  autoHide: boolean = true;
  page: any;
  constructor() {}

  ngOnInit(): void {
    this.count = this.counts[0];
    this.findMaxPrice();
  }
  public ngDoCheck() {
    this.findMaxPrice();
  }

  findMaxPrice() {
    this.flightList.map((flight) => {
      if (flight.TotalAmount > this.maxPrice) {
        this.maxPrice = flight.TotalAmount;
      }
    });
  }

  public changeCount(count: any) {
    this.count = count;
    this.flightList = this.flightList;
  }

  public changeViewType(viewType: string, viewCol: number) {
    this.viewType = viewType;
    this.viewCol = viewCol;
  }
  public onPageChanged(event: any) {
    this.page = event;
  }

  onChangeFromPrice(e: any) {
    this.flightList = [];
    this.flightListBackUp.map((flight) => {
      if (flight.TotalAmount >= e.value && flight.TotalAmount <= this.priceTo) {
        this.flightList.push(flight);
      }
    });
  }
  onChangeToPrice(e: any) {
    this.flightList = [];
    this.flightListBackUp.map((flight) => {
      if (
        flight.TotalAmount >= this.priceFrom &&
        flight.TotalAmount <= e.value
      ) {
        this.flightList.push(flight);
      }
    });
  }

  @HostListener('window:resize')
  public onWindowResize(): void {
    window.innerWidth < 960
      ? (this.sidenavOpen = false)
      : (this.sidenavOpen = true);
    window.innerWidth < 1280 ? (this.viewCol = 50) : (this.viewCol = 50);
  }
}
