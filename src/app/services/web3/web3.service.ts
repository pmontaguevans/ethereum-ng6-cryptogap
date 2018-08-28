import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import * as contract from 'truffle-contract';
import { environment } from '../../../environments/environment';

declare let window: any;
declare let require: any;

const Web3 = require('web3');

const contract = require('truffle-contract');
const contract_artifacts = require('../../../../../build/contracts/CryptoPark.json');

@Injectable({
  providedIn: 'root'
})
export class Web3Service {
  web3: any;
  cryptogalactiCoin: any;
  constructor() {
    this.bootstrapWeb3();
    this.cryptogalactiCoin = contract(contract_artifacts);
    this.cryptogalactiCoin.setProvider(this.web3.currentProvider);
  }

  bootstrapWeb3() {
    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    if (typeof window.web3 !== 'undefined') {
      console.warn(
        "Using web3 detected from external source. If you find that your accounts don't appear or you have 0 MetaCoin, ensure you've configured that source properly. If using MetaMask, see the following link. Feel free to delete this warning. :) http://truffleframework.com/tutorials/truffle-and-metamask"
      );
      // Use Mist/MetaMask's provider
      this.web3 = new Web3(window.web3.currentProvider);
    } else {
      console.warn(
        `No web3 detected. Falling back to ${environment.webSocketProvider}. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask`
      );

      // Hack to provide backwards compatibility for Truffle, which uses web3js 0.20.x
      Web3.providers.HttpProvider.prototype.sendAsync =
        Web3.providers.HttpProvider.prototype.send;
      // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
      this.web3 = new Web3(
        new Web3.providers.WebsocketsProvider(environment.webSocketProvider)
      );
    }
  }

  getAccountDetails() {
    return new Promise((resolve, reject) => {
      this.web3.eth.getCoinbase((err, account) => {
        if (err === null) {
          this.web3.eth.getBalance(account, (error, balance) => {
            if (error === null) {
              return resolve({
                fromAccount: account,
                balance: this.web3.utils.fromWei(balance, 'ether')
              });
            } else {
              return reject(error);
            }
          });
        }
      });
    });
  }

  observeAccountChanges(): Observable<any> {
    return Observable.create(observer => {
      this.web3.currentProvider.publicConfigStore.on(
        'update',
        (selectedAddress, networkVersion) => {
          observer.next(selectedAddress.selectedAddress);
          observer.complete();
        }
      );
    });
  }

  getAccountBalance(account): Observable<any> {
    return Observable.create(observer => {
      this.cryptogalactiCoin
        .deployed()
        .then(instance => {
          //we use call here so the call doesn't try and write, making it free
          return instance.getBalance.call(account, {
            from: account
          });
        })
        .then(value => {
          observer.next(value.toString());
          observer.complete();
        })
        .catch(e => {
          observer.error(e);
        });
    });
  }
}
