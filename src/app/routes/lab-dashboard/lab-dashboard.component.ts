import { Component } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { RouterLink } from '@angular/router';
import { LabService } from './lab.service';


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

  public labtest: any[] = [];
  loading: boolean = true;

  locationDetails = localStorage.getItem('userAddress');
  cartids: any = {};
  constructor(private labService: LabService){}
  ngOnInit(): void {
    const res = this.labService.getlabtestDetails();
    this.labtest = res.data;

    this.labtest.forEach(item => {
      item.actualprice = item.price - (item.price * item.discount / 100);
    });
    this.loading = false;

    this.ItemCount = this.labService.cartcount;

    this.cartids = this.labService.getcartitemids();
    console.log(this.cartids);

    // this.MedCheckUpService;
  }

  // buttonName: boolean = false;
  // addServiceToCard(itemId: number) {
  //   const selectedItem = this.labtest.find(item => item.serviceItemID === itemId);
  //   if (selectedItem) {
  //     const slectid = selectedItem.serviceItemID;
  //     this.labService.addToCart(selectedItem);
  //     console.log(selectedItem);
  //     if (!this.buttonName) {
  //       this.buttonName = true;
  //       this.ItemCount++;
  //     } else {
  //       this.buttonName = false;
  //       this.ItemCount--;
  //     }
  //   }
  // }

  addedItems = new Set<number>();


  addServiceToCard(itemId: number) {
    const selectedItem = this.labtest.find(item => item.serviceItemID === itemId);
    if (selectedItem) {
      if (!this.addedItems.has(itemId)) {
        // Add to cart
        this.labService.addToCart(selectedItem);
        this.addedItems.add(itemId); // Mark as added
        this.ItemCount++;

      } else {
        // Remove from cart
        this.labService.removeItem(itemId); // Assuming you have a remove method
        this.addedItems.delete(itemId); // Mark as removed
        this.ItemCount--;
      }
    }
  }

  locations: string[] = [
    'Bowenpally Police Station',
    'Pension Lane',
    'Mohammed Nagar',
    'New Bowenpally',
  ];

  // MedCheckUpService = [
  //   {
  //     id: 1,
  //     MedService: 'Vitamin D (25-OH)',
  //     Reports: 'Report in 24-28 Hrs',
  //     Available: 'Home',
  //     Price: {
  //       Price: 1999,
  //       Discount: '45% OFF',
  //       FinalPrice: 1099,
  //     },
  //   },
  //   {
  //     id: 2,
  //     MedService: 'Vitamin B12-Serum',
  //     Reports: 'Report in 24-28 Hrs',
  //     Available: 'Home',
  //     Price: {
  //       Price: 1999,
  //       Discount: '18% OFF',
  //       FinalPrice: 1099,
  //     },
  //   },
  //   {
  //     id: 3,
  //     MedService: 'Lipid Profile',
  //     Reports: 'Report in 24-28 Hrs',
  //     Available: 'Home',
  //     Price: {
  //       Price: 1999,
  //       Discount: '50% OFF',
  //       FinalPrice: 1099,
  //     },
  //   },
  //   {
  //     id: 4,
  //     MedService: 'Vitamin B4 (25-OH)',
  //     Reports: 'Report in 24-28 Hrs',
  //     Available: 'Home',
  //     Price: {
  //       Price: 1999,
  //       Discount: '60% OFF',
  //       FinalPrice: 1099,
  //     },
  //   },
  // ];



  // addServiceToCard(cartItem:any){
  //   // this.ItemListInCart = this.labdashboardService.addToCart(this.MedCheckUpService.find(selectedItem=>selectedItem.id === cartItem));
  //   this.ItemCount++;
  //   console.log(this.ItemCount);
  //   console.log(this.ItemListInCart);
  // }

  loadServiceData(){
  }
}
