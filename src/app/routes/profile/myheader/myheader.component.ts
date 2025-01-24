import { Component } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-myheader',
  standalone: true,
  imports: [SharedModule, RouterLink],
  templateUrl: './myheader.component.html',
  styleUrl: './myheader.component.scss'
})
export class MyheaderComponent {

}
