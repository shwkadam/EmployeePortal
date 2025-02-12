import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ModuleRegistry } from 'ag-grid-community';  // Import ModuleRegistry
import { ClientSideRowModelModule } from 'ag-grid-community';  // Import ClientSideRowModelModule
import { AgGridModule } from 'ag-grid-angular';  // AG Grid Angular Module

ModuleRegistry.registerModules([ClientSideRowModelModule]);
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLinkActive, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Demo';
}
