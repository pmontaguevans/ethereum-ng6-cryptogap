import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ContractComponent } from '../contract/contract.component';
import { ContractDetailsComponent } from './contract-details/contract-details.component';
import { ContractEntranceComponent } from './contract-entrance/contract-entrance.component';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [
    ContractComponent,
    ContractDetailsComponent,
    ContractEntranceComponent
    // ContractDetailsComponent,
    // EntranceFeeComponent
  ],
  exports: [ContractComponent]
})
export class ContractModule {}
