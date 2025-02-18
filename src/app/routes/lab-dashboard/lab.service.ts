import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LabService {

  constructor() { }

  cartcount: number = 0;

  private cartItems: any[] = [];

  addToCart(item: any) {
    const newItem = { ...item, cartId: new Date().getTime() };
    this.cartItems.push(newItem);
  }

  getCartItems() {
    this.cartcount = this.cartItems.length;
    return this.cartItems;
  }

  removeItem(index: number) {
    this.cartItems.splice(index, 1); // Remove item at given index
  }












  ////========================================================================================////

  getlabtestDetails(): any {
    const serviceData = {
      "status code": 200,
      "message": "Data Retrieved Successfully.",
      "data": [
        {
          "serviceItemID": 130,
          "serviceItemName": "Complete Blood Picture (CBP)",
          "code": "CBP001",
          "effectiveDate": "2024-11-21T00:00:00",
          "price": 1000.00,
          "discount": 1.00,
          "serviceId": 13,
          "servicecode": "inv",
          "serviceName": "Investigations",
          "patientTypeID": 1,
          "hospitalID": 387,
          "branchID": 317
        },
        {
          "serviceItemID": 131,
          "serviceItemName": "Himo_globin Test",
          "code": "CBP002",
          "effectiveDate": "2024-11-21T00:00:00",
          "price": 2000.00,
          "discount": 10.00,
          "serviceId": 13,
          "servicecode": "inv",
          "serviceName": "Investigations",
          "patientTypeID": 1,
          "hospitalID": 387,
          "branchID": 317
        },
        {
          "serviceItemID": 132,
          "serviceItemName": "Himo_globin Test",
          "code": "CBP002",
          "effectiveDate": "2024-11-21T00:00:00",
          "price": 2000.00,
          "discount": 10.00,
          "serviceId": 13,
          "servicecode": "inv",
          "serviceName": "Investigations",
          "patientTypeID": 1,
          "hospitalID": 387,
          "branchID": 317
        },
        {
          "serviceItemID": 133,
          "serviceItemName": "Himo_globin Test",
          "code": "CBP002",
          "effectiveDate": "2024-11-21T00:00:00",
          "price": 2000.00,
          "discount": 10.00,
          "serviceId": 13,
          "servicecode": "inv",
          "serviceName": "Investigations",
          "patientTypeID": 1,
          "hospitalID": 387,
          "branchID": 317
        },
        {
          "serviceItemID": 134,
          "serviceItemName": "Himo_globin Test",
          "code": "CBP002",
          "effectiveDate": "2024-11-21T00:00:00",
          "price": 2000.00,
          "discount": 10.00,
          "serviceId": 13,
          "servicecode": "inv",
          "serviceName": "Investigations",
          "patientTypeID": 1,
          "hospitalID": 387,
          "branchID": 317
        },
        {
          "serviceItemID": 135,
          "serviceItemName": "Himo_globin Test",
          "code": "CBP002",
          "effectiveDate": "2024-11-21T00:00:00",
          "price": 2000.00,
          "discount": 10.00,
          "serviceId": 13,
          "servicecode": "inv",
          "serviceName": "Investigations",
          "patientTypeID": 1,
          "hospitalID": 387,
          "branchID": 317
        }
      ]
    };
    return serviceData;
  }

}

