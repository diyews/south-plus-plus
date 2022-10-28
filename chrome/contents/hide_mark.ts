function hideMark() {
  document.querySelectorAll<HTMLElement>('.tpc_content .f14')
    .forEach((el, index) => {
      const floor = el.closest<HTMLElement>('.t5');
      if (!floor) { return; }

      const table = floor.querySelector('table')
      const innerText = el.innerText ? el.innerText.trim() : '';

      if (innerText) {
        // 这里可以自己添加文字屏蔽
        const words = ['mark', 'makr', 'mk', 'make', '马克', '马可', '马克吐温', '码住', '马', '马住', '插眼', '顶'];
        if (words.indexOf(innerText.toLocaleLowerCase()) !== -1) {
          floor.style.display = 'none'
        }
      } else {
        const checkShouldHide = () => {
          if (index === 0) {
            const previous = el.previousElementSibling;
            if (previous && previous.id && previous.id.indexOf('att_') === 0) {
              return false;
            }
          }

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

chrome.storage.local.get('config', items => {
  if (items.config.hideMark !== false) {
    hideMark();

    const observer = new MutationObserver(function (mutationList, observer) {
      hideMark();
    });
    observer.observe(document.querySelector('#main'), { childList: true, });
  }
});
