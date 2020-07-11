import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GravylangComponent } from './components/gravylang/gravylang.component';
import { HomeComponent } from './components/home/home.component';


const routes: Routes = [{ path: "Gravylang", component: GravylangComponent },
                        { path: "**", component: HomeComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }