import { Component } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { RouterOutlet } from '@angular/router';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [SharedModule, RouterOutlet, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

}
