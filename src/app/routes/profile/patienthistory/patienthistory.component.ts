import { Component } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';

@Component({
  selector: 'app-patienthistory',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './patienthistory.component.html',
  styleUrl: './patienthistory.component.scss'
})
export class PatienthistoryComponent {

  patientName = 'Sai Kumar Dothula';
  patientAge = 29;
  patientGender = 'Male';
  healthRecords = '2 Health Records';
  bloodGroup = 'O positive';
  height = '168 cm';
  weight = '60 Kgs';

  sections = [
    { title: 'Chief Complaints', content: 'Click "Edit" to add Chief Complaints if any' },
    { title: 'Vitals', content: 'Click "Edit" to add Vitals' },
    { title: 'Health Issues', content: 'Click "Edit" to add health issues if any' },
    { title: 'Procedures', content: 'Click "Edit" to add procedures if any' },
    { title: 'Surgeries', content: 'Click "Edit" to add surgeries if any' }
  ];

  editSection(section: any) {
    // Add your edit logic here (e.g., open a modal, show an input field)
    console.log('Editing:', section.title);
  }
}
