import { NgModule, inject } from '@angular/core';
import { RouterModule, Route, CanActivateFn } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AuthService } from './services/auth.service';

const canActivate: CanActivateFn = () => {
  return inject(AuthService).canActivate();
}

export const appRoutes: Route[] = [
  { path: 'signin', component: SignInComponent },
  { path: 'signup', component: SignUpComponent },
  {
    path: '',
    component: ProfileComponent,
    canActivate: [canActivate],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
