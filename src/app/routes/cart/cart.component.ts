import { Component, NgModule, ViewChild, AfterViewInit, ChangeDetectorRef, OnInit } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { MatStepper } from '@angular/material/stepper';
import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { MyheaderComponent } from '../profile/myheader/myheader.component';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../authentication/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { AddpatientDialogComponent } from '../lab-dashboard/addpatient-dialog/addpatient-dialog.component';
import { LabService } from '../lab-dashboard/lab.service';
import { MatButtonToggle } from '@angular/material/button-toggle';

type AvailableDate = {
  day: string;
  weekday: string;
  isAvailable: boolean;
};

declare var Razorpay: any;

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [SharedModule, MyheaderComponent, MatButtonToggle],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})

export class CartComponent implements OnInit {

  @ViewChild(MatStepper) stepper: MatStepper | undefined;

  locationDetails = localStorage.getItem('userAddress');

  addressLine1: string = '';
  addressLine2: string = '';
  username: string = '';
  phone: string = '';
  email: string = '';

  cartItems: any[] = [];
  tests: any[] = [];
  selectedSlottype : string = '';


  // Flag to toggle form visibility
  showForm: boolean = false;
  isSignedIn: boolean = false;

  constructor(private route: ActivatedRoute, private authService: AuthService, private dialog: MatDialog,
    private labservice: LabService,

  ) {
    this.updateVisibleDates();
  }

  ngOnInit(): void {

    // this.cartItems = this.labservice.getCartItems();

    this.cartItems = this.formatCartData(this.labservice.getCartItems());
    console.log(this.cartItems);
    this.route.queryParams.subscribe(params => {
      const step = params['step']; // e.g., step=2
      if (step && this.stepper) {
        this.stepper.selectedIndex = +step - 1; // Set the step index (0-based index)
      }
    });

    this.isSignedIn = this.authService.isSignedIn();

    if (this.isSignedIn) {
      this.username = String(localStorage.getItem('username'));
      this.phone = String(localStorage.getItem('usermobile'));
      this.email = String(localStorage.getItem('useremail'));
    }

    if (this.locationDetails) {
      const addressParts = this.locationDetails.split(', ');

      this.addressLine1 = addressParts[0] || '';

      this.addressLine2 = addressParts.slice(1).join(', ') || '';
    }

    this.totalAmount;
  }

  formatCartData(data: any[]): any[] {
    const patients: any[] = [];

    // Group tests under patients dynamically
    data.forEach(test => {
      // Find if patient already exists
      let patient = patients.find(p => p.id === test.patientID);

      if (!patient) {
        // If patient doesn't exist, create a new one
        patient = {
          id: test.patientID,  // Assuming `patientID` exists in API data
          patientName: test.patientName, // Assuming `patientName` exists
          tests: []
        };
        patients.push(patient);
      }

      // Add test details under the respective patient
      patient.tests.push({
        serviceItemID: test.serviceItemID,
        serviceItemName: test.serviceItemName,
        actualprice: test.price - (test.price * test.discount / 100) // Apply discount
      });
    });

    return patients;
  }

  // Toggle the form visibility
  toggleForm() {
    this.showForm = !this.showForm;
  }

  // Dynamic cart data
  // cartItems = [
  //   {
  //     id: 1,
  //     patientName: 'John Doe',
  //     tests: [
  //       { id: 1, testName: 'Glucose Random (RBS) - Sodium Flouride', price: 249 },
  //     ],
  //   },
  // ];



  // Add a new patient
  addAnotherPatient() {
    const newPatientId = this.cartItems.length + 1;
    this.cartItems.push({
      id: newPatientId,
      patientName: `Patient ${newPatientId}`,
     tests: [], // Empty test list initially
      // tests: this.cartItems
    });
  }

  // Add a new test for a specific patient
  addTest(patientId: number) {
    const patient = this.cartItems.find((p) => p.id === patientId);
    if (patient) {
      const newTestId = patient.tests.length + 1;
      patient.tests.push({
        id: newTestId,
        testName: `New Test ${newTestId}`,
        price: 199, // Example price
      });
    }
  }

  // Remove a specific test from a specific patient
  removeTest(patientId: number, testId: number) {
    const patientIndex = this.cartItems.findIndex(p => p.id === patientId);

    if (patientIndex !== -1) {
      // Filter out the test to remove
      this.cartItems[patientIndex].tests = this.cartItems[patientIndex].tests.filter((test: { serviceItemID: number; }) => test.serviceItemID !== testId);

      // If the patient has no more tests, remove them from the cart
      if (this.cartItems[patientIndex].tests.length === 0) {
        this.cartItems.splice(patientIndex, 1);
      }

      // Force Angular to detect changes
      this.cartItems = [...this.cartItems];
    }
  }


