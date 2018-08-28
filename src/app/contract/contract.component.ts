import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { canBeNumber } from '../util/validation';
import { CgcService } from '../services/cg-coin/cg-coin.service';

@Component({
  selector: 'app-contract',
  templateUrl: './contract.component.html',
  styleUrls: ['./contract.component.css']
})
export class ContractComponent implements OnInit {
  canBeNumber = canBeNumber;
  contractAddress: string;
  entranceFee: number;
  numTickets: number;
  totalPrice: number;

  @Output() talk: EventEmitter<boolean> = new EventEmitter<boolean>();
  success: boolean;
  constructor(private cgcService: CgcService, private router: Router) {
    this.getContractAddress();
    this.getEntranceFee();
    this.success = false;
  }

  ngOnInit() {}

  getContractAddress() {
    this.cgcService.getContractAddress().then(res => {
      this.contractAddress = res;
    });
  }

  getEntranceFee() {
    this.cgcService.getEntranceFee().then(value => {
      this.entranceFee = value;
    });
  }

  calculateTotalEntrancePrice(numTickets: number) {
    this.cgcService.getTotalEntranceFee(numTickets).then(total => {
      this.totalPrice = total.c;
    });
  }

  payEntranceFee() {
    this.cgcService.payEntranceFee().subscribe(
      () => {
        this.success = true;
        this.totalPrice = 0;
        this.numTickets = null;
        this.talkBack(this.success);
        console.log('Open up modal or show the park');
        console.log('Transaction completed!');
      },
      e => console.log('Error sending coin; see log.')
    );
  }

  talkBack(say: boolean) {
    this.talk.emit(say);
  }
}
