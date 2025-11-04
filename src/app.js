const state = {
  vehicles: [
    {
      id: "VH-001",
      name: "トヨタ ハイエース DX",
      base: "東京営業所",
      mileage: 48200,
      nextInspection: "2024-09-18",
      status: "稼働中",
      supervisor: "田中 健太",
      notes: "長距離配送での使用が多いためタイヤ摩耗に注意"
    },
    {
      id: "VH-002",
      name: "日産 キャラバン",
      base: "横浜物流センター",
      mileage: 61230,
      nextInspection: "2024-08-21",
      status: "点検待ち",
      supervisor: "鈴木 真由",
      notes: "定期12ヶ月点検を予約済み"
    },
    {
      id: "VH-003",
      name: "いすゞ エルフ",
      base: "千葉ディストリビューション",
      mileage: 78210,
      nextInspection: "2024-10-03",
      status: "整備中",
      supervisor: "小林 亮",
      notes: "冷却水センサー交換手配中"
    },
    {
      id: "VH-004",
      name: "トヨタ プロボックス",
      base: "大宮営業所",
      mileage: 31220,
      nextInspection: "2024-11-12",
      status: "稼働中",
      supervisor: "山本 彩",
      notes: "ドライバーから軽微な異音報告"
    },
    {
      id: "VH-005",
      name: "三菱ふそう キャンター",
      base: "船橋サービスセンター",
      mileage: 90540,
      nextInspection: "2024-08-30",
      status: "代車対応",
      supervisor: "伊藤 慶",
      notes: "クラッチ交換のため代車手配中"
    }
  ],
  inspections: [
    {
      id: "INSP-2024-0801",
      vehicleId: "VH-002",
      vehicleName: "日産 キャラバン",
      type: "12ヶ月定期点検",
      scheduledDate: "2024-08-21",
      supervisor: "鈴木 真由",
      status: "予定",
      checklist: ["制動装置", "油脂類", "ライト周り"]
    },
    {
      id: "INSP-2024-0804",
      vehicleId: "VH-005",
      vehicleName: "三菱ふそう キャンター",
      type: "車検前点検",
      scheduledDate: "2024-08-30",
      supervisor: "伊藤 慶",
      status: "実施中",
      checklist: ["排気系", "駆動系", "灯火類"]
    },
    {
      id: "INSP-2024-0901",
      vehicleId: "VH-001",
      vehicleName: "トヨタ ハイエース DX",
      type: "12ヶ月定期点検",
      scheduledDate: "2024-09-18",
      supervisor: "田中 健太",
      status: "予定",
      checklist: ["下回り", "タイヤ摩耗", "排ガス"]
    },
    {
      id: "INSP-2024-0703",
      vehicleId: "VH-003",
      vehicleName: "いすゞ エルフ",
      type: "臨時安全点検",
      scheduledDate: "2024-07-30",
      supervisor: "小林 亮",
      status: "延期",
      checklist: ["冷却水", "エンジンルーム"]
    }
  ],
  estimates: [
    {
      id: "EST-1043",
      client: "ABC物流株式会社",
      vehicleId: "VH-003",
      vehicleName: "いすゞ エルフ",
      amount: 128000,
      issuedDate: "2024-08-02",
      status: "提出済み",
      validity: "2024-09-01",
      items: [
        { name: "エンジンオイル交換", price: 18000 },
        { name: "冷却水センサー交換", price: 32000 },
        { name: "作業工賃", price: 78000 }
      ]
    },
    {
      id: "EST-1048",
      client: "コープ首都圏",
      vehicleId: "VH-001",
      vehicleName: "トヨタ ハイエース DX",
      amount: 94000,
      issuedDate: "2024-08-04",
      status: "下書き",
      validity: "2024-09-15",
      items: [
        { name: "12ヶ月定期点検", price: 42000 },
        { name: "消耗部品一式", price: 18000 },
        { name: "代車費用(3日)", price: 34000 }
      ]
    },
    {
      id: "EST-1034",
      client: "サンライズ宅配",
      vehicleId: "VH-005",
      vehicleName: "三菱ふそう キャンター",
      amount: 186000,
      issuedDate: "2024-07-28",
      status: "承認待ち",
      validity: "2024-08-25",
      items: [
        { name: "クラッチ一式交換", price: 118000 },
        { name: "ミッションオイル交換", price: 36000 },
        { name: "工賃", price: 32000 }
      ]
    },
    {
      id: "EST-0998",
      client: "グリーン便サービス",
      vehicleId: "VH-004",
      vehicleName: "トヨタ プロボックス",
      amount: 54000,
      issuedDate: "2024-07-10",
      status: "成約",
      validity: "2024-08-05",
      items: [
        { name: "車内消臭施工", price: 8000 },
        { name: "タイヤローテーション", price: 14000 },
        { name: "定期点検パック", price: 32000 }
      ]
    }
  ],
  maintenance: [
    {
      id: "MNT-2201",
      vehicleId: "VH-005",
      vehicleName: "三菱ふそう キャンター",
      task: "クラッチ交換",
      vendor: "メカテック整備工場",
      scheduledDate: "2024-08-28",
      status: "進行中",
      cost: 186000,
      memo: "部品入荷済み。完了後ロードテスト予定"
    },
    {
      id: "MNT-2197",
      vehicleId: "VH-003",
      vehicleName: "いすゞ エルフ",
      task: "冷却水センサー交換",
      vendor: "いすゞディーラー千葉",
      scheduledDate: "2024-08-07",
      status: "受付",
      cost: 48000,
      memo: "センサー在庫確認済み"
    },
    {
      id: "MNT-2191",
      vehicleId: "VH-004",
      vehicleName: "トヨタ プロボックス",
      task: "異音診断",
      vendor: "カースルー整備センター",
      scheduledDate: "2024-08-12",
      status: "進行中",
      cost: 22000,
      memo: "ホイールベアリング交換検討"
    },
    {
      id: "MNT-2183",
      vehicleId: "VH-001",
      vehicleName: "トヨタ ハイエース DX",
      task: "タイヤ交換",
      vendor: "タイヤプラス渋谷",
      scheduledDate: "2024-07-18",
      status: "完了",
      cost: 68000,
      memo: "フロント左右交換。バランス取り実施"
    }
  ]
};

