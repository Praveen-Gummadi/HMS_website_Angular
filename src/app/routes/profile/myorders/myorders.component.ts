import { Component } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';

@Component({
  selector: 'app-myorders',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './myorders.component.html',
  styleUrl: './myorders.component.scss'
})
export class MyordersComponent {
  // Mock data (you can fetch these dynamically using APIs)
  orders = [
    {
      orderDate: '28 October 2024',
      orderId: '35184812',
      orderType: 'Lab tests',
      status: 'Appointment Confirmed',
      appointmentDate: '30-Oct-2024 - 12:00 PM',
      patientName: 'Sai Kumar Dothula',
    },
  ];

  loadPastOrders() {
    console.log('Loading past orders...');
    // Implement logic to load past orders
  }

  reschedule() {
    console.log('Rescheduling...');
    // Implement reschedule logic
  }

  cancel() {
    console.log('Cancelling...');
    // Implement cancel logic
  }
}
