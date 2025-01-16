import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-master-layout',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './master-layout.component.html',
  styleUrl: './master-layout.component.scss'
})
export class MasterLayoutComponent {

}
