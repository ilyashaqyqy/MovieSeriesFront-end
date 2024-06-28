// src/app/movie-list/movie-list.component.ts

import { Component, OnInit } from '@angular/core';
import { Movie } from '../movie';
import { MovieService } from '../movie.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [CommonModule],
  providers: [MovieService],
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnInit {
  movies: Movie[] = [];

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.loadMovies();
  }

  loadMovies(): void {
    this.movieService.getMovies()
      .subscribe(movies => this.movies = movies);
  }
}

