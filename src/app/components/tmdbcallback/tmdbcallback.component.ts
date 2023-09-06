import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { TMDBService } from 'src/app/services/tmdb.service';

@Component({
  selector: 'app-tmdbcallback',
  templateUrl: './tmdbcallback.component.html',
  styleUrls: ['./tmdbcallback.component.scss']
})
export class TmdbcallbackComponent implements OnInit {

  private token: string | undefined;

  constructor(
    private routeActi: ActivatedRoute,
    private route: Router,
    private tmdbService: TMDBService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.routeActi.queryParams.subscribe(params => {
      this.token = params['request_token'];
    });

    // this.tmdbService.createSessionID(this.token!).subscribe({
    //   next: (res: any) => {
    //     this.tmdbService.updateSessionId(res.session_id);
    //     this.authService.setAuthenticated(true);
    //     this.route.navigate(['./Home']);
    //   }
    // });
  }
}
