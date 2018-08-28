import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContractComponent } from './contract/contract.component';
import { ContractDetailsComponent } from './contract/contract-details/contract-details.component';

// import { DashboardComponent } from './dashboard/dashboard.component';
// import { HeroesComponent } from './heroes/heroes.component';
// import { HeroDetailComponent } from './hero-detail/hero-detail.component';

const routes: Routes = [
  //   { path: '', redirectTo: '/park-entrance', pathMatch: 'full' },
  //   { path: 'park-entrance', component: ContractComponent },
  { path: 'crypto-park', component: ContractDetailsComponent }
  //   { path: 'detail/:id', component: HeroDetailComponent },
  //   { path: 'heroes', component: HeroesComponent }]
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
