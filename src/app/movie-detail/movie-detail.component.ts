import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../service/movie.service';
import { Movie } from '../model/movie';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-movie-detail',
  standalone: true, 
  imports: [CommonModule ],
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {
  movie: Movie | undefined;
  error: string | null = null;
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService
  ) {}

  ngOnInit() {
    this.loadMovie();
  }

  loadMovie() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (isNaN(id)) {
      this.error = 'Invalid movie ID';
      return;
    }

    /*
    this.loading = true;
    this.movieService.getMovieById(id).subscribe(
      (movie) => {
        this.movie = movie;
        this.loading = false;
      },
      (error) => {
        console.error('Error fetching movie:', error);
        this.error = 'Failed to load movie. Please try again later.';
        this.loading = false;
      }
    );
    */
  }
    
}