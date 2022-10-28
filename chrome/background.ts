const defaultConfig = {
  hideMark: true,
  markNew: true,
}

chrome.runtime.onInstalled.addListener(details => {
  switch (details.reason) {
    case 'install':
    case 'update':
      console.log(details.reason);
      chrome.storage.local.get('config', items => {
        console.log(items);
        const config = items.config || {};
        chrome.storage.local.set({
          config: { ...defaultConfig, ...config }
        });
      });
      break;
    default:
  }
});
