import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { ModalBaseComponent } from './components/modal-base/modal-base.component';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';


const modules = [
  FormsModule,
  ReactiveFormsModule,

  NzListModule,
  NzCardModule,
  NzTabsModule,
  NzSwitchModule,
  NzButtonModule,
  NzIconModule,
  NzMessageModule,
  NzInputNumberModule,
];

@NgModule({
  declarations: [
    ModalBaseComponent
  ],
  imports: [
    CommonModule,

    ...modules,
  ],
  exports: [
    ...modules,
  ],
})
export class SharedModule { }
