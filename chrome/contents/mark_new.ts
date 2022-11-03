function newTd() {
  const widthTd = document.querySelector<HTMLElement>('.tr2 .tac.y-style');
  if (!widthTd) { return; }
  widthTd.style.width = '100px';
}

function appendCommentAndView(tr) {
  const ctd = tr?.querySelector('.tal.y-style.f10');
  const titleA = tr?.querySelector('td h3 a');
  if (!ctd || !titleA) { return; }

  const span = document.createElement('span');
  span.classList.add('darkreader', 'user-generated');
  span.innerHTML = `&nbsp;【${ctd.innerHTML}】`;

  (function (s8) {
    const count = +s8?.innerText || 0;
    if (count < config.moveCommentViewCount1) return;

    if (count < config.moveCommentViewCount2) {
      s8.style.color = '#00c000';
    }

    if (count >= config.moveCommentViewCount2) {
      s8.style.color = '#c00000';
    }
  })(span.querySelector('.s8'));

  titleA.appendChild(span);
}

function processListForMarkNew() {
  const trList = document.querySelectorAll('tr.t_one');

  trList.forEach(tr => {
    const date = tr.querySelector<HTMLElement>('.f10.gray2')?.innerText;
    if (!date) { return; }
    const isToday = isSameDate(new Date(date), new Date());
    const isYesterday = isSameDate(new Date(date), new Date(Date.now() - 24 * 60 * 60 * 1e3));

    let img = tr.querySelector<HTMLImageElement>('[title="新帖标志"]');
    let firstTd;
    if (img) {
      firstTd = img.closest('td').previousElementSibling;
      //previewTd.innerHTML = '<div class="new-wrapper" style="text-align: left;"><div style="width: 23px;display: flex; flex-direction: column;align-items: center;">' + previewTd.innerHTML + '</div></div>';
    } else {
      firstTd = tr.querySelector('td');

      img = document.createElement('img');
      img.src = 'images/colorImagination/file/new.gif';
      img.align = 'absmiddle'
      img.title = '_新帖标志';
    }
    firstTd.appendChild(img);

    if (isToday) { return; }
    if (isYesterday) {
      img.style.filter = 'grayscale(1)';
    } else {
      img?.remove();
    }
  });
}

function processListForMoveCommentView() {
  const trList = document.querySelectorAll('tr.t_one');

  trList.forEach(tr => {
    appendCommentAndView(tr);
  });

}

function isSameDate(a, pDate) {
  return (
    a.getFullYear() === pDate.getFullYear() &&
    a.getMonth() === pDate.getMonth() &&
    a.getDate() === pDate.getDate()
  );
}

let config;

chrome.storage.local.get('config', items => {
  config = items.config;
  if (config.markNew !== false) {
    processListForMarkNew();
  }

  if (config.moveCommentView !== false) {
    processListForMoveCommentView();
  }
})
