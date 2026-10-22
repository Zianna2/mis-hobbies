// ========================================================
// MIS HOBBIES - LÓGICA COZY & ADAPTACIÓN ESTACIONAL
// ========================================================

const STORAGE_KEY = 'mis_hobbies_data_v1';
const SEASON_STORAGE_KEY = 'mis_hobbies_season_preference';

// Configuración de las 4 estaciones del año
const SEASONS = {
  autumn: {
    id: 'autumn',
    name: 'Otoño Cálido',
    icon: '🍂',
    themeColor: '#FAF5ED',
    desc: 'Canela & Miel'
  },
  winter: {
    id: 'winter',
    name: 'Invierno Cozy',
    icon: '❄️',
    themeColor: '#F4F6F9',
    desc: 'Chocolate & Nieve'
  },
  spring: {
    id: 'spring',
    name: 'Primavera Dulce',
    icon: '🌸',
    themeColor: '#FAF7F4',
    desc: 'Matcha & Flores'
  },
  summer: {
    id: 'summer',
    name: 'Verano Serena',
    icon: '☀️',
    themeColor: '#FFFDF9',
    desc: 'Melocotón & Sol'
  }
};

let currentSeasonSetting = 'auto'; // 'auto', 'autumn', 'winter', 'spring', 'summer'
let activeSeasonKey = 'autumn';

// Estado global de la aplicación
let appData = {
  crochet: [],
  diamond: [],
  reading: []
};

// Datos iniciales de ejemplo acogedores
const initialSampleData = {
  crochet: [
    {
      id: 'sample-crochet-1',
      name: 'Manta de ochos y lana gruesa',
      yarn: 'Lana Merino & Alpaca',
      color: 'Terracota otoñal',
      hook: '6.0 mm',
      current: 28,
      target: 90,
      notes: 'Punto arroz doble en los bordes. Tejer con calma mientras tomo un té caliente.'
    }
  ],
  diamond: [
    {
      id: 'sample-diamond-1',
      name: 'Cabaña en el bosque al atardecer',
      size: '40 x 50 cm',
      progress: 42,
      codes: 'DMC 310 (Negro), DMC 434 (Marrón canela), DMC 742 (Dorado atardecer).',
      notes: 'Diamantes cuadrados con cera perfumada a vainilla.'
    }
  ],
  reading: [
    {
      id: 'sample-reading-1',
      title: 'La biblioteca de la medianoche',
      author: 'Matt Haig',
      currentPage: 145,
      totalPages: 330,
      rating: 5,
      quotes: '«Nunca subestimes la gran importancia de las cosas pequeñas». Una lectura preciosa para una tarde tranquila.'
    }
  ]
};

// ========================================================
// INICIALIZACIÓN
// ========================================================
document.addEventListener('DOMContentLoaded', () => {
  loadData();
  setupSeasonSystem();
  setupNavigation();
  setupBackupModal();
  setupStarRatingInput();
  renderAll();
});

// Feedback táctil con vibración suave
function vibratePhone(ms = 22) {
  if ('vibrate' in navigator) {
    try {
      navigator.vibrate(ms);
    } catch (e) {
      // Ignorar si no está soportado
    }
  }
}

// Cargar datos
function loadData() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      appData = JSON.parse(saved);
      if (!Array.isArray(appData.crochet)) appData.crochet = [];
      if (!Array.isArray(appData.diamond)) appData.diamond = [];
      if (!Array.isArray(appData.reading)) appData.reading = [];
    } catch (e) {
      console.error('Error al leer datos:', e);
      appData = JSON.parse(JSON.stringify(initialSampleData));
      saveData();
    }
  } else {
    appData = JSON.parse(JSON.stringify(initialSampleData));
    saveData();
  }
}

function saveData() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(appData));
}

// ========================================================
// SISTEMA ESTACIONAL SEGÚN EL CALENDARIO
// ========================================================
function setupSeasonSystem() {
  const savedSetting = localStorage.getItem(SEASON_STORAGE_KEY) || 'auto';
  currentSeasonSetting = savedSetting;
  updateSeason();
}

