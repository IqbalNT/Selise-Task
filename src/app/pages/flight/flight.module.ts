import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { FlightComponent } from './flight/flight.component';
import { FlightListComponent } from './flight-list/flight-list.component';
import { Flightservice } from './services/flight.service';
import { NgxPaginationModule } from 'ngx-pagination';
export const routes = [
  { path: '', component: FlightComponent, pathMatch: 'full' },
];

@NgModule({
  declarations: [FlightComponent, FlightListComponent],
  imports: [SharedModule, NgxPaginationModule, RouterModule.forChild(routes)],
  providers: [Flightservice],
})
export class FlightModule {}
