import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'; // Import RouterModule for routing

@Component({
  
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule], // Include RouterModule in imports
  template: `<router-outlet></router-outlet>`, // Render routed components
  styles: [], // No external styles are referenced
})
export class AppComponent {}