// Determina la estación del año automáticamente según el mes del calendario
function getAutoSeasonByDate(date = new Date()) {
  const month = date.getMonth(); // 0 = Enero, 11 = Diciembre
  // Otoño: Septiembre (8), Octubre (9), Noviembre (10)
  if (month >= 8 && month <= 10) return 'autumn';
  // Invierno: Diciembre (11), Enero (0), Febrero (1)
  if (month === 11 || month === 0 || month === 1) return 'winter';
  // Primavera: Marzo (2), Abril (3), Mayo (4)
  if (month >= 2 && month <= 4) return 'spring';
  // Verano: Junio (5), Julio (6), Agosto (7)
  return 'summer';
}

function updateSeason() {
  if (currentSeasonSetting === 'auto') {
    activeSeasonKey = getAutoSeasonByDate();
  } else {
    activeSeasonKey = currentSeasonSetting;
  }

  const seasonInfo = SEASONS[activeSeasonKey] || SEASONS.autumn;

  // 1. Aplicar al HTML para que el CSS cambie la paleta completa
  document.documentElement.setAttribute('data-season', activeSeasonKey);

  // 2. Cambiar el color de la barra del navegador de Chrome en Android
  const metaTheme = document.getElementById('metaThemeColor');
  if (metaTheme) {
    metaTheme.setAttribute('content', seasonInfo.themeColor);
  }

  // 3. Actualizar la pastilla en el encabezado
  const pillIcon = document.getElementById('seasonPillIcon');
  const pillText = document.getElementById('seasonPillText');
  if (pillIcon && pillText) {
    pillIcon.textContent = seasonInfo.icon;
    pillText.textContent = currentSeasonSetting === 'auto' 
      ? `${seasonInfo.name} (Auto)` 
      : seasonInfo.name;
  }

  // 4. Actualizar botones del modal
  document.querySelectorAll('.season-choice-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  const activeBtn = document.getElementById(`season-choice-${activeSeasonKey}`);
  if (activeBtn) activeBtn.classList.add('active');
}

function openSeasonModal() {
  const modal = document.getElementById('modal-season');
  if (modal) modal.classList.add('open');
}

function selectSeason(seasonKey) {
  currentSeasonSetting = seasonKey;
  localStorage.setItem(SEASON_STORAGE_KEY, seasonKey);
  updateSeason();
  closeModal('modal-season');
  vibratePhone(30);
}

// ========================================================
// SISTEMA DE NAVEGACIÓN ENTRE PESTAÑAS
// ========================================================
function setupNavigation() {
  const navButtons = document.querySelectorAll('.nav-item');
  const tabContents = document.querySelectorAll('.tab-content');

  navButtons.forEach(button => {
    button.addEventListener('click', () => {
      const targetTabId = button.getAttribute('data-tab');

      navButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      tabContents.forEach(tab => {
        if (tab.id === targetTabId) {
          tab.classList.add('active');
        } else {
          tab.classList.remove('active');
        }
      });

      vibratePhone(16);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });
}

// ========================================================
// RENDERIZADO GENERAL
// ========================================================
function renderAll() {
  renderCrochet();
  renderDiamond();
  renderReading();
}

// ========================================================
// 1. SECCIÓN CROCHET / TEJER
// ========================================================
function renderCrochet() {
  const container = document.getElementById('crochet-list');
  if (!container) return;

  if (appData.crochet.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <span class="empty-state-icon">🧶</span>
        <h4>Tu cesto de lanas está esperando</h4>
        <p>Añade un proyecto para empezar a tejer y llevar la cuenta de tus vueltas.</p>
        <button class="btn btn-primary" onclick="openNewProjectModal('crochet')">+ Empezar Primer Proyecto</button>
      </div>
    `;
    return;
  }

  container.innerHTML = appData.crochet.map(p => {
    const current = Number(p.current) || 0;
    const target = Number(p.target) || 0;
    const hasTarget = target > 0;
    const percent = hasTarget ? Math.min(100, Math.round((current / target) * 100)) : 0;
    const isFinished = hasTarget && current >= target;

    return `
      <div class="project-card" data-id="${p.id}">
        <div class="card-top-bar">
          <div class="card-title-group">
            <h3>${escapeHtml(p.name)}</h3>
            <span class="card-subtitle">
              ${isFinished ? '<span class="badge-complete">✨ ¡Completado!</span>' : 'En tus agujas'}
            </span>
          </div>
          <div class="card-actions">
            <button class="btn-delete-card" title="Eliminar proyecto" onclick="deleteProject('crochet', '${p.id}')">🗑️</button>
          </div>
        </div>

        <div class="chips-list">
          ${p.yarn ? `<span class="chip">🧶 ${escapeHtml(p.yarn)}</span>` : ''}
          ${p.color ? `<span class="chip">🎨 ${escapeHtml(p.color)}</span>` : ''}
          ${p.hook ? `<span class="chip">🪡 Aguja ${escapeHtml(p.hook)}</span>` : ''}
        </div>

        <!-- CONTADOR DE VUELTAS GIGANTE -->
        <div class="counter-box">
          <span class="counter-label">Vueltas Tejidas</span>
          <div class="counter-number-display" title="Toca para escribir el número directamente" onclick="promptDirectCount('crochet', '${p.id}', ${current})">
            ${current}
          </div>

          ${hasTarget ? `
            <div class="counter-goal-info">
              Meta: <strong>${target}</strong> vueltas (${percent}%)
            </div>
            <div class="progress-track">
              <div class="progress-fill fill-crochet" style="width: ${percent}%;"></div>
            </div>
          ` : `
            <div class="counter-goal-info">Sin meta fijada</div>
          `}

          <div class="counter-main-controls">
            <button class="btn-counter btn-decrement" onclick="updateCrochetCounter('${p.id}', -1)" aria-label="Restar una vuelta">
              − 1
            </button>
            <button class="btn-counter btn-increment" onclick="updateCrochetCounter('${p.id}', 1)" aria-label="Sumar una vuelta">
              + 1
            </button>
          </div>

          <div class="counter-sub-controls">
            <button class="btn-counter-small" onclick="updateCrochetCounter('${p.id}', 5)">+5</button>
            <button class="btn-counter-small" onclick="updateCrochetCounter('${p.id}', 10)">+10</button>
            <button class="btn-counter-small" onclick="setCrochetTarget('${p.id}')">🎯 Meta</button>
            <button class="btn-counter-small" onclick="resetCrochetCounter('${p.id}')">🔄 Reiniciar</button>
          </div>
        </div>

        <!-- NOTAS DEL PATRÓN -->
        <div class="notes-section">
          <div class="notes-label">
            <span>📝 Notas del Patrón</span>
            <small style="opacity:0.6;">(Auto-guardado)</small>
          </div>
          <textarea class="notes-textarea" placeholder="Apunta tus notas de puntos, vueltas o cambios de ovillo..." 
            onchange="updateNotes('crochet', '${p.id}', this.value)"
            oninput="debouncedNotes('crochet', '${p.id}', this.value)">${escapeHtml(p.notes || '')}</textarea>
        </div>
      </div>
    `;
  }).join('');
}

function updateCrochetCounter(id, delta) {
  const project = appData.crochet.find(p => p.id === id);
  if (!project) return;

  const newVal = Math.max(0, (Number(project.current) || 0) + delta);
  project.current = newVal;
  saveData();
  vibratePhone(delta > 0 ? 30 : 18);
  renderCrochet();
}

function resetCrochetCounter(id) {
  if (confirm('¿Deseas reiniciar el contador a cero vueltas?')) {
    const project = appData.crochet.find(p => p.id === id);
    if (project) {
      project.current = 0;
      saveData();
      vibratePhone(45);
      renderCrochet();
    }
  }
}

function setCrochetTarget(id) {
  const project = appData.crochet.find(p => p.id === id);
  if (!project) return;
  const currentTarget = project.target || '';
  const newTarget = prompt('Escribe el total de vueltas de tu meta (o deja vacío para quitar la meta):', currentTarget);
  if (newTarget !== null) {
    project.target = newTarget.trim() === '' ? 0 : Math.max(0, parseInt(newTarget, 10) || 0);
    saveData();
    renderCrochet();
  }
}

function promptDirectCount(hobby, id, current) {
  const entered = prompt('Escribe el número exacto:', current);
  if (entered !== null && entered.trim() !== '') {
    const num = Math.max(0, parseInt(entered, 10) || 0);
    if (hobby === 'crochet') {
      const p = appData.crochet.find(x => x.id === id);
      if (p) { p.current = num; saveData(); renderCrochet(); }
    } else if (hobby === 'reading') {
      const p = appData.reading.find(x => x.id === id);
      if (p) { p.currentPage = Math.min(p.totalPages || 9999, num); saveData(); renderReading(); }
    }
  }
}

// ========================================================
// 2. SECCIÓN DIAMOND PAINTING
// ========================================================
function renderDiamond() {
  const container = document.getElementById('diamond-list');
  if (!container) return;

  if (appData.diamond.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <span class="empty-state-icon">💎</span>
        <h4>Tu mesa de diamantes está despejada</h4>
        <p>Añade tu cuadro en curso para organizar tus diamantes y registrar tu avance.</p>
        <button class="btn btn-primary" onclick="openNewProjectModal('diamond')">+ Añadir Primer Cuadro</button>
      </div>
    `;
    return;
  }

  container.innerHTML = appData.diamond.map(p => {
    const progress = Math.min(100, Math.max(0, Number(p.progress) || 0));
    const isFinished = progress === 100;

    return `
      <div class="project-card" data-id="${p.id}">
        <div class="card-top-bar">
          <div class="card-title-group">
            <h3>${escapeHtml(p.name)}</h3>
            <span class="card-subtitle">
              ${isFinished ? '<span class="badge-complete">💎 ¡Terminado con brillo!</span>' : 'Lienzo en curso'}
            </span>
          </div>
          <div class="card-actions">
            <button class="btn-delete-card" title="Eliminar cuadro" onclick="deleteProject('diamond', '${p.id}')">🗑️</button>
          </div>
        </div>

        <div class="chips-list">
          ${p.size ? `<span class="chip">📏 Medidas: ${escapeHtml(p.size)}</span>` : ''}
          <span class="chip">✨ ${progress}% colocado</span>
        </div>

        <!-- CONTROL DE PROGRESO CON DESLIZADOR -->
        <div class="diamond-slider-box">
          <div class="progress-header">
            <span>Progreso del lienzo:</span>
            <strong>${progress}%</strong>
          </div>

          <div class="progress-track" style="margin-bottom: 14px;">
            <div class="progress-fill fill-diamond" style="width: ${progress}%;"></div>
          </div>

          <input type="range" class="range-slider" min="0" max="100" value="${progress}"
            oninput="handleDiamondSliderInput('${p.id}', this.value)"
            onchange="handleDiamondSliderChange('${p.id}', this.value)">

          <div class="diamond-quick-buttons">
            <button class="btn-diamond-step" onclick="updateDiamondProgress('${p.id}', -5)">-5%</button>
            <button class="btn-diamond-step" onclick="updateDiamondProgress('${p.id}', 5)">+5%</button>
            <button class="btn-diamond-step" onclick="updateDiamondProgress('${p.id}', 10)">+10%</button>
            <button class="btn-diamond-step" onclick="setDiamondProgress('${p.id}', 100)">💯 ¡Fin!</button>
          </div>
        </div>

        <!-- CÓDIGOS DMC Y DIAMANTES PENDIENTES -->
        <div class="drill-codes-box">
          <div class="drill-codes-label">🎨 Códigos DMC y colores pendientes:</div>
          <textarea class="drill-codes-input" rows="2" placeholder="Apunta números DMC, bolsitas que faltan..."
            onchange="updateDiamondCodes('${p.id}', this.value)"
            oninput="debouncedDiamondCodes('${p.id}', this.value)">${escapeHtml(p.codes || '')}</textarea>
        </div>

        <!-- NOTAS ADICIONALES -->
        <div class="notes-section">
          <div class="notes-label">
            <span>📝 Notas del Cuadro</span>
            <small style="opacity:0.6;">(Auto-guardado)</small>
          </div>
          <textarea class="notes-textarea" placeholder="Tipo de diamantes, técnica o detalles especiales..." 
            onchange="updateNotes('diamond', '${p.id}', this.value)"
            oninput="debouncedNotes('diamond', '${p.id}', this.value)">${escapeHtml(p.notes || '')}</textarea>
        </div>
      </div>
    `;
  }).join('');
}

function handleDiamondSliderInput(id, val) {
  const p = appData.diamond.find(x => x.id === id);
  if (p) {
    p.progress = parseInt(val, 10);
    const card = document.querySelector(`.project-card[data-id="${id}"]`);
    if (card) {
      const strong = card.querySelector('.progress-header strong');
      const fill = card.querySelector('.progress-fill');
      if (strong) strong.textContent = `${p.progress}%`;
      if (fill) fill.style.width = `${p.progress}%`;
    }
  }
}

function handleDiamondSliderChange(id, val) {
  const p = appData.diamond.find(x => x.id === id);
  if (p) {
    p.progress = parseInt(val, 10);
    saveData();
    vibratePhone(20);
    renderDiamond();
  }
}

function updateDiamondProgress(id, delta) {
  const p = appData.diamond.find(x => x.id === id);
  if (!p) return;
  p.progress = Math.min(100, Math.max(0, (Number(p.progress) || 0) + delta));
  saveData();
  vibratePhone(24);
  renderDiamond();
}

function setDiamondProgress(id, val) {
  const p = appData.diamond.find(x => x.id === id);
  if (!p) return;
  p.progress = val;
  saveData();
  vibratePhone(40);
  renderDiamond();
}

function updateDiamondCodes(id, value) {
  const p = appData.diamond.find(x => x.id === id);
  if (p) {
    p.codes = value;
    saveData();
  }
}

// ========================================================
// 3. SECCIÓN LECTURA & LIBROS
// ========================================================
function renderReading() {
  const container = document.getElementById('reading-list');
  if (!container) return;

  if (appData.reading.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <span class="empty-state-icon">📚</span>
        <h4>Tu estantería de lecturas está vacía</h4>
        <p>Añade tu libro actual para acompañarlo de una taza y ver tus avances.</p>
        <button class="btn btn-primary" onclick="openNewProjectModal('reading')">+ Añadir Primer Libro</button>
      </div>
    `;
    return;
  }

  container.innerHTML = appData.reading.map(p => {
    const cur = Number(p.currentPage) || 0;
    const total = Math.max(1, Number(p.totalPages) || 1);
    const percent = Math.min(100, Math.round((cur / total) * 100));
    const isFinished = cur >= total;

    return `
      <div class="project-card" data-id="${p.id}">
        <div class="card-top-bar">
          <div class="card-title-group">
            <h3>${escapeHtml(p.title)}</h3>
            <span class="card-subtitle">
              ${p.author ? 'de ' + escapeHtml(p.author) : ''} 
              ${isFinished ? '· <span class="badge-complete">📖 ¡Leído!</span>' : ''}
            </span>
          </div>
          <div class="card-actions">
            <button class="btn-delete-card" title="Eliminar libro" onclick="deleteProject('reading', '${p.id}')">🗑️</button>
          </div>
        </div>

        <!-- CAJA DE PROGRESO DE LECTURA -->
        <div class="reading-box">
          <div class="progress-header">
            <span>Página <strong>${cur}</strong> de <strong>${total}</strong></span>
            <strong>${percent}%</strong>
          </div>

          <div class="progress-track">
            <div class="progress-fill fill-reading" style="width: ${percent}%;"></div>
          </div>

          <div class="reading-page-controls">
            <div class="page-input-wrapper">
              <span>Pág:</span>
              <input type="number" class="page-input" min="0" max="${total}" value="${cur}"
                onchange="handleDirectPageChange('${p.id}', this.value, ${total})">
              <span class="page-total-label">/ ${total}</span>
            </div>

            <div class="reading-buttons-row">
              <button class="btn-reading-step" onclick="updateReadingPage('${p.id}', -1, ${total})">-1</button>
              <button class="btn-reading-step" onclick="updateReadingPage('${p.id}', 1, ${total})">+1</button>
              <button class="btn-reading-step" onclick="updateReadingPage('${p.id}', 5, ${total})">+5</button>
              <button class="btn-reading-step" onclick="updateReadingPage('${p.id}', 10, ${total})">+10</button>
            </div>
          </div>

          <div>
            <span style="font-size:0.82rem; font-weight:700; color:var(--text-muted);">Tu valoración:</span>
            <div class="star-rating" title="Toca las estrellas para calificar">
              ${[1, 2, 3, 4, 5].map(starNum => `
                <span class="star ${starNum <= (p.rating || 0) ? 'filled' : ''}" 
                  onclick="setBookRating('${p.id}', ${starNum})">★</span>
              `).join('')}
            </div>
          </div>
        </div>

        <!-- CITAS FAVORITAS -->
        <div class="notes-section">
          <div class="notes-label">
            <span>☕ Citas y Reflexiones</span>
            <small style="opacity:0.6;">(Auto-guardado)</small>
          </div>
          <textarea class="notes-textarea" placeholder="Escribe aquí las frases que te conmovieron o apuntes del libro..." 
            onchange="updateNotes('reading', '${p.id}', this.value)"
            oninput="debouncedNotes('reading', '${p.id}', this.value)">${escapeHtml(p.quotes || '')}</textarea>
        </div>
      </div>
    `;
  }).join('');
}

function handleDirectPageChange(id, val, total) {
  const p = appData.reading.find(x => x.id === id);
  if (p) {
    const page = Math.min(total, Math.max(0, parseInt(val, 10) || 0));
    p.currentPage = page;
    saveData();
    renderReading();
  }
}

function updateReadingPage(id, delta, total) {
  const p = appData.reading.find(x => x.id === id);
  if (!p) return;
  const current = Number(p.currentPage) || 0;
  p.currentPage = Math.min(total, Math.max(0, current + delta));
  saveData();
  vibratePhone(delta > 0 ? 25 : 15);
  renderReading();
}

function setBookRating(id, rating) {
  const p = appData.reading.find(x => x.id === id);
  if (!p) return;
  p.rating = (p.rating === rating) ? 0 : rating;
  saveData();
  vibratePhone(35);
  renderReading();
}

// ========================================================
// GESTIÓN DE NOTAS COMUNES CON AUTO-GUARDADO (DEBOUNCE)
// ========================================================
let debounceTimer = null;

function debouncedNotes(hobby, id, text) {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    updateNotes(hobby, id, text);
  }, 400);
}

function debouncedDiamondCodes(id, text) {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    updateDiamondCodes(id, text);
  }, 400);
}

function updateNotes(hobby, id, text) {
  const list = appData[hobby];
  if (!list) return;
  const item = list.find(x => x.id === id);
  if (item) {
    if (hobby === 'reading') {
      item.quotes = text;
    } else {
      item.notes = text;
    }
    saveData();
  }
}

// ========================================================
// ELIMINAR PROYECTOS CON CONFIRMACIÓN
// ========================================================
function deleteProject(hobby, id) {
  const nombres = {
    crochet: 'este proyecto de crochet',
    diamond: 'este cuadro de diamantes',
    reading: 'este libro'
  };

  if (confirm(`¿Estás segura de que quieres eliminar ${nombres[hobby] || 'este elemento'}?`)) {
    appData[hobby] = appData[hobby].filter(x => x.id !== id);
    saveData();
    vibratePhone(40);
    renderAll();
  }
}

// ========================================================
// MODALES Y FORMULARIOS
// ========================================================
function openNewProjectModal(hobby) {
  const modalId = `modal-${hobby}`;
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('open');
    const firstInput = modal.querySelector('input');
    if (firstInput) setTimeout(() => firstInput.focus(), 100);
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('open');
  }
}

// Cerrar modales si se hace clic fuera del contenido
document.querySelectorAll('.modal-overlay').forEach(overlay => {
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      overlay.classList.remove('open');
    }
  });
});

// Guardar nuevo proyecto de crochet
function handleSaveCrochet(e) {
  e.preventDefault();
  const name = document.getElementById('crochet-name').value.trim();
  const yarn = document.getElementById('crochet-yarn').value.trim();
  const color = document.getElementById('crochet-color').value.trim();
  const hook = document.getElementById('crochet-hook').value.trim();
  const target = parseInt(document.getElementById('crochet-target').value, 10) || 0;
  const notes = document.getElementById('crochet-notes').value.trim();

  if (!name) return;

  const newProject = {
    id: 'crochet-' + Date.now(),
    name,
    yarn,
    color,
    hook,
    current: 0,
    target,
    notes,
    createdAt: new Date().toISOString()
  };

  appData.crochet.unshift(newProject);
  saveData();
  renderCrochet();
  closeModal('modal-crochet');
  document.getElementById('form-crochet').reset();
  vibratePhone(30);
}

// Guardar nuevo cuadro de diamantes
function handleSaveDiamond(e) {
  e.preventDefault();
  const name = document.getElementById('diamond-name').value.trim();
  const size = document.getElementById('diamond-size').value.trim();
  const progress = Math.min(100, Math.max(0, parseInt(document.getElementById('diamond-initial-progress').value, 10) || 0));
  const codes = document.getElementById('diamond-codes').value.trim();
  const notes = document.getElementById('diamond-notes').value.trim();

  if (!name) return;

  const newProject = {
    id: 'diamond-' + Date.now(),
    name,
    size,
    progress,
    codes,
    notes,
    createdAt: new Date().toISOString()
  };

  appData.diamond.unshift(newProject);
  saveData();
  renderDiamond();
  closeModal('modal-diamond');
  document.getElementById('form-diamond').reset();
  vibratePhone(30);
}

// Guardar nuevo libro
function handleSaveReading(e) {
  e.preventDefault();
  const title = document.getElementById('reading-title').value.trim();
  const author = document.getElementById('reading-author').value.trim();
  const currentPage = Math.max(0, parseInt(document.getElementById('reading-current-page').value, 10) || 0);
  const totalPages = Math.max(1, parseInt(document.getElementById('reading-total-pages').value, 10) || 1);
  const rating = parseInt(document.getElementById('reading-rating').value, 10) || 0;
  const quotes = document.getElementById('reading-quotes').value.trim();

  if (!title) return;

  const newBook = {
    id: 'reading-' + Date.now(),
    title,
    author,
    currentPage: Math.min(totalPages, currentPage),
    totalPages,
    rating,
    quotes,
    createdAt: new Date().toISOString()
  };

  appData.reading.unshift(newBook);
  saveData();
  renderReading();
  closeModal('modal-reading');
  document.getElementById('form-reading').reset();
  resetStarRatingInput();
  vibratePhone(30);
}

function setupStarRatingInput() {
  const container = document.getElementById('new-book-rating');
  const hiddenInput = document.getElementById('reading-rating');
  if (!container || !hiddenInput) return;

  const stars = container.querySelectorAll('.star-input');
  stars.forEach(star => {
    star.addEventListener('click', () => {
      const val = parseInt(star.getAttribute('data-value'), 10);
      hiddenInput.value = val;
      stars.forEach(s => {
        const sVal = parseInt(s.getAttribute('data-value'), 10);
        if (sVal <= val) {
          s.classList.add('active');
        } else {
          s.classList.remove('active');
        }
      });
      vibratePhone(20);
    });
  });
}

function resetStarRatingInput() {
  const container = document.getElementById('new-book-rating');
  const hiddenInput = document.getElementById('reading-rating');
  if (container) {
    container.querySelectorAll('.star-input').forEach(s => s.classList.remove('active'));
  }
  if (hiddenInput) {
    hiddenInput.value = 0;
  }
}

// ========================================================
// COPIA DE SEGURIDAD
// ========================================================
function setupBackupModal() {
  const btn = document.getElementById('btnBackupModal');
  if (btn) {
    btn.addEventListener('click', () => {
      const modal = document.getElementById('modal-backup');
      if (modal) modal.classList.add('open');
    });
  }
}

function exportDataBackup() {
  const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(appData, null, 2));
  const downloadAnchor = document.createElement('a');
  const dateStamp = new Date().toISOString().slice(0, 10);
  downloadAnchor.setAttribute('href', dataStr);
  downloadAnchor.setAttribute('download', `copia-mis-hobbies-${dateStamp}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
}

function importDataBackup(event) {
  const file = event.target.files && event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const imported = JSON.parse(e.target.result);
      if (imported && (imported.crochet || imported.diamond || imported.reading)) {
        appData = {
          crochet: Array.isArray(imported.crochet) ? imported.crochet : [],
          diamond: Array.isArray(imported.diamond) ? imported.diamond : [],
          reading: Array.isArray(imported.reading) ? imported.reading : []
        };
        saveData();
        renderAll();
        closeModal('modal-backup');
        alert('¡Copia de seguridad restaurada con éxito!');
      } else {
        alert('El archivo no contiene un formato válido.');
      }
    } catch (err) {
      alert('Error al leer el archivo JSON.');
    }
  };
  reader.readAsText(file);
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
