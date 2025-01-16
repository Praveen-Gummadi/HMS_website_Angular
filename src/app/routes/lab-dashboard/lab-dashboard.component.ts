import { Component } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { LabdashboardServiceService } from '../../services/labdashboard-service.service';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-lab-dashboard',
  standalone: true,
  imports: [
    SharedModule,
    MatAutocompleteModule,
    RouterLink
  ],
  templateUrl: './lab-dashboard.component.html',
  styleUrl: './lab-dashboard.component.scss'
})
export class LabDashboardComponent {
  ItemCount:number = 0;
  ItemListInCart:any = [];

  constructor(private labdashboardService: LabdashboardServiceService){}
  ngOnInit(): void {
    this.MedCheckUpService;
  }

  locations: string[] = [
    'Bowenpally Police Station',
    'Pension Lane',
    'Mohammed Nagar',
    'New Bowenpally',
  ];

  MedCheckUpService = [
    {
      id: 1,
      MedService: 'Vitamin D (25-OH)',
      Reports: 'Report in 24-28 Hrs',
      Available: 'Home',
      Price: {
        Price: 1999,
        Discount: '45% OFF',
        FinalPrice: 1099,
      },
    },
    {
      id: 2,
      MedService: 'Vitamin B12-Serum',
      Reports: 'Report in 24-28 Hrs',
      Available: 'Home',
      Price: {
        Price: 1999,
        Discount: '18% OFF',
        FinalPrice: 1099,
      },
    },
    {
      id: 3,
      MedService: 'Lipid Profile',
      Reports: 'Report in 24-28 Hrs',
      Available: 'Home',
      Price: {
        Price: 1999,
        Discount: '50% OFF',
        FinalPrice: 1099,
      },
    },
    {
      id: 4,
      MedService: 'Vitamin B4 (25-OH)',
      Reports: 'Report in 24-28 Hrs',
      Available: 'Home',
      Price: {
        Price: 1999,
        Discount: '60% OFF',
        FinalPrice: 1099,
      },
    },
  ];

  // MedCheckUpServices =
  // [
  //   {
  //     "id": 1,
  //     "MedService": "Vitamin D (25-OH)",
  //     "Reports": "Report in 24-28 Hrs",
  //     "Available": "Home",
  //     "Price": {
  //       "Price": 1999,
  //       "Discount": "45% OFF",
  //       "FinalPrice": 1099
  //     }
  //   },
  //   {
  //     "id": 2,
  //     "MedService": "Vitamin B12-Serum",
  //     "Reports": "Report in 24-28 Hrs",
  //     "Available": "Home",
  //     "Price": {
  //       "Price": 1999,
  //       "Discount": "18% OFF",
  //       "FinalPrice": 1099
  //     }
  //   },
  //   {
  //     "id": 3,
  //     "MedService": "Lipid Profile",
  //     "Reports": "Report in 24-28 Hrs",
  //     "Available": "Home",
  //     "Price": {
  //       "Price": 1999,
  //       "Discount": "50% OFF",
  //       "FinalPrice": 1099
  //     }
  //   },
  //   {
  //     "id": 4,
  //     "MedService": "Vitamin B4 (25-OH)",
  //     "Reports": "Report in 24-28 Hrs",
  //     "Available": "Home",
  //     "Price": {
  //       "Price": 1999,
  //       "Discount": "60% OFF",
  //       "FinalPrice": 1099
  //     }
  //   }
  // ]

  addServiceToCard(cartItem:any){
    this.ItemListInCart = this.labdashboardService.addToCart(this.MedCheckUpService.find(selectedItem=>selectedItem.id === cartItem));
    this.ItemCount++;
    console.log(this.ItemCount);
    console.log(this.ItemListInCart);
  }

  loadServiceData(){
  }
}
