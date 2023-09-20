import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss']
})
export class ReviewsComponent {
  @Input() global!: any;
  @Input() local!: any;

  activeTab: number = 0;

  getReviewAuthorProfile(details: any) {
    return details.avatar_path != null ? `https://image.tmdb.org/t/p/original${ details.avatar_path }` : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png';
  }
}
