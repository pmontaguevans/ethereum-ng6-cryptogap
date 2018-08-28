import { NgModule } from '@angular/core';
import { Web3Service } from './web3/web3.service';
import { CgcService } from './cg-coin/cg-coin.service';
// import { CgCoinService } from './meta-coin/meta-coin.service';

@NgModule({
  imports: [],
  providers: [Web3Service, CgcService]
})
export class ServicesModule {}
