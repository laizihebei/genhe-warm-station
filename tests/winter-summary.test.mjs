import test from 'node:test';
import assert from 'node:assert/strict';
import { summarizeWinterData } from '../research-data.mjs';

test('winter summaries group October through March under the winter start year', () => {
  const era5 = { daily: {
    time: ['2024-09-30', '2024-10-01', '2025-01-01', '2025-04-01'],
    temperature_2m_min: [1, -12, -30, 4], temperature_2m_mean: [3, -8, -24, 6],
    snowfall_sum: [0, 2, 1, 0], wind_gusts_10m_max: [5, 22, 35, 6], wind_direction_10m_dominant: [0, 45, 45, 90],
    shortwave_radiation_sum: [2, 3, 4, 5], sunshine_duration: [3600, 7200, 10800, 0]
  } };
  const era5Land = { daily: {
    time: ['2024-10-01', '2025-01-01'], snow_depth_mean: [.05, .2]
  } };
  const [winter] = summarizeWinterData(era5, era5Land);
  assert.equal(winter.id, '2024-2025');
  assert.equal(winter.days, 2);
  assert.equal(winter.coldestDailyMinimumC, -30);
  assert.equal(winter.daysAtOrBelowMinus30C, 1);
  assert.equal(winter.snowfallTotalCm, 3);
  assert.equal(winter.maximumDailyGustKmh, 35);
  assert.equal(winter.maximumMeanSnowDepthM, .2);
});

test('missing snow-depth days do not erase valid weather data or produce a false zero', () => {
  const era5 = { daily: {
    time: ['2024-10-01'], temperature_2m_min: [-10], temperature_2m_mean: [-5],
    snowfall_sum: [null], wind_gusts_10m_max: [null], wind_direction_10m_dominant: [null], shortwave_radiation_sum: [null], sunshine_duration: [null]
  } };
  const summary = summarizeWinterData(era5, { daily: { time: [], snow_depth_mean: [] } });
  assert.equal(summary[0].snowfallTotalCm, null);
  assert.equal(summary[0].maximumMeanSnowDepthM, null);
  assert.equal(summary[0].maximumDailyGustKmh, null);
});
