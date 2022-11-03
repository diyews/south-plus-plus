import { Component, NgZone, OnInit } from '@angular/core';
import { StorageService } from '../../services/storage.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { LegacyKeywordModalComponent } from './legacy-keyword-modal.component';

@Component({
  selector: 'app-keyword-hide',
  templateUrl: './keyword-hide.component.html',
  styleUrls: ['./keyword-hide.component.less']
})
export class KeywordHideComponent implements OnInit {
  inputText = '';
  contextAdd = false;
  keywords = [];

  constructor(private ngZone: NgZone,
              private storageService: StorageService,
              private nzMessageService: NzMessageService,
              private nzModalService: NzModalService,
              ) {
    chrome.storage.sync.get('hideMarkKeywords', items => {
      this.ngZone.run(() => {
        this.keywords = items.hideMarkKeywords;
      })
    })
  }

  ngOnInit(): void {
  }

  removeKeyword($event, index) {
    this.keywords.splice(index, 1);
    this.update();
  }

  import() {
    this.nzModalService.create({
      nzContent: LegacyKeywordModalComponent,
    })
      .afterClose
      .subscribe(text => {
        if (text) {
          this.inputText = text
          this.onAdd();
        }
      })
  }

  onAdd(e?: KeyboardEvent) {
    e?.preventDefault();

    if (!this.inputText) { return; }

    const inputKeywords =
      this.inputText.split(',')
        .map(o => o.trim())
        .filter(o => o);
    const newKeywords = Array.from(new Set([ ...this.keywords, ...inputKeywords ]));

    this.update(newKeywords)
      .then(() => {
        this.inputText = ''
      })
  }

  update(newKeywords: string[] = this.keywords) {
    return new Promise(resolve => {
      chrome.storage.sync.set({ hideMarkKeywords: newKeywords}, () => {
        this.keywords = newKeywords;
        resolve(true);
      })
    })
  }
}
