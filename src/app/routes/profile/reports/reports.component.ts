import { Component } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.scss'
})
export class ReportsComponent {

  patientName = 'Sai Kumar Dothula';
  patientAge = 29;
  patientGender = 'Male';
  healthRecords = '2 Health Records';
  bloodGroup = 'O positive';
  height = '168 cm';
  weight = '60 Kgs';

}
