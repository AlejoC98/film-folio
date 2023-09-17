import { Component, HostListener } from '@angular/core';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  faAngleDown = faAngleDown;

  scrollDown(): void {
    window.scroll(0, window.innerHeight);
  }

  @HostListener('window:scroll')
    onWindowScroll() {
      var titleEle = document.getElementById('title');

      titleEle!.style.paddingTop = `${window.scrollY}px`;
    }
  
}
