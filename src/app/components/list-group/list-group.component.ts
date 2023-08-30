import { Component, Input, ViewEncapsulation } from '@angular/core';
import { Movie } from 'src/app/interfaces/movie';

@Component({
  selector: 'app-list-group',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './list-group.component.html',
  styleUrls: ['./list-group.component.scss']
})
export class ListGroupComponen {
  @Input() list: Movie[] = [];

}
