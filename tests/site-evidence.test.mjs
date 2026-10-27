import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { summarizeWinterData } from '../research-data.mjs';

const basis = JSON.parse(await readFile(new URL('../assets/research-data/site-basis.json', import.meta.url), 'utf8'));

test('delivered raw weather reproduces every archived winter statistic', async () => {
  const load = async file => JSON.parse(await readFile(new URL('../assets/research-data/' + file, import.meta.url), 'utf8'));
  const actual = summarizeWinterData(await load('era5_daily.json'), await load('era5_land_snow.json'));
  assert.equal(actual.length, 10);
  actual.forEach((winter, index) => {
    for (const [key, value] of Object.entries(winter)) {
      const expected = basis.weather.winters[index][key];
      if (typeof value === 'number') assert.ok(Math.abs(value - expected) < 1e-8, winter.id + ' / ' + key);
      else assert.deepEqual(value, expected, winter.id + ' / ' + key);
    }
  });
});

test('site basis keeps the existing research anchor separate from the R04 concept placement', () => {
  assert.equal(basis.anchor.address, '内蒙古自治区呼伦贝尔市根河市森工路64号');
  assert.equal(basis.architecture.placementStatus, 'not confirmed');
  assert.equal(basis.anchor.amap.crs, 'GCJ-02');
  assert.equal(basis.anchor.wgs84Approx.method.includes('not surveyed'), true);
  assert.ok(basis.missing.includes('parcel or owner-approved buildable boundary and clearance'));
});

test('weather record includes ten complete winters and identifies its grid-data limits', () => {
  const weather = basis.weather;
  assert.equal(weather.winters.length, 10);
  assert.equal(weather.winters[0].id, '2016-2017');
  assert.equal(weather.winters.at(-1).id, '2025-2026');
  assert.equal(weather.classification, 'gridded reanalysis; not an observation at the station');
  assert.equal(weather.datasets.length, 2);
  assert.notDeepEqual(weather.datasets[0].gridPoint, weather.datasets[1].gridPoint);
});
