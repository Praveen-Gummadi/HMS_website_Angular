import { Component } from '@angular/core';

export interface Receipt {
  customerName: string;
  orderId: string;
  orderDate: string;
  service: string;
  serviceName: string;
  appointmentDate: string;
  beneficiaryName: string;
  qty: number;
  amount: number;
  totalAmount: number;
  amountPaid: number;
  amountInWords: string;
}

@Component({
  selector: 'app-recipt',
  standalone: true,
  imports: [],
  templateUrl: './recipt.component.html',
  styleUrl: './recipt.component.scss'
})
export class ReciptComponent {
  receiptData: Receipt;

  constructor() {
    // Sample dynamic data
    this.receiptData = {
      customerName: 'Aswin Panday',
      orderId: '3456098732',
      orderDate: 'Jan 20, 2025 04:40 PM',
      service: 'Glucose Random (RBS) - Sodium Fluoride',
      serviceName: 'Investigation',
      appointmentDate: '25-Jan-2025 12:00',
      beneficiaryName: 'Aswin Panday',
      qty: 1,
      amount: 119,
      totalAmount: 119,
      amountPaid: 119,
      amountInWords: 'one hundred nineteen rupees only'
    };
  }

  ngOnInit(): void {}
}
