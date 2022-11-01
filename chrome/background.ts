const defaultConfig = {
  hideMark: true,
  markNew: true,
  hideMarkKeywords: ['mark', 'makr', 'mk', 'make', '马克', '马可', '马克吐温', '码住', '马', '马住', '插眼', '顶'],
}

chrome.runtime.onInstalled.addListener(details => {
  switch (details.reason) {
    case 'install':
    case 'update':
      chrome.storage.local.get('config', items => {
        const config = items.config || {};
        chrome.storage.local.set({
          config: { ...defaultConfig, ...config }
        });
      });
      break;
    default:
  }
});
