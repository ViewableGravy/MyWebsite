import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GravylangComponent } from './components/gravylang/gravylang.component';
import { HomeComponent } from './components/home/home.component';
import { ServerHomeComponent } from './components/media-server/server.component';
import { SkillTreeComponent } from './components/skill-tree/skill-tree.component';


const routes: Routes = [{ path: "programming-language", component: GravylangComponent },
                        { path: "timeline", component: SkillTreeComponent },
                        { path: "media-server", component: ServerHomeComponent },
                        { path: "**", component: HomeComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
