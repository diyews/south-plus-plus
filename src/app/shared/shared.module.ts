import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';


const modules = [
  FormsModule,

  NzListModule,
  NzCardModule,
  NzTabsModule,
  NzSwitchModule,
  NzButtonModule,
  NzIconModule,
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,

    ...modules,
  ],
  exports: [
    ...modules,
  ],
})
export class SharedModule { }
