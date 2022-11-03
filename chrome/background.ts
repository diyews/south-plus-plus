const defaultConfig = {
  hideMark: true,
  markNew: true,
  moveCommentView: true,
  moveCommentViewCount1: 10, // 评论数高亮第一个阈值
  moveCommentViewCount2: 30, // 评论数高亮第二个阈值
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
