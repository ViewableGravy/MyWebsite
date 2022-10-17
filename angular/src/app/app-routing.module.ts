import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GravylangComponent } from './components/gravylang/gravylang.component';
import { HomeComponent } from './components/home/home.component';
import { SkillTreeComponent } from './components/skill-tree/skill-tree.component';


const routes: Routes = [{ path: "Gravylang", component: GravylangComponent },
                        { path: "Skilltree", component: SkillTreeComponent },
                        { path: "**", component: HomeComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }