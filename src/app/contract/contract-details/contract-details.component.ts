import { Component, OnInit } from '@angular/core';
import { CgcService } from '../../services/cg-coin/cg-coin.service';

@Component({
  selector: 'app-contract-details',
  templateUrl: './contract-details.component.html',
  styleUrls: ['./contract-details.component.scss']
})
export class ContractDetailsComponent implements OnInit {
  constructor(private cgcService: CgcService) {}
  totalPrice: any;
  numTickets: any;
  ngOnInit() {}

  payEntranceFee() {
    this.cgcService.payEntranceFee().subscribe(
      () => {
        this.totalPrice = 0;
        this.numTickets = null;
        console.log('Transaction completed!');
      },
      e => console.log('Error sending coin; see log.')
    );
  }
}