const badgeClasses = {
  稼働中: "badge--completed",
  点検待ち: "badge--planned",
  整備中: "badge--progress",
  代車対応: "badge--delayed",
  予定: "badge--planned",
  実施中: "badge--progress",
  延期: "badge--delayed",
  完了: "badge--completed",
  下書き: "badge--draft",
  提出済み: "badge--planned",
  承認待ち: "badge--progress",
  成約: "badge--completed",
  失注: "badge--lost",
  受付: "badge--planned"
};

const drawerTemplates = {
  notifications: {
    title: "最新の通知",
    content: () => `
      <div class="detail-list">
        <div class="detail-list__row">
          <p class="detail-list__label">08/05 11:30</p>
          <p class="detail-list__value">点検 <strong>INSP-2024-0804</strong> が進行中です。</p>
        </div>
        <div class="detail-list__row">
          <p class="detail-list__label">08/04 09:20</p>
          <p class="detail-list__value">見積 <strong>EST-1048</strong> を下書き保存しました。</p>
        </div>
        <div class="detail-list__row">
          <p class="detail-list__label">08/02 17:40</p>
          <p class="detail-list__value">車両 <strong>VH-003</strong> の整備依頼が受付されました。</p>
        </div>
      </div>
    `
  },
  reports: {
    title: "レポート出力",
    content: () => `
      <div class="form-grid">
        <label>
          レポート期間
          <select>
            <option>今月</option>
            <option>先月</option>
            <option>四半期</option>
            <option>年間</option>
          </select>
        </label>
        <label>
          レポート種別
          <select>
            <option>点検実績</option>
            <option>見積状況</option>
            <option>メンテナンス履歴</option>
            <option>車両稼働率</option>
          </select>
        </label>
        <div class="form-actions">
          <button class="ghost-button" data-close-drawer>キャンセル</button>
          <button class="primary-button" disabled>エクスポート (準備中)</button>
        </div>
      </div>
    `
  },
  newVehicle: {
    title: "新規車両登録",
    content: () => `
      <div class="form-grid">
        <label>車両名<input placeholder="例: トヨタ ハイエース" /></label>
        <label>登録番号<input placeholder="例: VH-006" /></label>
        <label>所属拠点<input placeholder="例: 川崎営業所" /></label>
        <label>初回登録日<input type="date" /></label>
        <label>備考<textarea placeholder="登録メモを入力"></textarea></label>
        <div class="form-actions">
          <button class="ghost-button" data-close-drawer>下書き保存</button>
          <button class="primary-button" disabled>登録 (モック)</button>
        </div>
      </div>
    `
  },
  newInspection: {
    title: "新しい点検予定",
    content: () => `
      <div class="form-grid">
        <label>対象車両<select>${state.vehicles
          .map((vehicle) => `<option>${vehicle.id}｜${vehicle.name}</option>`)
          .join("")}</select></label>
        <label>点検種別<select>
          <option>12ヶ月定期点検</option>
          <option>6ヶ月法定点検</option>
          <option>車検前点検</option>
          <option>臨時点検</option>
        </select></label>
        <label>予定日<input type="date" /></label>
        <label>担当者<input placeholder="例: 整備 太郎" /></label>
        <label>メモ<textarea placeholder="重点確認事項"></textarea></label>
        <div class="form-actions">
          <button class="ghost-button" data-close-drawer>キャンセル</button>
          <button class="primary-button" disabled>登録 (モック)</button>
        </div>
      </div>
    `
  },
  newEstimate: {
    title: "見積作成",
    content: () => `
      <div class="form-grid">
        <label>顧客名<input placeholder="例: 株式会社〇〇" /></label>
        <label>対象車両<select>${state.vehicles
          .map((vehicle) => `<option>${vehicle.id}｜${vehicle.name}</option>`)
          .join("")}</select></label>
        <label>有効期限<input type="date" /></label>
        <label>主な作業内容<textarea placeholder="整備内容・交換部品など"></textarea></label>
        <div class="form-actions">
          <button class="ghost-button" data-close-drawer>下書き保存</button>
          <button class="primary-button" disabled>見積発行 (モック)</button>
        </div>
      </div>
    `
  },
  newMaintenance: {
    title: "整備依頼登録",
    content: () => `
      <div class="form-grid">
        <label>車両<select>${state.vehicles
          .map((vehicle) => `<option>${vehicle.id}｜${vehicle.name}</option>`)
          .join("")}</select></label>
        <label>作業内容<input placeholder="例: タイヤ交換" /></label>
        <label>入庫予定日<input type="date" /></label>
        <label>外注先<input placeholder="例: ○○モータース" /></label>
        <label>メモ<textarea placeholder="故障状況や依頼内容の詳細"></textarea></label>
        <div class="form-actions">
          <button class="ghost-button" data-close-drawer>キャンセル</button>
          <button class="primary-button" disabled>登録 (モック)</button>
        </div>
      </div>
    `
  }
};

