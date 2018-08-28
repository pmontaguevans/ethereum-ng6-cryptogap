import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { ServicesModule } from './services/services.module';
import { ContractModule } from './contract/contract.module';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, ContractModule, ServicesModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
