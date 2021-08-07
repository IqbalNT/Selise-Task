import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from 'src/app/shared/helpers/custom.validators';
import * as moment from 'moment';
import { FlightList, FlightSearch } from '../models/flight.model';
import { Subscription } from 'rxjs';
import { Flightservice } from '../services/flight.service';
@Component({
  selector: 'app-flight',
  templateUrl: './flight.component.html',
  styleUrls: ['./flight.component.scss'],
})
export class FlightComponent implements OnInit, OnDestroy {
  form: FormGroup;
  currentDate = moment(Date.now()).format('YYYY-MM-DD');
  minReturnDate = moment(Date.now()).format('YYYY-MM-DD');
  departureDateError: boolean = true;
  flightList: FlightList[] = [];
  flightListSub: Subscription;
  isSearchBtnClicked: boolean = false;
  constructor(private fb: FormBuilder, private flightService: Flightservice) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      departureAirportCode: [
        '',
        [Validators.required, CustomValidators.alfaNumericCheck],
      ],
      arrivalAirportCode: [
        '',
        [Validators.required, CustomValidators.alfaNumericCheck],
      ],
      departureDate: ['', [Validators.required]],
      returnDate: ['', Validators.required],
    });
  }

  get departureAirportCode() {
    return this.form.get('departureAirportCode');
  }
  get arrivalAirportCode() {
    return this.form.get('arrivalAirportCode');
  }
  get departureDate() {
    return this.form.get('departureDate');
  }
  get returnDate() {
    return this.form.get('returnDate');
  }

  onChangeDepartureDate(event: any) {
    if (moment(event.value).format('YYYY-MM-DD') < this.currentDate) {
      return;
    }
    this.minReturnDate = moment(event.value).format('YYYY-MM-DD');
  }

  onFlightSearch(values: FlightSearch) {
    if (this.form.valid) {
      this.isSearchBtnClicked = true;
      this.flightListSub = this.flightService.getFlight(values).subscribe(
        (data) => {
          this.isSearchBtnClicked = false;
          if (data.length) {
            this.flightList = data;
          }
        },
        (error) => {
          this.isSearchBtnClicked = false;
          console.log('server error');
        }
      );
    }
  }
  onResetForm(){
    this.flightList = [];
    this.form.patchValue({
      departureAirportCode:'',
      arrivalAirportCode:'',
      departureDate:'',
      returnDate:'',
    })
  }
  ngOnDestroy(): void {
    if (this.flightListSub) {
      this.flightListSub.unsubscribe();
    }
  }
}
