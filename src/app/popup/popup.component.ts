import { Component, OnInit } from '@angular/core';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.less']
})
export class PopupComponent implements OnInit {
  selectedIndex = 0;

  list = [
    { title: '移除Mark 及纯表情楼层', key: 'hideMark', value: true, },
    { title: '标记新帖', key: 'markNew', value: true, },
    { title: '帖子标题显示评论数', key: 'moveCommentView', value: true, },
  ]

  constructor(private storageService: StorageService,
              ) {
    this.storageService.getConfig()
      .then(config => {
        Object.keys(config)
          .forEach(key => {
            const hit = this.list.find(o => o.key === key);
            if (!hit) { return; }

            hit.value = config[key];
          })
      })
  }

  ngOnInit(): void {
  }

  onSwitchChanged(value: boolean, key: string) {
    this.storageService.setConfig({ [key]: value })
  }

  openOptionPage() {
    chrome.runtime.openOptionsPage()
  }
}

