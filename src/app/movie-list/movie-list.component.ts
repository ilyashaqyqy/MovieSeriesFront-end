import { Component, OnInit } from '@angular/core';
import { Movie } from '../model/movie';
import { MovieService } from '../service/movie.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [CommonModule , RouterModule],
  providers: [MovieService],
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnInit {
  movies: Movie[] = [];

  // Define a mapping of movie titles to image URLs
  movieImageMapping: { [key: string]: string } = {
    'The Shawshank Redemption':"https://i.pinimg.com/736x/b3/72/3b/b3723b1a5a16ccbe684715da3ea30516.jpg",
    'Movie Title 2': 'https://example.com/image2.jpg',
    // Add more mappings as needed
  };

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.loadMovies();
  }

  loadMovies(): void {
    this.movieService.getMovies()
      .subscribe(
        movies => {
          this.movies = movies;
        },
        error => {
          console.error('Error fetching movies:', error);
          // Handle error as needed
        }
      );
  }

  // Method to get the image URL for a given movie title
  getMovieImage(title: string): string {
    return this.movieImageMapping[title] || 'https://i.pinimg.com/736x/95/c7/6e/95c76ec2245abbabb5304052fc6388a7.jpg'; // Default image if no mapping found
  }
}
