import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LabdashboardServiceService {
  catDataList:any = [];
  labServiceList = new BehaviorSubject<any>([]);

  constructor() { }

  addToCart(SelectedlabService:any){
    this.catDataList.push(SelectedlabService);
    this.labServiceList.next(this.catDataList);
    return this.catDataList;
  }

  getLabServiceDetails(){
    //to get data from API 
  }
  
}
