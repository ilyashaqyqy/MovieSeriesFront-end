import { Component, OnInit } from '@angular/core';
import { Movie } from '../model/movie';
import { MovieService } from '../service/movie.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {
  favoriteMovies: Movie[] = [];
  movieImageMapping: { [key: string]: string } = {
    'The Shawshank Redemption': 'https://i.pinimg.com/736x/b3/72/3b/b3723b1a5a16ccbe684715da3ea30516.jpg',
    'Forrest Gump': 'https://m.media-amazon.com/images/I/718o2FI-a0L._AC_UF894,1000_QL80_.jpg',
    'Inception': 'https://m.media-amazon.com/images/I/71DwIcSgFcS.jpg',
    'The Godfather': 'https://i.ebayimg.com/images/g/X~cAAOSwz2ZiaB2w/s-l1600.jpg',
    'Pulp Fiction': 'https://storage.googleapis.com/pod_public/750/157513.jpg',
    'The Dark Knight': 'https://m.media-amazon.com/images/I/818hyvdVfvL._AC_UF894,1000_QL80_.jpg',
  };

  showNotification = false;
  notificationMessage = '';

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.loadFavoriteMovies();
  }

  loadFavoriteMovies(): void {
    this.movieService.getFavoriteMovies()
      .subscribe(
        movies => {
          console.log('Received favorite movies:', movies);
          this.favoriteMovies = movies;
        },
        error => {
          console.error('Error fetching favorite movies:', error);
          this.showNotification = true;
          this.notificationMessage = 'Error fetching favorite movies. Please try again.';
        }
      );
  }


  removeFromFavorites(movie: Movie): void {
    if (confirm(`Are you sure you want to remove "${movie.titre}" from your favorites?`)) {
      this.movieService.removeMovieFromFavorites(movie.idFilm)
        .subscribe(
          () => {
            this.showNotification = true;
            this.notificationMessage = `"${movie.titre}" has been removed from your favorites.`;
            setTimeout(() => this.showNotification = false, 3000);
            
            // Refresh the entire list from the server
            this.loadFavoriteMovies();
          },
          error => {
            console.error('Error removing movie from favorites:', error);
            this.showNotification = true;
            this.notificationMessage = 'Error removing movie from favorites. Please try again.';
          }
        );
    }
  }

  getMovieImage(movie: Movie): string {
    if (movie && movie.titre) {
      return this.movieImageMapping[movie.titre] || 'https://i.pinimg.com/736x/95/c7/6e/95c76ec2245abbabb5304052fc6388a7.jpg';
    }
    return 'https://i.pinimg.com/736x/95/c7/6e/95c76ec2245abbabb5304052fc6388a7.jpg';
  }
}
