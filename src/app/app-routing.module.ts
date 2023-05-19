import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {CardListComponent} from "./components/card-list/card-list.component";
import {CONTENT} from "./constants/content";

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: CONTENT, component: CardListComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
