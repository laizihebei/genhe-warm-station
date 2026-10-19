export const scoreRubric = {
  buffer: { label: '入口缓冲与抗冷风', max: 30 },
  circulation: { label: '通行、停留与无障碍', max: 25 },
  daylight: { label: '冬季采光与百叶逻辑', max: 20 },
  maintenance: { label: '清雪、设备与维护', max: 25 },
};

export const assignmentPlans = [
  {
    id: 'P01',
    studyOnly: true,
    modifiesR04: false,
    title: '干湿分区',
    subtitle: '把潮湿装备留在入口边界',
    principle: '入口侧容纳换鞋、挂衣与短暂停留；公共暖区维持完整通行带，服务房间沿侧边组织。',
    critique: '降低湿雪进入主要停留区的机会，入口家具需要防潮且便于清理。',
    caution: '检验门扇回转、1500mm无障碍回转空间与高峰时的排队位置。',
    zones: [
      { x: 56, y: 234, w: 128, h: 132, label: '入口缓冲', kind: 'buffer' },
      { x: 190, y: 80, w: 224, h: 286, label: '公共暖区', kind: 'warm' },
      { x: 420, y: 80, w: 122, h: 138, label: '卫生间', kind: 'service' },
      { x: 420, y: 226, w: 122, h: 140, label: '饮水 / 设备', kind: 'service' },
    ],
    partitionPaths: ['M190 80v286', 'M414 80v286', 'M420 218h122'],
    routePath: 'M78 394H157V346H250',
    furniture: [
      { x: 72, y: 268, w: 83, h: 18, label: '湿雪衣帽' },
      { x: 207, y: 133, w: 92, h: 27, label: '休息座椅' },
      { x: 316, y: 133, w: 74, h: 27, label: '休息座椅' },
      { x: 207, y: 304, w: 154, h: 22, label: '清晰通行带' },
    ],
    scores: { buffer: 27, circulation: 23, daylight: 16, maintenance: 22 },
    responses: {
      cold: {
        before: '外门开启时，冷风可能跟随人流进入停留区；入口边界缺少湿冷装备的过渡位置。',
        after: '衣帽与换鞋安排在入口缓冲侧，暖区入口留出门扇和短时排队空间。',
        action: '保持两道门分次开启，湿雪装备在缓冲区整理后再进入暖区。',
      },
      snow: {
        before: '鞋底积雪与滴水容易沿主要通行路径带入室内，清理动作会打断休息使用。',
        after: '在入口侧提供可清理的装备与落雪整理位置，主通行带保持连续。',
        action: '先清入口平台和鞋底，再巡检排水与伴热；效果需现场使用验证。',
      },
      sun: {
        before: '座椅若只按容量摆放，冬季低角度日光和窗边眩光可能被忽略。',
        after: '座位分组并预留窗边调节空间，避免家具挡住活动百叶的操作与检修。',
        action: '依据冬季时段人工调节六片百叶，观察眩光和座位舒适度。',
      },
    },
  },
  {
    id: 'P02',
    studyOnly: true,
    modifiesR04: false,
    title: '清晰到达',
    subtitle: '让门斗、等候与服务一眼可读',
    principle: '入口到公共暖区形成短而直接的主路径；饮水服务可见，停留家具退至两侧。',
    critique: '初次使用者容易判断下一步；服务点需避免形成横穿主通道的队列。',
    caution: '核对队列长度、门斗净宽及服务家具是否侵占无障碍路线。',
    zones: [
      { x: 56, y: 234, w: 128, h: 132, label: '入口缓冲', kind: 'buffer' },
      { x: 190, y: 80, w: 224, h: 286, label: '通达暖区', kind: 'warm' },
      { x: 420, y: 80, w: 122, h: 138, label: '卫生间', kind: 'service' },
      { x: 420, y: 226, w: 122, h: 140, label: '饮水服务', kind: 'service' },
    ],
    partitionPaths: ['M190 80v286', 'M414 80v286', 'M420 193h122', 'M420 272h122'],
    routePath: 'M78 394H157V346H250',
    furniture: [
      { x: 70, y: 279, w: 87, h: 22, label: '短停整理' },
      { x: 207, y: 123, w: 80, h: 28, label: '休息座椅' },
      { x: 310, y: 270, w: 86, h: 28, label: '等候座椅' },
      { x: 442, y: 274, w: 79, h: 26, label: '饮水台' },
    ],
    scores: { buffer: 25, circulation: 25, daylight: 17, maintenance: 24 },
    responses: {
      cold: {
        before: '在寒冷天气中，入口、等候与饮水若互相交叉，会增加停留时间和开门次数。',
        after: '主路径从门斗直接进入暖区，服务点可见，等候家具靠边布置。',
        action: '以分次开门和紧凑服务路径减少入口停留；不以此推断实际热工性能。',
      },
      snow: {
        before: '积雪后的短时排队可能占用清雪通道，设备巡查也容易与访客路线重叠。',
        after: '主通行线与边缘停留区分开，服务与清理动线可以分别检查。',
        action: '清雪后复核通行带连续和出口可用，再做设备与伴热检查。',
      },
      sun: {
        before: '座位和服务台若缺少日照关系，冬季光线可能落在屏幕、饮水操作面或眼睛高度。',
        after: '休息座位与服务操作面分区，窗边留出可观察光线和调叶的余地。',
        action: '在早、中、晚三个冬季时段对照日照方向，人工调节叶片并记录观察。',
      },
    },
  },
  {
    id: 'P03',
    studyOnly: true,
    modifiesR04: false,
    title: '设备旁路',
    subtitle: '维护人员不穿越公共停留区',
    principle: '设备维护靠侧边独立组织，访客使用暖区与服务空间时保留较少交叉的回路。',
    critique: '维护和访客路径更容易分辨，设备侧边需保证搬运、检修和开门净空。',
    caution: '设备、供暖和管线均未做工程设计；旁路能否成立需结合实际设备尺寸校核。',
    zones: [
      { x: 56, y: 234, w: 128, h: 132, label: '入口缓冲', kind: 'buffer' },
      { x: 190, y: 80, w: 224, h: 286, label: '公共暖区', kind: 'warm' },
      { x: 420, y: 80, w: 122, h: 138, label: '卫生间', kind: 'service' },
      { x: 420, y: 226, w: 122, h: 140, label: '设备维护', kind: 'equipment' },
    ],
    partitionPaths: ['M190 80v286', 'M414 80v286', 'M420 206h122', 'M500 206v160'],
    routePath: 'M582 191H530V294H493',
    furniture: [
      { x: 72, y: 276, w: 83, h: 21, label: '装备收纳' },
      { x: 206, y: 124, w: 78, h: 28, label: '休息座椅' },
      { x: 315, y: 124, w: 78, h: 28, label: '休息座椅' },
      { x: 432, y: 273, w: 96, h: 24, label: '检修净空' },
    ],
    scores: { buffer: 26, circulation: 21, daylight: 18, maintenance: 19 },
    responses: {
      cold: {
        before: '供暖或设备异常时，维护者可能穿越暖区，开门、工具和访客活动相互干扰。',
        after: '把维护空间放在公共停留边缘，保留一条可辨认的设备巡检路线。',
        action: '停电时按设备清单巡检，不把空间分区误解为备用供热能力。',
      },
      snow: {
        before: '风雪天气后，设备维护可能与访客清雪、入站路线同时发生。',
        after: '设备侧预留可检查位置，入口侧优先保持连续的清雪与抵达路径。',
        action: '先确保人员安全和出入口，再按维护清单检查排水、伴热与设备状态。',
      },
      sun: {
        before: '维修操作面若占用窗边或百叶检修位置，调节和清洁会变得困难。',
        after: '活动百叶的检修面保持可接近，设备停留区与采光停留区分开。',
        action: '检修时先锁定叶片并清除结冰；百叶强度和防夹仍需样件验证。',
      },
    },
  },
  {
    id: 'P04',
    studyOnly: true,
    modifiesR04: false,
    title: '采光共享',
    subtitle: '把公共停留和冬季日照一起布置',
    principle: '主要休息位靠近采光边缘，中央保留回转与交通空间，服务房间仍集中在侧边。',
    critique: '能把日照体验纳入家具选择；需防止窗边冷辐射、眩光和百叶操作冲突。',
    caution: '没有热工、眩光、门窗性能模拟；需要实测或专业软件继续验证。',
    zones: [
      { x: 56, y: 234, w: 128, h: 132, label: '入口缓冲', kind: 'buffer' },
      { x: 190, y: 80, w: 224, h: 286, label: '共享暖区', kind: 'warm' },
      { x: 420, y: 80, w: 122, h: 138, label: '卫生间', kind: 'service' },
      { x: 420, y: 226, w: 122, h: 140, label: '饮水 / 储物', kind: 'service' },
    ],
    partitionPaths: ['M190 80v286', 'M438 80v286', 'M444 220h98', 'M190 208h130'],
    routePath: 'M78 394H157V346H250',
    furniture: [
      { x: 72, y: 278, w: 83, h: 21, label: '入口整理' },
      { x: 207, y: 112, w: 174, h: 26, label: '窗边休息位' },
      { x: 220, y: 240, w: 132, h: 26, label: '共享桌' },
      { x: 437, y: 267, w: 89, h: 25, label: '饮水台' },
    ],
    scores: { buffer: 24, circulation: 22, daylight: 20, maintenance: 23 },
    responses: {
      cold: {
        before: '窗边座位若只追求采光，可能忽略围护表面温度、入口冷风和暖区活动路径。',
        after: '入口缓冲仍优先处理冷风，座位远离直接开门路径并保留中央通行。',
        action: '把日照作为停留体验研究，同时继续校核窗边舒适度和结露风险。',
      },
      snow: {
        before: '屋面排雪、清雪通道与窗边活动容易被分别考虑，维护风险不易被发现。',
        after: '把公共使用、入口清雪和设备检修放在同一张平面图上检查。',
        action: '将清雪路径和落雪影响标在现场方案中；屋面雪荷载仍需专业核算。',
      },
      sun: {
        before: '低角度冬日光可能造成直射眩光，也可能因家具遮挡削弱室内采光。',
        after: '窗边安排短时停留，中央共享面保持可用，百叶可接近并能人工锁止。',
        action: '对照冬季日照时段观察光斑，再人工在0°与75°锁止位置间调节。',
      },
    },
  },
];

const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (character) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
}[character]));

function planSvg(plan) {
  const zones = plan.zones.map((zone) => `<g><rect class="plan-zone ${zone.kind}" x="${zone.x}" y="${zone.y}" width="${zone.w}" height="${zone.h}" rx="2"/><text class="plan-zone-label" x="${zone.x + zone.w / 2}" y="${zone.y + 19}" text-anchor="middle">${escapeHtml(zone.label)}</text></g>`).join('');
  const furniture = plan.furniture.map((item) => `<g><rect class="plan-furniture" x="${item.x}" y="${item.y}" width="${item.w}" height="${item.h}" rx="2"/><text class="plan-furniture-label" x="${item.x + item.w / 2}" y="${item.y + item.h / 2 + 3}" text-anchor="middle">${escapeHtml(item.label)}</text></g>`).join('');
  const partitions = (plan.partitionPaths || []).map((path) => `<path class="plan-divider" d="${path}"/>`).join('');
  return `<svg class="study-plan" viewBox="0 0 600 430" role="img" aria-label="${escapeHtml(plan.id)} ${escapeHtml(plan.title)}平面关系示意"><defs><marker id="route-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L7,3 z" fill="#bf8752"/></marker></defs>${zones}${furniture}<path class="plan-wall" d="M50 45H550V174 M550 208V375H145 M50 375V45"/><path class="plan-entry" d="M50 375H112 M550 174V208"/><path class="plan-window" d="M250 376h84 M434 45h60 M50 180v58"/>${partitions}<path class="plan-route" d="${plan.routePath || 'M78 394H157V346H250'}"/><text class="plan-note" x="52" y="25">固定教学外包轮廓 · 12 × 9 m</text><text class="plan-note" x="51" y="415">入口侧 → 暖区 → 服务 / 维护</text></svg>`;
}

