const defaultConfig = {
  hideMark: true,
  markNew: true,
  moveCommentView: true,
  moveCommentViewCount1: 10, // 评论数高亮第一个阈值
  moveCommentViewCount2: 30, // 评论数高亮第二个阈值
}
const hideMarkKeywordsDefault = ['mark', 'makr', 'mk', 'make', '马克', '马可', '马克吐温', '码住', '马', '马住', '插眼', '顶'];

const defaultConfigLocal = {
  markRead: true,
  markReadList: [],
}

chrome.runtime.onInstalled.addListener(details => {
  switch (details.reason) {
    case 'install':
    case 'update':
      chrome.storage.sync.get(['config', 'hideMarkKeywords'], items => {
        const config = items.config || {};
        /* 基本配置 */
        const data: { config: any; hideMarkKeywords?: string[]; } = {
          config: { ...defaultConfig, ...config },
        };
        /* 关键字配置 */
        if (!items.hideMarkKeywords) {
          data.hideMarkKeywords = hideMarkKeywordsDefault;
        }
        chrome.storage.sync.set(data);
      });

      chrome.storage.local.get(['configLocal'], items => {
        const configLocal = items.configLocal || {};
        const data: { configLocal: any } = {
          configLocal: { ...defaultConfigLocal, ...configLocal },
        };

        chrome.storage.local.set(data);
      });
      break;
    default:
  }
});
