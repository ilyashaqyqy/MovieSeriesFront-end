import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from '../model/movie';
import { MovieService } from '../service/movie.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-movie-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss']
})
export class MovieDetailComponent implements OnInit {
  showNotification = false;
  movie: Movie | undefined;
  movieImageMapping: { [key: string]: string } = {
    'The Shawshank Redemption': 'https://i.pinimg.com/736x/b3/72/3b/b3723b1a5a16ccbe684715da3ea30516.jpg',
    'Forrest Gump': 'https://m.media-amazon.com/images/I/718o2FI-a0L._AC_UF894,1000_QL80_.jpg',
    'Inception': 'https://m.media-amazon.com/images/I/71DwIcSgFcS.jpg',
    'The Godfather': 'https://i.ebayimg.com/images/g/X~cAAOSwz2ZiaB2w/s-l1600.jpg',
    'Pulp Fiction': 'https://storage.googleapis.com/pod_public/750/157513.jpg',
    'The Dark Knight': 'https://m.media-amazon.com/images/I/818hyvdVfvL._AC_UF894,1000_QL80_.jpg',
    
  };

  constructor(private route: ActivatedRoute, private movieService: MovieService) {}

  ngOnInit(): void {
    this.loadMovie();
  }

  loadMovie(): void {
    const idFilm = this.route.snapshot.paramMap.get('id'); // Assuming route param name is 'id'
    if (idFilm) {
      const idFilmNumber = Number(idFilm); // Convert idFilm to number if necessary
      this.movieService.getMovieById(idFilmNumber)
        .subscribe(
          movie => {
            this.movie = movie;
          },
          error => {
            console.error('Error fetching movie details:', error);
            // Handle error as needed
          }
        );
    }
  }


  addToFavorites(): void {
    if (this.movie && this.movie.idFilm) {
      this.movieService.addMovieToFavorites(this.movie.idFilm)
        .subscribe(
          () => {
            console.log('Movie added to favorites');
            this.showNotification = true;
            setTimeout(() => {
              this.showNotification = false;
            }, 3000); // Hide the notification after 3 seconds
          },
          error => {
            console.error('Error adding movie to favorites:', error);
          }
        );
    }
  }

  getMovieImage(): string {
    if (this.movie && this.movie.titre) {
      return this.movieImageMapping[this.movie.titre] || 'https://i.pinimg.com/736x/95/c7/6e/95c76ec2245abbabb5304052fc6388a7.jpg'; // Default image if no mapping found
    }
    return 'https://i.pinimg.com/736x/95/c7/6e/95c76ec2245abbabb5304052fc6388a7.jpg'; // Default image if no movie or title available
  }
}
