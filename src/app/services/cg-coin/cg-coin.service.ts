import { Injectable } from '@angular/core';
import { Web3Service } from '../../services/web3/web3.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CgcService {
  contractAddress: string;
  caller: any;
  numTickets: any;
  totalCost: any;

  constructor(private web3Service: Web3Service) {
    this.web3Service.web3.eth.defaultAccount = this.web3Service.web3.eth.coinbase;
    this.caller = this.web3Service.web3.eth.defaultAccount;
  }

  getContractAddress(): Promise<any> {
    return this.web3Service.cryptogalactiCoin.deployed().then(instance => {
      return new Promise((resolve, reject) => {
        instance.getContractAddress
          .call()
          .then(contractAddress => {
            this.contractAddress = contractAddress;
            if (contractAddress !== '') {
              console.log('contract address found! ', contractAddress);
              return resolve(contractAddress);
            }
          })
          .catch(e => {
            return reject(e);
          });
      });
    });
  }

  getEntranceFee(): Promise<any> {
    return this.web3Service.cryptogalactiCoin.deployed().then(instance => {
      return new Promise((resolve, reject) => {
        instance.getEntranceFee
          .call()
          .then(entranceFee => {
            if (entranceFee !== 0) {
              return resolve(entranceFee);
            }
          })
          .catch(e => {
            return reject(e);
          });
      });
    });
  }

  getTotalEntranceFee(numTickets: any): Promise<any> {
    return this.web3Service.cryptogalactiCoin.deployed().then(instance => {
      return new Promise((resolve, reject) => {
        this.numTickets = numTickets;
        instance.calculateTotalEntranceFee
          .call(numTickets)
          .then(total => {
            this.totalCost = total;
            return resolve(total);
          })
          .catch(e => reject(e));
      });
    });
  }

  payEntranceFee(): Observable<any> {
    return Observable.create(observer => {
      this.web3Service.getAccountDetails().then((res: any) => {
        return this.web3Service.cryptogalactiCoin.deployed().then(instance => {
          return instance
            .payEntranceFee(this.numTickets, {
              from: res.fromAccount,
              value: this.web3Service.web3.utils.toWei(
                this.totalCost.toString(),
                'ether'
              )
            })
            .then(val => {
              console.log('val', val);
              observer.next(val);
              observer.complete();
            });
        });
      });
    });
  }
}
