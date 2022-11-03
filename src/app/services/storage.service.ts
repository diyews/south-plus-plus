import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  getConfig(): Promise<any> {
    return new Promise(resolve => {
      chrome.storage.sync.get('config', items => {
        resolve(items.config);
      });
    });
  }

  setConfig(value): Promise<any> {
    return new Promise(async resolve => {
      const config = await this.getConfig();
      chrome.storage.sync.set({ config: { ...config, ...value } }, () => resolve(true));
    })
  }
}
