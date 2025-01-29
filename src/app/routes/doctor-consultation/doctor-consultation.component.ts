import { Component } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { MatDialogModule } from '@angular/material/dialog';


interface Doctor {
  name: string;
  experience: number;
  specialization: string;
  hospital: string;
  fee: number;
  image: string;
}

@Component({
  selector: 'app-doctor-consultation',
  standalone: true,
  imports: [SharedModule, MatDialogModule],
  templateUrl: './doctor-consultation.component.html',
  styleUrl: './doctor-consultation.component.scss'
})
export class DoctorConsultationComponent {

  showPopup = false;
  searchQuery: string = '';

  doctors: Doctor[] = [
    {
      name: 'Dr. Dheeraj Kumar Anupa',
      experience: 11,
      specialization: 'MBBS, MD - General Medicine, DNB - Gastroenterology',
      hospital: 'Empower Hospitals, Hyderabad',
      fee: 399,
      image: 'doctor-3d.png'
    },
    {
      name: 'Dr. Naveen Nadipelli',
      experience: 18,
      specialization: 'MBBS, DPM - Psychiatry',
      hospital: 'Empower Hospitals, Hyderabad',
      fee: 699,
      image: 'doctor-3d.png'
    },
    {
      name: 'Dr. Uday Nallamala',
      experience: 15,
      specialization: 'MBBS, DPM - Dentist',
      hospital: 'Empower Hospitals, Hyderabad',
      fee: 299,
      image: 'doctor-3d.png'
    },
  ];

  filteredDoctors: Doctor[] = [...this.doctors];

  onSearchKeyup(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.searchDoctors();
    } else {
      this.searchDoctors();
    }
  }

  searchDoctors() {
    if (this.searchQuery.trim() === '') {
      this.filteredDoctors = [...this.doctors];
    } else {
      this.filteredDoctors = this.doctors.filter(doctor =>
        doctor.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        doctor.specialization.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  }

  selectedDoctor: Doctor | null = null;
  isDoctorSelected: boolean = false;

  selectDoctor(doctor: Doctor) {
    this.selectedDoctor = doctor;
    this.isDoctorSelected = true;
  }

  goBackToDoctorList() {
    this.selectedDoctor = null;
    this.isDoctorSelected = false;
  }

  daysSlots: { [date: string]: string[] } = {};
  selectedDate: string = '';
  selectedSlot: string | null = null;
  displayedDates: string[] = [];
  startDate: Date = new Date();

  constructor() {
    this.generateTimeSlots();
  }

  generateTimeSlots() {
    this.daysSlots = {};
    this.displayedDates = [];

    const startHour = 9; // 9 AM
    const endHour = 17; // 5 PM

    for (let i = 0; i < 7; i++) {
      const date = new Date(this.startDate);
      date.setDate(this.startDate.getDate() + i);

      const dateString = date.toISOString().split('T')[0];
      this.displayedDates.push(dateString);
      const slotsForDay = [];

      for (let hour = startHour; hour < endHour; hour++) {
        for (let minute = 0; minute < 60; minute += 15) {
          const slotTime = new Date(date);
          slotTime.setHours(hour, minute, 0);
          slotsForDay.push(
            slotTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })
          );
        }
      }

      this.daysSlots[dateString] = slotsForDay;
    }

    // Default selection: Select the first available date
    this.selectedDate = this.displayedDates[0];
  }

  selectDate(date: string) {
    this.selectedDate = date; // Update selected date
    this.selectedSlot = null; // Reset selected slot
  }

  selectSlot(slot: string) {
    this.selectedSlot = slot;
  }

  previousWeek() {
    this.startDate.setDate(this.startDate.getDate() - 1);
    this.generateTimeSlots();
  }

  nextWeek() {
    this.startDate.setDate(this.startDate.getDate() + 1);
    this.generateTimeSlots();
  }

  showPreview: boolean = false;

  goToAppointmentPreview() {
    if (this.selectedDoctor && this.selectedSlot) {
      this.showPreview = true;
    } else {
      alert('Please select a doctor and time slot.');
    }
  }

  goBack() {
    this.showPreview = false;
  }

  goNext() {
    this.showPopup = true;
  }

  confirmAppointment(payment: boolean) {
    if (payment) {
      alert('Redirecting to payment gateway...');
    } else {
      alert('Appointment confirmed without payment!');
    }
    this.showPreview = false;
  }

  dialogsubmit() {
    this.showPopup = false;
  }
}

