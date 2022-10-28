import { Component, OnInit } from '@angular/core';

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
  ]

  config = null;

  constructor() {
    chrome.storage.local.get('config', items => {
      const config = items.config;
      this.config = config;
      Object.keys(config)
        .forEach(key => {
          const hit = this.list.find(o => o.key === key);
          hit.value = config[key];
        })
    });
  }

  ngOnInit(): void {
  }

  onSwitchChanged(value: boolean, key: string) {
    this.config[key] = value;

    chrome.storage.local.set({ config: this.config });
  }

  openOptionPage() {
    chrome.runtime.openOptionsPage()
  }
}