const formatCurrency = (value) =>
  value.toLocaleString("ja-JP", { style: "currency", currency: "JPY" });

const formatDate = (value) =>
  new Date(value).toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  });

const createBadge = (status) => {
  const badgeClass = badgeClasses[status] ?? "badge--draft";
  return `<span class="badge ${badgeClass}">${status}</span>`;
};

const updateSummaries = () => {
  const vehicleCount = state.vehicles.length;
  const currentMonth = new Date().getMonth();
  const inspectionsThisMonth = state.inspections.filter(
    (inspection) => new Date(inspection.scheduledDate).getMonth() === currentMonth
  ).length;
  const estimateValue = state.estimates.reduce((total, estimate) => total + estimate.amount, 0);
  const maintenanceCompleted = state.maintenance.filter((item) => item.status === "完了").length;
  const maintenanceProgress = state.maintenance.length
    ? Math.round((maintenanceCompleted / state.maintenance.length) * 100)
    : 0;

  document.querySelector('[data-summary="vehicleCount"] .summary-card__value').textContent =
    vehicleCount;
  document.querySelector('[data-summary="inspectionCount"] .summary-card__value').textContent =
    inspectionsThisMonth;
  document.querySelector('[data-summary="estimateValue"] .summary-card__value').textContent =
    formatCurrency(estimateValue);
  document.querySelector(
    '[data-summary="maintenanceProgress"] .summary-card__value'
  ).textContent = `${maintenanceProgress}%`;
};

