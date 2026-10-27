const finite = values => values.filter(value => Number.isFinite(value));
const mean = values => {
  const valid = finite(values);
  return valid.length ? valid.reduce((sum, value) => sum + value, 0) / valid.length : null;
};
const sum = values => {
  const valid = finite(values);
  return valid.length ? valid.reduce((total, value) => total + value, 0) : null;
};
const max = values => {
  const valid = finite(values);
  return valid.length ? Math.max(...valid) : null;
};

export function summarizeWinterData(era5, era5Land) {
  const daily = era5.daily;
  const snowByDate = new Map(era5Land.daily.time.map((date, index) => [date, era5Land.daily.snow_depth_mean[index]]));
  const groups = new Map();
  for (let index = 0; index < daily.time.length; index++) {
    const date = daily.time[index];
    const month = Number(date.slice(5, 7));
    if (month > 3 && month < 10) continue;
    const startYear = month >= 10 ? Number(date.slice(0, 4)) : Number(date.slice(0, 4)) - 1;
    const id = `${startYear}-${startYear + 1}`;
    if (!groups.has(id)) groups.set(id, []);
    groups.get(id).push({
      date,
      minTemp: daily.temperature_2m_min[index],
      meanTemp: daily.temperature_2m_mean[index],
      snowfall: daily.snowfall_sum[index],
      gust: daily.wind_gusts_10m_max[index],
      windDirection: daily.wind_direction_10m_dominant[index],
      shortwave: daily.shortwave_radiation_sum[index],
      sunshine: daily.sunshine_duration[index],
      snowDepth: snowByDate.get(date)
    });
  }
  return [...groups.entries()].sort(([a], [b]) => a.localeCompare(b)).map(([id, days]) => {
    const mins = days.map(day => day.minTemp);
    const maxGust = max(days.map(day => day.gust));
    const peakDay = days.find(day => day.gust === maxGust);
    const directionBins = new Map();
    for (const day of days) {
      if (!Number.isFinite(day.windDirection)) continue;
      const bin = (Math.round(day.windDirection / 45) * 45) % 360;
      directionBins.set(bin, (directionBins.get(bin) ?? 0) + 1);
    }
    const commonDirection = [...directionBins.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] ?? null;
    return {
      id,
      days: days.length,
      meanDailyMeanTempC: mean(days.map(day => day.meanTemp)),
      coldestDailyMinimumC: minFinite(mins),
      coldestDay: days.find(day => day.minTemp === minFinite(mins))?.date ?? null,
      daysAtOrBelowMinus30C: finite(mins).filter(value => value <= -30).length,
      snowfallTotalCm: sum(days.map(day => day.snowfall)),
      maximumDailyGustKmh: maxGust,
      maximumDailyGustDate: peakDay?.date ?? null,
      maximumMeanSnowDepthM: max(days.map(day => day.snowDepth)),
      meanDailyShortwaveMJm2: mean(days.map(day => day.shortwave)),
      meanDailySunshineHours: (() => {
        const value = mean(days.map(day => day.sunshine));
        return value === null ? null : value / 3600;
      })(),
      mostFrequentDailyWindDirectionDegrees: commonDirection
    };
  });
}

function minFinite(values) {
  const valid = finite(values);
  return valid.length ? Math.min(...valid) : null;
}
