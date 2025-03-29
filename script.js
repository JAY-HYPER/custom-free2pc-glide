let selectedMain = '블랙';
let selectedSub = '블랙';
let selectedSide = '블랙';

function updateSelectedText() {
  const target = document.getElementById('selected-color-text');
  target.textContent = `메인: ${selectedMain} / 어깨: ${selectedSub} / 사이바: ${selectedSide}`;
}

function changeMainColor(code) {
  document.getElementById('main-layer').src = `assets/main-${code}.png`;
  const nameMap = { blk: '블랙', chr: '차콜', slv: '실버', blu: '블루', red: '레드', gld: '골드' };
  selectedMain = nameMap[code] || code;
  updateSelectedText();
}

function changeSubColor(code) {
  document.getElementById('sub-layer').src = `assets/arm-${code}.png`;
  const nameMap = { blk: '블랙', chr: '차콜', slv: '실버', blu: '블루', red: '레드', gld: '골드' };
  selectedSub = nameMap[code] || code;
  updateSelectedText();
}

function changeSideColor(code) {
  document.getElementById('logo-layer').src = `assets/side-${code}.png`;
  const nameMap = { blk: '블랙', chr: '차콜', slv: '실버', blu: '블루', red: '레드', gld: '골드' };
  selectedSide = nameMap[code] || code;
  updateSelectedText();
}

function downloadCompositeImage() {
  const main = document.getElementById('main-layer');
  const sub = document.getElementById('sub-layer');
  const logo = document.getElementById('logo-layer');
  const text = document.getElementById('selected-color-text').textContent;

  const canvas = document.createElement('canvas');
  const width = main.naturalWidth;
  const height = main.naturalHeight + 60; // 텍스트 공간 추가
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext('2d');
  ctx.drawImage(main, 0, 0);
  if (sub.src) ctx.drawImage(sub, 0, 0);
  if (logo.src) ctx.drawImage(logo, 0, 0);

  // 텍스트 스타일
  ctx.fillStyle = '#111';
  ctx.font = '20px Pretendard, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(text, width / 2, height - 20);

  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');
  const formattedDate = `${yyyy}-${mm}-${dd}`;

  const link = document.createElement('a');
  link.download = `color-simulator-${formattedDate}.png`;
  link.href = canvas.toDataURL('image/png');
  link.click();
}
