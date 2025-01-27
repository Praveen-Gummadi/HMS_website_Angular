import { Component } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { MatDialog } from '@angular/material/dialog';
import { RescheduleDialogComponent } from '../reschedule-dialog/reschedule-dialog.component';
import { CancelOrderDialogComponent } from '../cancel-order-dialog/cancel-order-dialog.component';

@Component({
  selector: 'app-myorders',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './myorders.component.html',
  styleUrl: './myorders.component.scss'
})
export class MyordersComponent {
  selectedFilter: string = 'all-orders';

  constructor(private dialog: MatDialog) {}

  orders = [
    {
      id: '35184812',
      date: '28 October 2024',
      type: 'Virtual Consultation',
      status: 'Confirmed',
      appointment: '25 Jan 2025, 12:15 PM',
      patient: 'Rajesh',
    },
    {
      id: '35184813',
      date: '15 December 2024',
      type: 'Lab Test',
      status: 'Pending',
      appointment: '27 Jan 2025, 10:30 AM',
      patient: 'Suresh',
    },
  ];

  filteredOrders = [...this.orders];

  filterOrders() {
    if (this.selectedFilter === 'all') {
      this.filteredOrders = [...this.orders];
    } else {
      this.filteredOrders = this.orders.filter(
        (order) => order.type.toLowerCase() === this.selectedFilter
      );
    }
  }

  RescheduleDialog(orderId: string) {
    const dialogRef = this.dialog.open(RescheduleDialogComponent, {
      width: '400px', // Adjust width as needed
      data: {} // Pass any data if needed
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Reschedule Data:', result); // Handle the form data
      }
    });
  }

  cancelOrder(orderId: string) {
    const dialogRef = this.dialog.open(CancelOrderDialogComponent, {
      width: '400px',
      data: {} // Pass any data if needed
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Cancellation Data:', result);
      }
    });
  }

  getCalendarDate(appointment: string): string {
    return appointment.split(',')[0];
  }

  getCalendarDay(appointment: string): string {
    return 'Sat, Jan 25';
  }

  getCalendarTime(appointment: string): string {
    return appointment.split(',')[1].trim();
  }
}
