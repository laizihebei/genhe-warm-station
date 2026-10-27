const button=document.querySelector('#load-historical-cold');
try{
 const basis=await fetch('assets/research-data/site-basis.json').then(r=>{if(!r.ok)throw new Error(r.status);return r.json()});
 const coldest=basis.weather.winters.reduce((a,b)=>a.coldestDailyMinimumC<b.coldestDailyMinimumC?a:b);
 document.querySelector('#historical-min').textContent=coldest.coldestDailyMinimumC+'°C · '+coldest.coldestDay+' / ERA5';
 button.disabled=false;
 button.addEventListener('click',()=>{
  document.querySelector('[data-tab="simulator"]').click();
  document.querySelector('[data-scenario="cold"]').click();
  const input=document.querySelector('#temperature');input.step='0.1';input.value=String(coldest.coldestDailyMinimumC);input.dispatchEvent(new Event('input',{bubbles:true}));
  document.querySelector('#historical-input-status').textContent='已载入 '+coldest.coldestDay+' 的 ERA5 最低日温参考；供电、积冰和门状态保持人工设置。';
 });
}catch(error){document.querySelector('#historical-min').textContent='数据暂不可用，请打开场地档案核对。';console.error(error)}
