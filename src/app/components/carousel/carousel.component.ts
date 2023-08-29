import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carousel',
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
      src: 'https://i0.wp.com/bloody-disgusting.com/wp-content/uploads/2023/05/meg-trench.png?resize=1000%2C495&ssl=1',
    };
    this.slides[1] = {
      title: 'New Movie',
      subtitle: 'Watch Now',
      src: 'https://weliveentertainment.com/wp-content/uploads/2023/08/blue-beetle-banner.jpeg',
    }
    this.slides[2] = {
      title: 'New Movie',
      subtitle: 'Watch Now',
      src: 'https://pbs.twimg.com/media/FzATZWtacAAjZto.jpg:large',
    }
    this.slides[3] = {
      title: 'New Movie',
      subtitle: 'Watch Now',
      src: 'https://pbs.twimg.com/media/F0dYkVIaEAMvRr9.jpg',
    }
  }
}
