import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { IContainer } from 'src/app/shared/models/api-container.model';
import { FlightList, FlightSearch } from '../models/flight.model';

@Injectable()
export class Flightservice {
  constructor(private http: HttpClient) {}

  getFlight(post: FlightSearch): Observable<FlightList[]> {
    return this.http.post<IContainer>(`/post/get-flights`, post).pipe(
      map((response) =>
        response.isExecuted && response.data ? response.data : []
      ),
      catchError((error) => of([]))
    );
  }
}