const scenarioLabels = { cold: '极寒低温', snow: '降雪结冰', sun: '冬季日照' };
let selectedPlan = assignmentPlans[0];
let selectedScenario = 'cold';
let selectedStage = 'after';

function renderStudy() {
  const root = document.querySelector('#study-comparison');
  if (!root) return;
  const rubric = Object.entries(scoreRubric).map(([key, item]) => {
    const score = selectedPlan.scores[key];
    return `<div class="score-row"><span>${item.label}</span><strong>${score}<small> / ${item.max}</small></strong><i><b style="width:${score / item.max * 100}%"></b></i></div>`;
  }).join('');
  const scoreTotal = Object.values(selectedPlan.scores).reduce((sum, score) => sum + score, 0);
  const response = selectedPlan.responses[selectedScenario];
  const currentText = selectedStage === 'before' ? response.before : response.after;
  root.innerHTML = `<div class="study-tabs" role="group" aria-label="选择平面比较方案">${assignmentPlans.map((plan) => `<button aria-pressed="${plan.id === selectedPlan.id}" data-plan="${plan.id}"><small>${plan.id}</small><strong>${escapeHtml(plan.title)}</strong></button>`).join('')}</div><div class="study-workbench" data-show-state="${selectedStage}"><div class="plan-board"><div class="plan-board-head"><span>SCHEMATIC PLAN / 研究示意</span><b>${selectedPlan.id} · ${escapeHtml(selectedPlan.title)}</b></div>${planSvg(selectedPlan)}<div class="plan-legend"><span><i class="legend-buffer"></i>入口缓冲</span><span><i class="legend-warm"></i>公共暖区</span><span><i class="legend-service"></i>服务空间</span><span><i class="legend-equipment"></i>设备维护</span></div><p class="study-only">study-only · 方案比较图，不是R04竣工图；仅供课程空间研究，不改变原始CAD / SKP / GLB。</p></div><div class="study-analysis"><div class="study-title"><span>${selectedPlan.id} / SPATIAL STRATEGY</span><h3>${escapeHtml(selectedPlan.subtitle)}</h3><p>${escapeHtml(selectedPlan.principle)}</p></div><div class="response-simulator"><div class="response-tools"><div class="scenario-pills" role="group" aria-label="环境变量">${Object.entries(scenarioLabels).map(([key, label]) => `<button data-environment="${key}" aria-pressed="${key === selectedScenario}">${label}</button>`).join('')}</div><div class="stage-switch" role="group" aria-label="环境响应前后"><button data-stage="before" aria-pressed="${selectedStage === 'before'}">环境未响应</button><button data-stage="after" aria-pressed="${selectedStage === 'after'}">建筑响应后</button></div></div><div class="response-compare"><span>${scenarioLabels[selectedScenario]} · ${selectedStage === 'before' ? '问题状态' : '设计响应'}</span><p>${escapeHtml(currentText)}</p><small>设计动作：${escapeHtml(response.action)}</small></div></div><div class="critique-block"><span>CRIT / 设计自评</span><p>${escapeHtml(selectedPlan.critique)}</p><small>风险待检：${escapeHtml(selectedPlan.caution)}</small></div><div class="score-block"><div class="score-heading"><span>课程自评 · 非老师评分</span><strong>${scoreTotal}<small> / 100</small></strong></div>${rubric}<p>权重：入口缓冲30、通行与无障碍25、冬季采光20、维护25。用于比较研究，不代表工程性能或规范结论。</p></div></div></div>`;
  root.querySelectorAll('[data-plan]').forEach((button) => button.addEventListener('click', () => {
    selectedPlan = assignmentPlans.find((plan) => plan.id === button.dataset.plan) || assignmentPlans[0];
    renderStudy();
  }));
  root.querySelectorAll('[data-environment]').forEach((button) => button.addEventListener('click', () => {
    selectedScenario = button.dataset.environment;
    renderStudy();
  }));
  root.querySelectorAll('button[data-stage]').forEach((button) => button.addEventListener('click', () => {
    selectedStage = button.dataset.stage;
    renderStudy();
  }));
}

if (typeof document !== 'undefined') renderStudy();
