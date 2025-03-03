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
  cartitemids: any = {};

  addToCart(item: any) {
    const cartid = new Date().getTime();
    const newItem = { ...item, cartId: cartid };
    this.cartItems.push(newItem);
    this.cartitemids[cartid] = true;
  }

  getcartitemids() {
    return this.cartitemids;
  }

  getCartItems() {
    this.cartcount = this.cartItems.length;
    return this.cartItems;
  }

  // removeItem(index: number) {
  //   this.cartItems.splice(index, 1); // Remove item at given index
  // }

  removeItem(itemId: number) {
    this.cartItems = this.cartItems.filter(item => item.serviceItemID !== itemId);
    delete this.cartitemids[itemId];
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
          "description": "A blood test is a lab analysis of things that may be found in your blood. You may have blood tests to keep track of how well you are managing a condition, such as diabetes or high cholesterol. You may also have them for routine checkups or when you are ill. Blood tests are very common.",
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
          "description": "A blood test is a lab analysis of things that may be found in your blood. You may have blood tests to keep track of how well you are managing a condition, such as diabetes or high cholesterol. You may also have them for routine checkups or when you are ill. Blood tests are very common.",
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
          "description": "A blood test is a lab analysis of things that may be found in your blood. You may have blood tests to keep track of how well you are managing a condition, such as diabetes or high cholesterol. You may also have them for routine checkups or when you are ill. Blood tests are very common.",
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
          "description": "A blood test is a lab analysis of things that may be found in your blood. You may have blood tests to keep track of how well you are managing a condition, such as diabetes or high cholesterol. You may also have them for routine checkups or when you are ill. Blood tests are very common.",
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
          "description": "A blood test is a lab analysis of things that may be found in your blood. You may have blood tests to keep track of how well you are managing a condition, such as diabetes or high cholesterol. You may also have them for routine checkups or when you are ill. Blood tests are very common.",
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
          "description": "A blood test is a lab analysis of things that may be found in your blood. You may have blood tests to keep track of how well you are managing a condition, such as diabetes or high cholesterol. You may also have them for routine checkups or when you are ill. Blood tests are very common.",
          "patientTypeID": 1,
          "hospitalID": 387,
          "branchID": 317
        }
      ]
    };
    return serviceData;
  }

}

