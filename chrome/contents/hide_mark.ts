let keywords = [];

function hideMark() {
  document.querySelectorAll<HTMLDivElement>('.t5.t2')
    .forEach((floor, index) => {
      const el = floor.querySelector<HTMLDivElement>('.tpc_content .f14');
      if (!el) { return; }

      const innerText = el.innerText ? el.innerText.trim() : '';
      addAddKeywordDropdownMenu(floor, innerText);

      if (innerText) {
        // 这里可以自己添加文字屏蔽
        const words = keywords;
        if (words.indexOf(innerText.toLocaleLowerCase()) !== -1) {
          floor.style.display = 'none'
        }
      } else {
        const checkShouldHide = () => {
          /* 检查主楼没有文字，但是有附件 */
          if (index === 0) {
            const previous = el.previousElementSibling;
            if (previous && previous.id && previous.id.indexOf('att_') === 0) {
              return false;
            }
          }

          /* 检查纯表情 */
          let faceCount = 0;
          const imgList = el.querySelectorAll('img');
          if (!imgList.length) { return false; }
          imgList.forEach(img => {
            if (img.src && img.src.indexOf('smile/smallface') !== -1) {
              faceCount++;
            }
          });

          if (faceCount !== imgList.length) { return false; }
          return true;
        };

        if (checkShouldHide()) {
          floor.style.display = 'none';
        }

        return;
        // const btn = document.createElement('div');
        // btn.style.cssText = 'text-align: center;color: #aaa;cursor: pointer;'
        // btn.innerHTML = '展开';
        // btn.onclick = () => {
        //     table.style.display = 'table';
        //     btn.remove();
        // };
        // floor.appendChild(btn);
        // table.style.display = 'none'
      }
    });
}

function addAddKeywordDropdownMenu(floor: HTMLDivElement, keyword: string) {
  const dropdown = floor.querySelector('.fr .dropdown-content');
  if (!dropdown || !keyword) { return; }

  /* 已经添加过 */
  if (dropdown.querySelector('.hide-mark')) { return; }

  const aMenu = document.createElement('a') as HTMLAnchorElement;
  aMenu.href = 'javascript:void(0)'
  aMenu.classList.add('hide-mark')
  aMenu.innerText = `屏蔽内容`
  aMenu.title = keyword;
  aMenu.onclick = () => {
    chrome.storage.sync.get('hideMarkKeywords', items => {
      const hideMarkKeywords: string[] = items.hideMarkKeywords;
      hideMarkKeywords.push(keyword)
      chrome.storage.sync.set({ hideMarkKeywords }, () => {
        aMenu.innerText = '已添加'
      })
    })
  }

  dropdown.appendChild(aMenu)
}

chrome.storage.sync.get(['config', 'hideMarkKeywords'], items => {
  if (items.config.hideMark !== false) {
    keywords = items.hideMarkKeywords;
    hideMark();

    const observer = new MutationObserver(function (mutationList, observer) {
      hideMark();
    });
    observer.observe(document.querySelector('#main'), { childList: true, });
  }
});
