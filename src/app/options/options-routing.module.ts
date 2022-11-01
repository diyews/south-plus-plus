import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {OptionsComponent} from './options.component';
import { KeywordHideComponent } from './keyword-hide/keyword-hide.component';
import { ThreadMarkComponent } from './thread-mark/thread-mark.component';

const routes: Routes = [
  {
    path: ``,
    component: OptionsComponent,
    children: [
      {
        path: ``,
        redirectTo: 'keyword-hide',
        pathMatch: 'full',
      },
      { path: `keyword-hide`, component: KeywordHideComponent, },
      { path: `thread-mark`, component: ThreadMarkComponent, },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OptionsRoutingModule { }