const renderVehicleTable = () => {
  const tbody = document.getElementById("vehicle-table");
  tbody.innerHTML = state.vehicles
    .map(
      (vehicle) => `
        <tr data-id="${vehicle.id}">
          <td>
            <div class="cell-main">
              <strong>${vehicle.name}</strong>
              <span class="cell-sub">${vehicle.id}</span>
            </div>
          </td>
          <td>${vehicle.base}</td>
          <td>${vehicle.mileage.toLocaleString()} km</td>
          <td>${formatDate(vehicle.nextInspection)}</td>
          <td>${createBadge(vehicle.status)}</td>
          <td><button class="link-button" data-detail-type="vehicle" data-detail-id="${vehicle.id}">詳細</button></td>
        </tr>
      `
    )
    .join("");
};

const renderInspectionTable = (filter = "all") => {
  const tbody = document.getElementById("inspection-table");
  tbody.innerHTML = state.inspections
    .filter((inspection) => filter === "all" || inspection.status === filter)
    .map(
      (inspection) => `
        <tr>
          <td>${inspection.id}</td>
          <td>${inspection.vehicleName}</td>
          <td>${inspection.type}</td>
          <td>${formatDate(inspection.scheduledDate)}</td>
          <td>${inspection.supervisor}</td>
          <td>${createBadge(inspection.status)}</td>
          <td><button class="link-button" data-detail-type="inspection" data-detail-id="${inspection.id}">詳細</button></td>
        </tr>
      `
    )
    .join("");
};

const renderEstimateTable = (filter = "all") => {
  const tbody = document.getElementById("estimate-table");
  tbody.innerHTML = state.estimates
    .filter((estimate) => filter === "all" || estimate.status === filter)
    .map(
      (estimate) => `
        <tr>
          <td>${estimate.id}</td>
          <td>${estimate.client}</td>
          <td>${estimate.vehicleName}</td>
          <td>${formatCurrency(estimate.amount)}</td>
          <td>${formatDate(estimate.issuedDate)}</td>
          <td>${createBadge(estimate.status)}</td>
          <td><button class="link-button" data-detail-type="estimate" data-detail-id="${estimate.id}">詳細</button></td>
        </tr>
      `
    )
    .join("");
};

const renderMaintenanceTable = (filter = "all") => {
  const tbody = document.getElementById("maintenance-table");
  tbody.innerHTML = state.maintenance
    .filter((item) => filter === "all" || item.status === filter)
    .map(
      (item) => `
        <tr>
          <td>${item.id}</td>
          <td>${item.vehicleName}</td>
          <td>${item.task}</td>
          <td>${formatDate(item.scheduledDate)}</td>
          <td>${item.vendor}</td>
          <td>${createBadge(item.status)}</td>
          <td><button class="link-button" data-detail-type="maintenance" data-detail-id="${item.id}">詳細</button></td>
        </tr>
      `
    )
    .join("");
};

