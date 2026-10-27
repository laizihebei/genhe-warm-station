const basis = await fetch('assets/research-data/site-basis.json').then(response => {
  if (!response.ok) throw new Error(`研究数据读取失败：${response.status}`);
  return response.json();
});
const { weather } = basis;
const fmt = (value, digits = 1) => Number.isFinite(value) ? value.toFixed(digits) : '无数据';
document.querySelector('#wgs-coordinate').textContent = `${basis.anchor.wgs84Approx.longitude.toFixed(6)}°E / ${basis.anchor.wgs84Approx.latitude.toFixed(6)}°N · 近似转换`;
const mapZoom = 15;
const tileCount = 2 ** mapZoom;
const longitude = basis.anchor.wgs84Approx.longitude;
const latitude = basis.anchor.wgs84Approx.latitude;
const centerX = (longitude + 180) / 360 * tileCount;
const latitudeRad = latitude * Math.PI / 180;
const centerY = (1 - Math.asinh(Math.tan(latitudeRad)) / Math.PI) / 2 * tileCount;
const tileX = Math.floor(centerX), tileY = Math.floor(centerY);
const map = document.querySelector('#site-map');
const tileLayer = document.createElement('div');
tileLayer.className = 'map-tiles';
tileLayer.style.left = `calc(50% - ${(centerX - tileX + 2) * 256}px)`;
tileLayer.style.top = `calc(50% - ${(centerY - tileY + 1) * 256}px)`;
for (let y = tileY - 1; y <= tileY + 1; y++) for (let x = tileX - 2; x <= tileX + 2; x++) {
  const tile = document.createElement('img');
  tile.alt = '';
  tile.loading = 'eager';
  tile.decoding = 'async';
  tile.src = `https://tile.openstreetmap.org/${mapZoom}/${x}/${y}.png`;
  tileLayer.append(tile);
}
const marker = Object.assign(document.createElement('span'), { className: 'map-marker', 'aria-hidden': 'true' });
const mapStamp = document.createElement('div');
mapStamp.className = 'map-stamp';
mapStamp.innerHTML = '<span>WGS‑84 近似转换点</span><b>现状驿站研究锚点</b>';
map.append(tileLayer, marker, mapStamp);
document.querySelector('#winter-chart').replaceChildren(...weather.winters.map(winter => {
  const column = document.createElement('div');
  column.className = 'winter-column';
  column.title = `${winter.id} · 最低日温 ${winter.coldestDailyMinimumC}°C · ERA5`;
  const bar = document.createElement('div');
  bar.className = 'winter-bar';
  bar.style.height = `${Math.max(8, Math.abs(winter.coldestDailyMinimumC) / 50 * 100)}%`;
  bar.dataset.value = `${winter.coldestDailyMinimumC}°`;
  const label = document.createElement('span');
  label.className = 'winter-year';
  label.textContent = winter.id.slice(2, 4) + '–' + winter.id.slice(7, 9);
  column.append(bar, label);
  return column;
}));
const winters = weather.winters;
const coldest = winters.reduce((a, b) => a.coldestDailyMinimumC < b.coldestDailyMinimumC ? a : b);
const deepest = winters.reduce((a, b) => (a.maximumMeanSnowDepthM ?? -1) > (b.maximumMeanSnowDepthM ?? -1) ? a : b);
const maxGust = winters.reduce((a, b) => a.maximumDailyGustKmh > b.maximumDailyGustKmh ? a : b);
const avgMeanTemp = winters.reduce((sum, item) => sum + item.meanDailyMeanTempC, 0) / winters.length;
const metrics = [
  { value: `${fmt(coldest.coldestDailyMinimumC)}°C`, label: `ERA5 最低日温 · ${coldest.coldestDay}` },
  { value: `${fmt(deepest.maximumMeanSnowDepthM * 100)} cm`, label: `ERA5‑Land 日均雪深峰值 · ${deepest.id}` },
  { value: `${fmt(maxGust.maximumDailyGustKmh)} km/h`, label: `ERA5 最大日阵风 · ${maxGust.maximumDailyGustDate}` },
  { value: `${fmt(avgMeanTemp)}°C`, label: '十冬季日平均气温均值 · ERA5' }
];
document.querySelector('#climate-metrics').replaceChildren(...metrics.map(metric => {
  const card = document.createElement('div'); card.className = 'climate-metric';
  const value = document.createElement('strong'); value.textContent = metric.value;
  const label = document.createElement('span'); label.textContent = metric.label;
  const type = document.createElement('small'); type.textContent = 'HISTORICAL GRID DATA';
  card.append(label, value, type); return card;
}));
document.querySelector('#grid-note').textContent = weather.datasets.map(item => `${item.model} ${item.resolution}（格点 ${item.gridPoint.longitude}°E / ${item.gridPoint.latitude}°N）`).join('；');
