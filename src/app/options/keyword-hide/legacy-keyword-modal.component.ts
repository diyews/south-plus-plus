import { Component, OnInit } from '@angular/core';
import { ModalBaseComponent } from '../../shared/components/modal-base/modal-base.component';

@Component({
  selector: 'app-legacy-keyword-modal',
  template: `
    <textarea nz-input [(ngModel)]="inputText" (ngModelChange)="onChange()" cols="30" rows="5"></textarea>

    <h4 style="margin-top: 12px;">预览：</h4>
    <textarea nz-input [(ngModel)]="inputTextPreview" cols="30" rows="5"></textarea>

    <div *nzModalFooter>
      <button nz-button nzType="primary" (click)="confirm()">OK</button>
    </div>
  `,
  styles: [
  ]
})
export class LegacyKeywordModalComponent extends ModalBaseComponent {
  inputText = '';
  inputTextPreview = '';

  errorMessage = '';

  ngOnInit(): void {
    this.modalConfig = {
      nzWidth: 520,
      nzTitle: '旧版关键字导入',
    }
    super.ngOnInit();
  }

  onChange() {
    if (!this.inputText) {
      return this.inputTextPreview = '';
    }

    const matched = this.inputText.match(/'(.+?)'/g)
    if (!matched) {
      return this.inputTextPreview = '没有匹配到关键字，格式： \'xxx\', \'yyy\''
    }

    this.inputTextPreview = matched.map(o => o.slice(1, -1)).join(', ')
  }

  confirm() {
    this.nzModalRef.close(this.inputTextPreview);
  }
}
