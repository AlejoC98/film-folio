import { Component, ViewEncapsulation } from '@angular/core';
import { faStar, faGlobe, faArrowRight, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { faClock, faCalendarDays, faBookmark, faHeart } from '@fortawesome/free-regular-svg-icons';
@Component({
  selector: 'app-card',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  faStar = faStar;
  faClock = faClock;
  faCalendarDays = faCalendarDays;
  faGlobe = faGlobe;
  faArrowRight = faArrowRight;
  faHeart = faHeart;
  faBookmark = faBookmark;
  faEllipsisVertical = faEllipsisVertical;
}
