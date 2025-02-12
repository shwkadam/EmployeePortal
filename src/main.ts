import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config'; // Importing the config
import { AppComponent } from './app/app.component'; // Root component

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));  // Catch and log any errors
