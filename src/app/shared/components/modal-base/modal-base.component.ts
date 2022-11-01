import { Component, NgZone, OnInit } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { ModalOptions } from 'ng-zorro-antd/modal/modal-types';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  template: ``,
})
export class ModalBaseComponent implements OnInit {
  modalConfig: ModalOptions;

  constructor(protected nzModalRef: NzModalRef,
              protected nzMessageService: NzMessageService,
              protected ngZone: NgZone,
  ) {
  }

  ngOnInit(): void {
    if (this.modalConfig) {
      setTimeout(() => {
        this.nzModalRef.updateConfig(this.modalConfig);
      })
    }
  }

  cancel() {
    this.nzModalRef.close();
  }
}
