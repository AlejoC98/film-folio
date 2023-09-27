import { Component, Input, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { NgxSpinnerService } from 'ngx-spinner';
import { Movie } from 'src/app/interfaces/movie';
import { TMDBService } from 'src/app/services/tmdb.service';

@Component({
  selector: 'app-search-modal',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './search-modal.component.html',
  styleUrls: ['./search-modal.component.scss']
})
export class SearchModalComponent {

  @Input() visible = false;

  constructor(
    private spinner: NgxSpinnerService,
    private tmdbService: TMDBService
  ) {}
  
  faX = faX;
  keyword = new FormControl('');
  searchContent: Movie[] | undefined;
  searchMessage: string = 'Start Your Journey'

  toggleVisibility() {
    this.visible = !this.visible;
  }

  serachMovie() {
    this.spinner.show();
    this.tmdbService.search(this.keyword.value!).subscribe({
      next: (movies: Movie[]) => {
        this.searchContent = movies;
        if (movies.length <= 0) {
          this.searchMessage =  'Oops! No results found';
        }
        this.spinner.hide();
      }
    });
  }
}
