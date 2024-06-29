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
  movie: Movie | undefined;
  movieImageMapping: { [key: string]: string } = {
    'The Shawshank Redemption': 'https://i.pinimg.com/736x/b3/72/3b/b3723b1a5a16ccbe684715da3ea30516.jpg',
    'Movie Title 2': 'https://example.com/image2.jpg',
    // Add more mappings as needed
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

  getMovieImage(): string {
    if (this.movie && this.movie.titre) {
      return this.movieImageMapping[this.movie.titre] || 'https://i.pinimg.com/736x/95/c7/6e/95c76ec2245abbabb5304052fc6388a7.jpg'; // Default image if no mapping found
    }
    return 'https://i.pinimg.com/736x/95/c7/6e/95c76ec2245abbabb5304052fc6388a7.jpg'; // Default image if no movie or title available
  }
}
