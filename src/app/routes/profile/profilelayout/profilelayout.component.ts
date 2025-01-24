import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SharedModule } from '../../../shared/shared.module';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { MyheaderComponent } from "../myheader/myheader.component";

@Component({
  selector: 'app-profilelayout',
  standalone: true,
  imports: [SharedModule, SidebarComponent, RouterOutlet, MyheaderComponent],
  templateUrl: './profilelayout.component.html',
  styleUrl: './profilelayout.component.scss'
})
export class ProfilelayoutComponent {
  isSidebarClosed = false;

  toggleSidebar() {
    this.isSidebarClosed = !this.isSidebarClosed;
  }
}