const renderTimeline = (filter = "all") => {
  const timeline = document.getElementById("timeline-list");
  const events = [
    ...state.inspections.map((inspection) => ({
      id: inspection.id,
      type: "inspection",
      label: "点検",
      title: `${inspection.vehicleName} / ${inspection.type}`,
      date: inspection.scheduledDate,
      meta: `担当: ${inspection.supervisor}`
    })),
    ...state.estimates.map((estimate) => ({
      id: estimate.id,
      type: "estimate",
      label: "見積",
      title: `${estimate.client} 向け ${estimate.vehicleName}`,
      date: estimate.issuedDate,
      meta: `状態: ${estimate.status}`
    })),
    ...state.maintenance.map((item) => ({
      id: item.id,
      type: "maintenance",
      label: "メンテナンス",
      title: `${item.vehicleName} / ${item.task}`,
      date: item.scheduledDate,
      meta: `外注先: ${item.vendor}`
    }))
  ]
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .filter((event) => filter === "all" || event.type === filter)
    .slice(0, 6);

  timeline.innerHTML = events
    .map(
      (event) => `
        <li class="timeline__item">
          <span class="timeline__time">${formatDate(event.date)}</span>
          <div class="timeline__card">
            <span class="timeline__type">${event.label}</span>
            <p class="timeline__title">${event.title}</p>
            <p class="timeline__meta">${event.meta}</p>
          </div>
        </li>
      `
    )
    .join("");
};

const buildDetailList = (entries) =>
  `<div class="detail-list">${entries
    .map(
      (entry) => `
        <div class="detail-list__row">
          <span class="detail-list__label">${entry.label}</span>
          <span class="detail-list__value">${entry.value}</span>
        </div>
      `
    )
    .join("")}</div>`;

const showDrawer = (title, html) => {
  const drawer = document.querySelector("[data-drawer]");
  const backdrop = document.querySelector("[data-backdrop]");
  const titleEl = document.querySelector("[data-drawer-title]");
  const contentEl = document.querySelector("[data-drawer-content]");
  titleEl.textContent = title;
  contentEl.innerHTML = html;
  drawer.hidden = false;
  backdrop.hidden = false;
};

const closeDrawer = () => {
  document.querySelector("[data-drawer]").hidden = true;
  document.querySelector("[data-backdrop]").hidden = true;
};

