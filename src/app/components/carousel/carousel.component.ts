import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-carousel',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {
  slides: any[] = new Array(3).fill({id: -1, src: '', title: '', subtitle: ''});

  constructor() {}

  ngOnInit(): void {
    this.slides[0] = {
      title: 'New Movie',
      subtitle: 'Watch Now',
      src: '2vFuG6bWGyQUzYS9d69E5l85nIz.jpg',
    };
    this.slides[1] = {
      title: 'New Movie',
      subtitle: 'Watch Now',
      src: 'rbqxeMXNCCwGErcO4e6eUZA9LG1.jpg',
    }
    this.slides[2] = {
      title: 'New Movie',
      subtitle: 'Watch Now',
      src: '4XM8DUTQb3lhLemJC51Jx4a2EuA.jpg',
    }
    this.slides[3] = {
      title: 'New Movie',
      subtitle: 'Watch Now',
      src: '5YZbUmjbMa3ClvSW1Wj3D6XGolb.jpg',
    }
  }
}