  // Summary amount (calculated dynamically)
  get totalAmount(): number {
    if (!this.cartItems || this.cartItems.length === 0) return 0;

    return this.cartItems.reduce((total, patient) => {
      if (!patient.tests || patient.tests.length === 0) return total;

      const patientTotal = patient.tests.reduce((testTotal: number, test: { actualprice: number; }) => {
        console.log(`Adding Test: Price: ${test.actualprice}`);
        return testTotal + (test.actualprice || 0);
      }, 0);
      return total + patientTotal;
    }, 0);
  }




  // Method to handle the "Next" button click
  saveandnext(stepper: MatStepper) {
    // Add any save logic here if needed
    console.log('Navigating to the next step...');
    stepper.next();
  }

   // Available dates for selection
   availableDates: AvailableDate[] = [
    { day: '31 Dec', weekday: 'Tuesday', isAvailable: true },
    { day: '01 Jan', weekday: 'Wednesday', isAvailable: true },
    { day: '02 Jan', weekday: 'Thursday', isAvailable: true },
    { day: '03 Jan', weekday: 'Friday', isAvailable: true },
    { day: '04 Jan', weekday: 'Saturday', isAvailable: true },
    { day: '05 Jan', weekday: 'Sunday', isAvailable: true },
  ];

  // Visible dates should have the same type as availableDates
  visibleDates: AvailableDate[] = [];
  visibleCount = 5; // Number of dates visible at a time
  currentIndex = 0;
  selectedDateIndex: number | null = null;

  // Update the visible dates
  updateVisibleDates() {
    this.visibleDates = this.availableDates.slice(
      this.currentIndex,
      this.currentIndex + this.visibleCount
    );
  }

  // Navigate to the previous set of dates
  prevDate() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.updateVisibleDates();
    }
  }

  // Navigate to the next set of dates
  nextDate() {
    if (this.currentIndex + this.visibleCount < this.availableDates.length) {
      this.currentIndex++;
      this.updateVisibleDates();
    }
  }

  // Select a date
  selectDate(index: number) {
    this.selectedDateIndex = index;
    console.log('Selected Date:', this.visibleDates[index]);
  }


  // Morning and Afternoon slots data
  morningSlots = [
    { start: '06:00 AM', end: '07:00 AM' },
    { start: '07:00 AM', end: '08:00 AM' },
    { start: '08:00 AM', end: '09:00 AM' },
    { start: '09:00 AM', end: '10:00 AM' },
    { start: '10:00 AM', end: '11:00 AM' },
    { start: '11:00 AM', end: '12:00 PM' },
  ];

  afternoonSlots = [
    { start: '12:00 PM', end: '01:00 PM' },
    { start: '01:00 PM', end: '02:00 PM' },
  ];

  // Variable to store the selected time slot
  selectedSlot: { start: string; end: string } | null = null;

  // Select a time slot
  selectSlot(slot: { start: string; end: string }) {
    this.selectedSlot = slot;
    console.log('Selected Time Slot:', slot);
  }




   // Selected date and time slot
   selectedDate: { day: string; weekday: string } = { day: '16 Jan', weekday: 'Tuesday' };
   selectedSlot1: { start: string; end: string } = { start: '11:00 AM', end: '12:00 PM' };


   // add patient button disable

   isHomeSlotActive: boolean = false;
   ispaymentSlotActive: boolean = false;

   onStepChange(event: StepperSelectionEvent): void {
     const activeStepLabel = event.selectedStep.label;
     this.isHomeSlotActive = activeStepLabel === 'Home Slot';
     this.ispaymentSlotActive = activeStepLabel === 'Payment';
   }


   // Razorpay integration////////////////////////////////////////////////////////////////////////

   proceedtopay () {
    const RozarpayOptions = {
      description: 'Sample Razorpay demo',
      currency: 'INR',
      amount: 24900,
      name: 'Praveen Kumar',
      key: 'rzp_test_L4KYt4E6LiVOhg',
      image: 'emptylogo.png',
      prefill: {
        name: 'Praveen Kumar',
        email: 'praveen@gmail.com',
        phone: '0987654321'
      },
      theme: {
        color: '#e36464'
      },
      modal: {
        ondismiss:  () => {
          console.log('dismissed')
        }
      }
    }

    const successCallback = (paymentid: any) => {
      console.log(paymentid);
    }

    const failureCallback = (e: any) => {
      console.log(e);
    }

    Razorpay.open(RozarpayOptions,successCallback, failureCallback)
   }

   goBack(): void {
    window.history.back();
  }
  openAddPatientDialog(): void {
    const dialogRef = this.dialog.open(AddpatientDialogComponent, {
      width: '800px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Patient Data:', result);
      }
    });
  }
}
