import { Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Web3Service } from './services/web3/web3.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'client';
  accountDetails: any;
  success: boolean;

  constructor(
    private _ngZone: NgZone,
    private web3Service: Web3Service,
    private router: Router
  ) {
    this.accountDetails = { account: '', balance: '' };
    this.success = false;

    this._ngZone.run(() => this.getAccountDetails());
  }

  // gets address and balance
  getAccountDetails() {
    this.web3Service.getAccountDetails().then((res: any) => {
      this.accountDetails.account = res.fromAccount;
      this.accountDetails.balance = res.balance;
    });
    this.observeAccountChanges();
  }

  // Observing account changes from service
  observeAccountChanges() {
    setInterval(() => {
      this.web3Service.observeAccountChanges().subscribe(
        (newAccount: any) => {
          if (this.accountDetails.account !== newAccount) {
            console.log('new account differentiates from current account');
            this.accountDetails.account = newAccount;
            this.getAccountBalance(newAccount);
          }
        },
        e => {
          console.log('Error getting balance; see log.');
        }
      );
    }, 100);
  }

  getAccountBalance(account) {
    this.getAccountDetails();
    this.web3Service.getAccountBalance(account).subscribe(value => {
      this.accountDetails.balance = value;
    });
  }

  // this function makes sure the balance gets updated after transaction made
  talkBack(value: boolean) {
    this.success = value;
    if (value) {
      console.log('child here with value for parent', value);
      this.router.navigate(['/crypto-park']);
      setInterval(() => this.getAccountDetails(), 600);
    }
  }
}
