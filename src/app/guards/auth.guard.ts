import { inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { CanActivateFn, Router } from '@angular/router';
import { map, take } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {

  const fbAuth: AngularFireAuth = inject(AngularFireAuth);
  const router: Router = inject(Router);

  return fbAuth.authState.pipe(
    map((user) => {
      switch (route.routeConfig?.path) {
        case 'Home':
          if (user) {
            return true;
          } else {
            router.navigate(['./Login']);
            return false;
          }
        case 'Login':
          if (user) {
            router.navigate(['./Home']);
            return false;
          } else {
            return true
          }
        default:
          return false;
      }
    })
  )
};