const openDetail = (type, id) => {
  switch (type) {
    case "vehicle": {
      const vehicle = state.vehicles.find((item) => item.id === id);
      if (!vehicle) return;
      showDrawer(
        `${vehicle.name} の詳細`,
        buildDetailList([
          { label: "管理番号", value: vehicle.id },
          { label: "所属拠点", value: vehicle.base },
          { label: "累計走行距離", value: `${vehicle.mileage.toLocaleString()} km` },
          { label: "次回点検", value: formatDate(vehicle.nextInspection) },
          { label: "現況", value: createBadge(vehicle.status) },
          { label: "担当者", value: vehicle.supervisor },
          { label: "メモ", value: vehicle.notes }
        ])
      );
      break;
    }
    case "inspection": {
      const inspection = state.inspections.find((item) => item.id === id);
      if (!inspection) return;
      showDrawer(
        `${inspection.vehicleName} 点検詳細`,
        `${buildDetailList([
          { label: "管理番号", value: inspection.id },
          { label: "予定日", value: formatDate(inspection.scheduledDate) },
          { label: "点検種別", value: inspection.type },
          { label: "担当者", value: inspection.supervisor },
          { label: "状態", value: createBadge(inspection.status) }
        ])}
        <div class="detail-list">
          <div class="detail-list__row">
            <span class="detail-list__label">重点チェック項目</span>
            <span class="detail-list__value">${inspection.checklist.join(" / ")}</span>
          </div>
        </div>`
      );
      break;
    }
    case "estimate": {
      const estimate = state.estimates.find((item) => item.id === id);
      if (!estimate) return;
      showDrawer(
        `${estimate.id} 見積詳細`,
        `${buildDetailList([
          { label: "顧客", value: estimate.client },
          { label: "対象車両", value: `${estimate.vehicleName} (${estimate.vehicleId})` },
          { label: "金額", value: formatCurrency(estimate.amount) },
          { label: "発行日", value: formatDate(estimate.issuedDate) },
          { label: "有効期限", value: formatDate(estimate.validity) },
          { label: "状態", value: createBadge(estimate.status) }
        ])}
        <div class="detail-list">
          <div class="detail-list__row">
            <span class="detail-list__label">見積内訳</span>
            <span class="detail-list__value">
              ${estimate.items
                .map((item) => `${item.name}：${formatCurrency(item.price)}`)
                .join("<br />")}
            </span>
          </div>
        </div>`
      );
      break;
    }
    case "maintenance": {
      const maintenance = state.maintenance.find((item) => item.id === id);
      if (!maintenance) return;
      showDrawer(
        `${maintenance.vehicleName} 整備詳細`,
        `${buildDetailList([
          { label: "案件番号", value: maintenance.id },
          { label: "作業内容", value: maintenance.task },
          { label: "入庫日", value: formatDate(maintenance.scheduledDate) },
          { label: "外注先", value: maintenance.vendor },
          { label: "費用見込み", value: formatCurrency(maintenance.cost) },
          { label: "状態", value: createBadge(maintenance.status) }
        ])}
        <div class="detail-list">
          <div class="detail-list__row">
            <span class="detail-list__label">メモ</span>
            <span class="detail-list__value">${maintenance.memo}</span>
          </div>
        </div>`
      );
      break;
    }
    default:
      break;
  }
};

const openDrawerByKey = (key) => {
  const template = drawerTemplates[key];
  if (!template) return;
  showDrawer(template.title, template.content());
};

const setupNavigation = () => {
  const buttons = document.querySelectorAll("[data-view]");
  const views = document.querySelectorAll("[data-section]");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      buttons.forEach((btn) => btn.classList.remove("is-active"));
      button.classList.add("is-active");

      const target = button.dataset.view;
      views.forEach((view) => {
        view.classList.toggle("is-active", view.dataset.section === target);
      });
    });
  });
};

const setupFilters = () => {
  document.getElementById("inspection-filter").addEventListener("change", (event) => {
    renderInspectionTable(event.target.value);
  });
  document.getElementById("estimate-filter").addEventListener("change", (event) => {
    renderEstimateTable(event.target.value);
  });
  document.getElementById("maintenance-filter").addEventListener("change", (event) => {
    renderMaintenanceTable(event.target.value);
  });
  document.getElementById("action-filter").addEventListener("change", (event) => {
    renderTimeline(event.target.value);
  });
};

const setupDrawerTriggers = () => {
  document.addEventListener("click", (event) => {
    const closeTrigger = event.target.closest("[data-close-drawer]");
    if (closeTrigger) {
      closeDrawer();
      return;
    }

    const trigger = event.target.closest("[data-open-drawer]");
    if (trigger) {
      openDrawerByKey(trigger.dataset.openDrawer);
      return;
    }

    const detailTrigger = event.target.closest("[data-detail-type]");
    if (detailTrigger) {
      openDetail(detailTrigger.dataset.detailType, detailTrigger.dataset.detailId);
    }
  });

  document.querySelector("[data-backdrop]").addEventListener("click", closeDrawer);

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeDrawer();
    }
  });
};

document.addEventListener("DOMContentLoaded", () => {
  setupNavigation();
  setupFilters();
  setupDrawerTriggers();
  updateSummaries();
  renderVehicleTable();
  renderInspectionTable();
  renderEstimateTable();
  renderMaintenanceTable();
  renderTimeline();
});
