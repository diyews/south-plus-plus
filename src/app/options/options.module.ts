import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OptionsRoutingModule } from './options-routing.module';
import { OptionsComponent } from './options.component';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { SharedModule } from '../shared/shared.module';
import { KeywordHideComponent } from './keyword-hide/keyword-hide.component';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzInputModule } from 'ng-zorro-antd/input';
import { LegacyKeywordModalComponent } from './keyword-hide/legacy-keyword-modal.component';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { ThreadMarkComponent } from './thread-mark/thread-mark.component';
import { NzFormModule } from 'ng-zorro-antd/form';


@NgModule({
  declarations: [
    OptionsComponent,
    KeywordHideComponent,
    LegacyKeywordModalComponent,
    ThreadMarkComponent
  ],
  imports: [
    CommonModule,
    OptionsRoutingModule,

    SharedModule,

    NzAlertModule,
    NzMenuModule,
    NzCollapseModule,
    NzGridModule,
    NzTagModule,
    NzInputModule,
    NzModalModule,
    NzFormModule,
  ]
})
export class OptionsModule { }
