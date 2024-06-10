import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { bootstrapApplication, provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import { PermisionAuth } from './pages/auth/services/auth.guard';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withFetch()),
    provideAnimations(), // required animations providers
    provideToastr(), provideClientHydration(),// Toastr providers
    CookieService,
    PermisionAuth
  ]
};
