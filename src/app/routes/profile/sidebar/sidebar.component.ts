import { Component } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [SharedModule, RouterLink, RouterLinkActive, MatButtonToggleModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {

  isSidebarOpen = true;

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
}
