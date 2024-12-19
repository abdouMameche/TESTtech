import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app-routing.module';  // Import routes correctly

export const appConfig = {
  providers: [
    provideHttpClient(),
    provideRouter(routes),  // Provide the router configuration using imported routes
  ],
};
