import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Movie } from '../model/movie';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private apiUrl = 'http://localhost:8084/api/films'; 

  constructor(private http: HttpClient) {}

  /** GET all movies from the backend */
  getMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(this.apiUrl)
      .pipe(
        catchError(this.handleError) 
      );
  }

  /** GET movie by ID from the backend */
  getMovieById(id: number): Observable<Movie> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Movie>(url)
      .pipe(
        catchError(this.handleError) // Error handling function
      );
  }

  // Example of error handling function, customize as per your application's needs
  private handleError(error: HttpErrorResponse): Observable<never> {
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      console.error('An error occurred:', error.error.message);
    } else {
      // Backend returned an unsuccessful response code
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`
      );
    }
    // Return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  }
}
