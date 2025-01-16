import { Component } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SharedModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  services = [
    {
      icon: 'male-doctor.png',
      title: 'Doctor Consultation',
      route: '/',
    },
    {
      icon: 'lab-icon-top.png',
      title: 'Book Lab Tests/Profiles/Health Check-Up Packages',
      route: '/lab',
    },
    {
      icon: 'x-ray.jpg',
      title: 'X-Rays, Scans and MRI',
      route: '/',
    },
  ];

  packages = [
    {
      title: 'Basic Health Checkup',
      time: '24 - 48 Hrs',
      tests: '59 Tests',
    },
    {
      title: 'Full Body Health Checkup',
      time: '24 - 48 Hrs',
      tests: '81 Tests',
    },
    {
      title: 'Comprehensive Full Body Checkup with Vitamin D & B12',
      time: '24 - 48 Hrs',
      tests: '85 Tests',
    },
  ];
}
