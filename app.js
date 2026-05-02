const MODULES = {
  inventario: { label: "Inventario", desc: "Control de productos, stock y alertas." },
  citas: { label: "Citas", desc: "Agenda de reservas y recordatorios." },
  ventas: { label: "Ventas", desc: "Registro de ventas, ticket y caja diaria." },
  clientes: { label: "Clientes", desc: "Historial de compras y datos de contacto." },
  reportes: { label: "Reportes", desc: "Indicadores de desempeño del negocio." },
  ecommerce: { label: "E-commerce", desc: "Catálogo web y pedidos online." },
};

const DEFAULT_BY_TYPE = {
  optica: ["inventario", "citas", "ventas", "clientes", "reportes"],
  cafeteria: ["inventario", "ventas", "clientes", "reportes"],
  farmacia: ["inventario", "ventas", "clientes", "reportes"],
  ropa: ["inventario", "ventas", "clientes", "ecommerce", "reportes"],
  otro: ["inventario", "ventas", "clientes"],
};

const state = {
  name: "Mi Negocio",
  type: "optica",
  modules: [...DEFAULT_BY_TYPE.optica],
};

const els = {
  businessName: document.getElementById("business-name"),
  businessType: document.getElementById("business-type"),
  inputName: document.getElementById("input-name"),
  inputType: document.getElementById("input-type"),
  modulesList: document.getElementById("modules-list"),
  dashboard: document.getElementById("dashboard"),
  saveBtn: document.getElementById("save-btn"),
  resetBtn: document.getElementById("reset-btn"),
  cardTpl: document.getElementById("module-card-template"),
};

function syncInputs() {
  els.inputName.value = state.name;
  els.inputType.value = state.type;
}

function drawModuleChecks() {
  els.modulesList.innerHTML = "";
  Object.entries(MODULES).forEach(([key, val]) => {
    const wrapper = document.createElement("label");
    wrapper.className = "check-item";

    const check = document.createElement("input");
    check.type = "checkbox";
    check.checked = state.modules.includes(key);
    check.addEventListener("change", () => {
      if (check.checked) state.modules.push(key);
      else state.modules = state.modules.filter((x) => x !== key);
      render();
    });

    const text = document.createTextNode(val.label);
    wrapper.append(check, text);
    els.modulesList.appendChild(wrapper);
  });
}

function drawDashboard() {
  els.dashboard.innerHTML = "";
  state.modules.forEach((moduleKey) => {
    const meta = MODULES[moduleKey];
    if (!meta) return;
    const fragment = els.cardTpl.content.cloneNode(true);
    fragment.querySelector(".card-title").textContent = meta.label;
    fragment.querySelector(".card-description").textContent = meta.desc;
    fragment.querySelector(".card-action").addEventListener("click", () => {
      alert(`Módulo: ${meta.label} (demo)`);
    });
    els.dashboard.appendChild(fragment);
  });
}

function renderHeader() {
  els.businessName.textContent = state.name;
  const typeLabel = els.inputType.options[els.inputType.selectedIndex].text;
  els.businessType.textContent = `Tipo: ${typeLabel}`;
}

function persist() {
  localStorage.setItem("pedix_modular_config", JSON.stringify(state));
}

function hydrate() {
  const raw = localStorage.getItem("pedix_modular_config");
  if (!raw) return;
  try {
    const saved = JSON.parse(raw);
    if (saved.name) state.name = saved.name;
    if (saved.type && DEFAULT_BY_TYPE[saved.type]) state.type = saved.type;
    if (Array.isArray(saved.modules)) state.modules = saved.modules.filter((x) => MODULES[x]);
  } catch {
    // ignore malformed payload
  }
}

function render() {
  renderHeader();
  drawModuleChecks();
  drawDashboard();
}

els.inputName.addEventListener("input", (e) => {
  state.name = e.target.value || "Mi Negocio";
  renderHeader();
});

els.inputType.addEventListener("change", (e) => {
  state.type = e.target.value;
  state.modules = [...DEFAULT_BY_TYPE[state.type]];
  render();
});

els.saveBtn.addEventListener("click", () => {
  persist();
  alert("Configuración guardada");
});

els.resetBtn.addEventListener("click", () => {
  state.name = "Mi Negocio";
  state.type = "optica";
  state.modules = [...DEFAULT_BY_TYPE.optica];
  syncInputs();
  render();
  persist();
});

hydrate();
syncInputs();
render();
