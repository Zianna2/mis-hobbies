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
    icon: '🍄',
    iconFile: 'icon-autumn.svg',
    themeColor: '#F5EFEB',
    desc: 'Marrón Claro, Seta & Canela'
  },
  winter: {
    id: 'winter',
    name: 'Invierno Cozy',
    icon: '❄️',
    iconFile: 'icon-winter.svg',
    themeColor: '#F1F4F8',
    desc: 'Chocolate & Nieve'
  },
  spring: {
    id: 'spring',
    name: 'Primavera Dulce',
    icon: '🌸',
    iconFile: 'icon-spring.svg',
    themeColor: '#F4F7F2',
    desc: 'Matcha & Flores'
  },
  summer: {
    id: 'summer',
    name: 'Verano Soleado',
    icon: '🌻',
    iconFile: 'icon-summer.svg',
    themeColor: '#FCF8F0',
    desc: 'Girasol & Sol Dorado'
  }
};

let currentSeasonSetting = 'auto'; // 'auto', 'autumn', 'winter', 'spring', 'summer'
let activeSeasonKey = 'autumn';

// Estado global de la aplicación
let appData = {
  diary: {
    currentDraft: {
      title: '',
      text: '',
      mood: '☕',
      lastSaved: null
    },
    entries: []
  },
  crochet: [],
  diamond: [],
  reading: [],
  readingWishlist: [],
  plants: []
};

// Datos iniciales de ejemplo acogedores
const initialSampleData = {
  diary: {
    currentDraft: {
      title: 'Tarde de té y proyectos',
      text: 'Hoy me he preparado un té de canela y manzana. Qué bien sienta tomarse un ratito para respirar, encender una vela y avanzar unas vueltas en mi labor con calma.',
      mood: '☕',
      lastSaved: new Date().toISOString()
    },
    entries: [
      {
        id: 'sample-diary-1',
        date: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        dateFormatted: 'Ayer',
        title: 'Pequeñas alegrías',
        text: 'Pasear entre las hojas caídas y escuchar el crujido bajo las botas. La luz dorada del atardecer era mágica.',
        mood: '🍂'
      }
    ]
  },
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
      format: 'book',
      currentPage: 145,
      totalPages: 330,
      rating: 5,
      quotes: '«Nunca subestimes la gran importancia de las cosas pequeñas». Una lectura preciosa para una tarde tranquila.'
    },
    {
      id: 'sample-reading-2',
      title: 'El susurro del fuego',
      author: 'Javier Castillo',
      format: 'audiobook',
      audioProgress: 45,
      audioDuration: '10h 20m',
      rating: 5,
      quotes: 'Escuchado con auriculares mientras paseo al atardecer. La narración sonora y los giros te atrapan por completo.'
    }
  ],
  readingWishlist: [
    {
      id: 'sample-wish-1',
      title: 'La península de las casas vacías',
      author: 'David Uclés',
      genre: 'Ficción histórica / Realismo mágico',
      format: 'book',
      notes: 'Gran fenómeno en las librerías independientes de España. Una epopeya mágica, poética y conmovedora.',
      createdAt: new Date().toISOString()
    },
    {
      id: 'sample-wish-2',
      title: 'Por si un día volvemos',
      author: 'María Dueñas',
      genre: 'Ficción de época',
      format: 'book',
      notes: 'La nueva novela de la autora de El tiempo entre costuras; ideal para disfrutar con calma.',
      createdAt: new Date().toISOString()
    },
    {
      id: 'sample-wish-3',
      title: 'Un animal salvaje',
      author: 'Joël Dicker',
      genre: 'Thriller psicológico',
      format: 'audiobook',
      notes: 'Nº 1 en ventas en España; recomendadísimo para escuchar en audiolibro.',
      createdAt: new Date().toISOString()
    }
  ],
  plants: [
    {
      id: 'sample-plant-1',
      name: 'Monstera Deliciosa',
      variety: 'Costilla de Adán',
      location: 'Salón junto a la ventana',
      light: 'Luz indirecta brillante',
      waterFrequency: 7,
      lastWatered: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      fertilizeFrequency: 30,
      lastFertilized: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
      icon: '🪴',
      notes: 'Limpiar el polvo de las hojas con un paño húmedo. Regar cuando el sustrato superior esté seco al tacto.'
    },
    {
      id: 'sample-plant-2',
      name: 'Pothos Dorado',
      variety: 'Epipremnum aureum',
      location: 'Estantería de lecturas',
      light: 'Semisombra',
      waterFrequency: 5,
      lastWatered: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // ¡Toca regar hoy!
      fertilizeFrequency: 30,
      lastFertilized: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString(),
      icon: '🌿',
      notes: 'Planta muy agradecida y resistente. Crece con preciosas guías colgantes.'
    },
    {
      id: 'sample-plant-3',
      name: 'Ficus Lyrata',
      variety: 'Higuera de hoja de violín',
      location: 'Rincón de tejer',
      light: 'Luz brillante sin sol directo',
      waterFrequency: 10,
      lastWatered: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
      fertilizeFrequency: 30,
      lastFertilized: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
      icon: '🪴',
      notes: 'Evitar corrientes de aire frío y no moverla con frecuencia.'
    }
  ]
};

// ========================================================
// INICIALIZACIÓN
// ========================================================
document.addEventListener('DOMContentLoaded', () => {
  loadData();
  setupSeasonSystem();
  setupLunarAndQuoteWidget();
  initDiarySystem();
  setupNavigation();
  setupBackupModal();
  setupStarRatingInput();
  checkAppSecurityOnLaunch();
  renderAll();
});

// ========================================================
// RINCÓN COTTAGECORE: CICLO LUNAR Y PENSAMIENTOS
// ========================================================
const COTTAGECORE_QUOTES = [
  { text: "«No hay nada más poético que un libro abierto junto a una taza de té y una tarde de calma.»", author: "— Virginia Woolf" },
  { text: "«Declaro que después de todo no hay placer como la lectura. ¡Cuánto más pronto se cansa uno de cualquier cosa que de un libro!»", author: "— Jane Austen" },
  { text: "«Para viajar lejos, no hay mejor nave que un libro.»", author: "— Emily Dickinson" },
  { text: "«Tengo una pasión infinita por las cosas simples: una manta cálida, un té humeante y una labor que avanza entre las manos.»", author: "— Louisa May Alcott" },
  { text: "«Mantén tu amor hacia la naturaleza, porque es la verdadera forma de entender el arte.»", author: "— Vincent van Gogh" },
  { text: "«Tejer es darle forma al tiempo con las manos; cada vuelta es un minuto de paciencia y ternura.»", author: "— Proverbio artesano" },
  { text: "«Dime, ¿qué planeas hacer con tu única, salvaje y preciosa vida?»", author: "— Mary Oliver" },
  { text: "«Las cosas hechas a mano llevan dentro un latido del alma de quien las creó con paciencia.»", author: "— Tradición cottagecore" },
  { text: "«Brilla a tu propio ritmo; hasta la luna pasa por fases antes de estar completa y radiante.»", author: "— Sabiduría popular" },
  { text: "«El arte de crear con calma cura las prisas del mundo exterior.»", author: "— Pensamiento sereno" },
  { text: "«Un hogar acogedor no se mide en metros, sino en mantas suaves, libros leídos y proyectos con ilusión.»", author: "— Rincón cozy" }
];

let currentQuoteIndex = 0;

function setupLunarAndQuoteWidget() {
  // 1. Calcular ciclo lunar
  const moon = calculateMoonPhase(new Date());
  const emojiEl = document.getElementById('lunarEmoji');
  const nameEl = document.getElementById('lunarName');
  const illumEl = document.getElementById('lunarIllum');
  const counselEl = document.getElementById('lunarCounsel');

  if (emojiEl) emojiEl.textContent = moon.emoji;
  if (nameEl) nameEl.textContent = moon.name;
  if (illumEl) illumEl.textContent = `${moon.illumination}% iluminada`;
  if (counselEl) counselEl.textContent = moon.counsel;

  // 2. Frase del día según el día del año
  const today = new Date();
  currentQuoteIndex = (today.getDate() + today.getMonth() * 3) % COTTAGECORE_QUOTES.length;
  renderCurrentQuote();
}

function renderCurrentQuote() {
  const quote = COTTAGECORE_QUOTES[currentQuoteIndex];
  const textEl = document.getElementById('quoteText');
  const authorEl = document.getElementById('quoteAuthor');

  if (textEl && authorEl) {
    textEl.style.opacity = '0';
    setTimeout(() => {
      textEl.textContent = quote.text;
      authorEl.textContent = quote.author;
      textEl.style.transition = 'opacity 0.25s ease';
      textEl.style.opacity = '1';
    }, 120);
  }
}

function nextInspiringQuote() {
  currentQuoteIndex = (currentQuoteIndex + 1) % COTTAGECORE_QUOTES.length;
  renderCurrentQuote();
  vibratePhone(18);
}

// Cálculo astronómico del ciclo lunar
function calculateMoonPhase(date = new Date()) {
  const reference = new Date(Date.UTC(2000, 0, 6, 18, 14, 0));
  const diffDays = (date.getTime() - reference.getTime()) / (1000 * 60 * 60 * 24);
  const synodic = 29.53058867; // Duración media del mes lunar
  let phase = (diffDays % synodic) / synodic;
  if (phase < 0) phase += 1;

  // Porcentaje de iluminación (0% a 100%)
  const illumination = Math.round((1 - Math.cos(phase * 2 * Math.PI)) / 2 * 100);

  if (phase < 0.03 || phase >= 0.97) {
    return { name: 'Luna Nueva', emoji: '🌑', illumination, counsel: 'Semilla y comienzos. Tiempo ideal para ordenar tus lanas y soñar con nuevas labores.' };
  } else if (phase < 0.22) {
    return { name: 'Luna Creciente', emoji: '🌒', illumination, counsel: 'Fuerza que despierta. Excelente momento para montar los primeros puntos de tu labor.' };
  } else if (phase < 0.28) {
    return { name: 'Cuarto Creciente', emoji: '🌓', illumination, counsel: 'Crecimiento y constancia. Buen momento para mantener el ritmo de vueltas y páginas.' };
  } else if (phase < 0.47) {
    return { name: 'Gibosa Creciente', emoji: '🌔', illumination, counsel: 'La labor toma forma. Disfruta de los detalles minuciosos y del brillo de cada gema.' };
  } else if (phase < 0.53) {
    return { name: 'Luna Llena', emoji: '🌕', illumination, counsel: 'Plenitud y luz clara. Noche perfecta para admirar tu avance con una taza de té humeante.' };
  } else if (phase < 0.72) {
    return { name: 'Gibosa Menguante', emoji: '🌖', illumination, counsel: 'Gratitud y maduración. Saborea cada capítulo leído y cada lienzo casi completado.' };
  } else if (phase < 0.78) {
    return { name: 'Cuarto Menguante', emoji: '🌗', illumination, counsel: 'Soltar y serenar. Momento idóneo para rematar hebras, pulir detalles y relajarte.' };
  } else {
    return { name: 'Luna Menguante', emoji: '🌘', illumination, counsel: 'Descanso y recogimiento. Apaga las prisas, enciende una vela y déjate llevar.' };
  }
}

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
      if (!Array.isArray(appData.readingWishlist)) appData.readingWishlist = JSON.parse(JSON.stringify(initialSampleData.readingWishlist || []));
      if (!Array.isArray(appData.plants)) appData.plants = JSON.parse(JSON.stringify(initialSampleData.plants));
      if (!appData.diary) {
        appData.diary = JSON.parse(JSON.stringify(initialSampleData.diary));
      }
      if (!appData.diary.currentDraft) {
        appData.diary.currentDraft = { title: '', text: '', mood: '☕', lastSaved: null };
      }
      if (!Array.isArray(appData.diary.entries)) {
        appData.diary.entries = [];
      }
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

  // 4. Actualizar el icono exterior (favicon, apple-touch-icon y cabecera)
  updateAppSeasonalIcons(seasonInfo);

  // 5. Actualizar botones del modal
  document.querySelectorAll('.season-choice-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  const activeBtn = document.getElementById(`season-choice-${activeSeasonKey}`);
  if (activeBtn) activeBtn.classList.add('active');
}

function updateAppSeasonalIcons(seasonInfo) {
  // A. Actualizar icono del encabezado de la app
  const brandIcon = document.getElementById('appBrandIcon');
  if (brandIcon) {
    brandIcon.src = seasonInfo.iconFile;
    brandIcon.alt = `Icono ${seasonInfo.name}`;
  }

  // B. Actualizar favicon dinámico en el navegador
  const favicon = document.getElementById('dynamicFavicon');
  if (favicon) {
    favicon.href = seasonInfo.iconFile;
  }

  const appleIcon = document.getElementById('dynamicAppleIcon');
  if (appleIcon) {
    appleIcon.href = seasonInfo.iconFile;
  }

  // C. Renderizado dinámico a canvas para generar PNG de alta compatibilidad para Android/iOS
  try {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = function() {
      const canvas = document.createElement('canvas');
      canvas.width = 192;
      canvas.height = 192;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, 192, 192);
        ctx.drawImage(img, 0, 0, 192, 192);
        const dataUrl = canvas.toDataURL('image/png');
        if (favicon) favicon.href = dataUrl;
        if (appleIcon) appleIcon.href = dataUrl;
      }
    };
    img.src = seasonInfo.iconFile;
  } catch (err) {
    // Ignorar si canvas no está disponible
  }
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
  renderDiaryHistory();
  renderDiaryCalendar();
  renderCrochet();
  renderDiamond();
  renderReading();
  renderPlants();
  renderNatureHub();
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
// 3. SECCIÓN LECTURA & LIBROS, AUDIOLIBROS, WISHLIST Y TOP ESPAÑA
// ========================================================

let currentReadingSubnav = 'active'; // 'active', 'wishlist', 'recs'
let currentRecFilter = 'all';

function switchReadingSubnav(subview) {
  currentReadingSubnav = subview;

  // Actualizar botones de subnavegación
  document.querySelectorAll('.reading-subnav-btn').forEach(b => b.classList.remove('active'));
  const btn = document.getElementById(`btn-reading-sub-${subview}`);
  if (btn) btn.classList.add('active');

  // Actualizar sub-vistas
  const views = ['active', 'wishlist', 'recs'];
  views.forEach(v => {
    const el = document.getElementById(`reading-subview-${v}`);
    if (el) {
      if (v === subview) {
        el.style.display = 'block';
        el.classList.add('active');
      } else {
        el.style.display = 'none';
        el.classList.remove('active');
      }
    }
  });

  vibratePhone(16);
  renderReading();
}

function setReadingFormat(format) {
  const hiddenInput = document.getElementById('reading-format');
  if (hiddenInput) hiddenInput.value = format;

  const btnBook = document.getElementById('btn-format-book');
  const btnAudio = document.getElementById('btn-format-audiobook');
  const fieldsBook = document.getElementById('fields-book-pages');
  const fieldsAudio = document.getElementById('fields-audiobook-progress');
  const totalPagesInput = document.getElementById('reading-total-pages');

  if (format === 'audiobook') {
    if (btnAudio) btnAudio.classList.add('active');
    if (btnBook) btnBook.classList.remove('active');
    if (fieldsBook) fieldsBook.style.display = 'none';
    if (fieldsAudio) fieldsAudio.style.display = 'block';
    if (totalPagesInput) totalPagesInput.required = false;
  } else {
    if (btnBook) btnBook.classList.add('active');
    if (btnAudio) btnAudio.classList.remove('active');
    if (fieldsBook) fieldsBook.style.display = 'flex';
    if (fieldsAudio) fieldsAudio.style.display = 'none';
    if (totalPagesInput) totalPagesInput.required = true;
  }
}

function renderReading() {
  // 1. Actualizar contadores en la barra de pestañas
  const readingCountEl = document.getElementById('badge-reading-count');
  const wishlistCountEl = document.getElementById('badge-wishlist-count');
  if (readingCountEl) readingCountEl.textContent = (appData.reading || []).length;
  if (wishlistCountEl) wishlistCountEl.textContent = (appData.readingWishlist || []).length;

  // 2. Renderizar lecturas activas y audiolibros
  renderActiveReadings();

  // 3. Renderizar lista de deseos (libros por leer)
  renderReadingWishlist();

  // 4. Renderizar recomendaciones semanales de España
  renderSpainRecommendations();
}

function renderActiveReadings() {
  const container = document.getElementById('reading-list');
  if (!container) return;

  if (!appData.reading || appData.reading.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <span class="empty-state-icon">📚</span>
        <h4>Tu estantería de lecturas está vacía</h4>
        <p>Añade tu libro o audiolibro actual para acompañarlo de una taza caliente y registrar tus avances.</p>
        <button class="btn btn-primary" onclick="openNewProjectModal('reading')">+ Añadir Primer Libro / Audio</button>
      </div>
    `;
    return;
  }

  container.innerHTML = appData.reading.map(p => {
    const isAudio = p.format === 'audiobook';

    if (isAudio) {
      // --- RENDERIZADO DE AUDIOLIBRO (SIN PÁGINAS) ---
      const progress = Math.min(100, Math.max(0, Number(p.audioProgress) || 0));
      const isFinished = progress >= 100;

      return `
        <div class="project-card" data-id="${p.id}">
          <div class="card-top-bar">
            <div class="card-title-group">
              <h3>${escapeHtml(p.title)}</h3>
              <div class="card-subtitle">
                <span class="badge-format-pill audio">🎧 Audiolibro</span>
                ${p.author ? 'de ' + escapeHtml(p.author) : ''}
                ${isFinished ? '· <span class="badge-complete">🏆 ¡Escuchado!</span>' : ''}
              </div>
            </div>
            <div class="card-actions">
              <button class="btn-delete-card" title="Eliminar audiolibro" onclick="deleteProject('reading', '${p.id}')">🗑️</button>
            </div>
          </div>

          <!-- CAJA DE PROGRESO DE AUDIOLIBRO (SIN PÁGINAS) -->
          <div class="audiobook-box">
            <div class="audiobook-header">
              <span class="audiobook-badge-icon">🎧 Progreso de Escucha: <strong>${progress}%</strong></span>
              ${p.audioDuration ? `<span class="audiobook-duration-pill">⏱️ ${escapeHtml(p.audioDuration)}</span>` : ''}
            </div>

            <div class="progress-track" style="margin-bottom: 12px;">
              <div class="progress-fill fill-reading" style="width: ${progress}%;"></div>
            </div>

            <!-- Deslizador táctil suave para audio -->
            <input type="range" class="range-slider" min="0" max="100" value="${progress}"
              oninput="handleAudioSliderInput('${p.id}', this.value)"
              onchange="handleAudioSliderChange('${p.id}', this.value)">

            <!-- Botones de avance de audio sin páginas -->
            <div class="audio-quick-buttons">
              <button class="btn-audio-step" onclick="updateAudiobookProgress('${p.id}', -10)">-10%</button>
              <button class="btn-audio-step" onclick="updateAudiobookProgress('${p.id}', 10)">+10%</button>
              <button class="btn-audio-step" onclick="updateAudiobookProgress('${p.id}', 25)">+25%</button>
              <button class="btn-audio-step" onclick="setAudiobookProgress('${p.id}', 100)">💯 ¡Terminado!</button>
            </div>

            <!-- Valoración con estrellas -->
            <div style="margin-top: 14px;">
              <span style="font-size:0.82rem; font-weight:700; color:var(--text-muted);">Tu valoración de la narración:</span>
              <div class="star-rating" title="Toca las estrellas para calificar">
                ${[1, 2, 3, 4, 5].map(starNum => `
                  <span class="star ${starNum <= (p.rating || 0) ? 'filled' : ''}" 
                    onclick="setBookRating('${p.id}', ${starNum})">★</span>
                `).join('')}
              </div>
            </div>
          </div>

          <!-- REFLEXIONES / CITAS -->
          <div class="notes-section">
            <div class="notes-label">
              <span>☕ Citas y Reflexiones de la Escucha</span>
              <small style="opacity:0.6;">(Auto-guardado)</small>
            </div>
            <textarea class="notes-textarea" placeholder="Frases hermosas, reflexiones sobre la voz narradora..." 
              onchange="updateNotes('reading', '${p.id}', this.value)"
              oninput="debouncedNotes('reading', '${p.id}', this.value)">${escapeHtml(p.quotes || '')}</textarea>
          </div>
        </div>
      `;
    } else {
      // --- RENDERIZADO DE LIBRO FÍSICO / EBOOK (CON PÁGINAS) ---
      const cur = Number(p.currentPage) || 0;
      const total = Math.max(1, Number(p.totalPages) || 1);
      const percent = Math.min(100, Math.round((cur / total) * 100));
      const isFinished = cur >= total;

      return `
        <div class="project-card" data-id="${p.id}">
          <div class="card-top-bar">
            <div class="card-title-group">
              <h3>${escapeHtml(p.title)}</h3>
              <div class="card-subtitle">
                <span class="badge-format-pill book">📖 Libro</span>
                ${p.author ? 'de ' + escapeHtml(p.author) : ''} 
                ${isFinished ? '· <span class="badge-complete">📖 ¡Leído!</span>' : ''}
              </div>
            </div>
            <div class="card-actions">
              <button class="btn-delete-card" title="Eliminar libro" onclick="deleteProject('reading', '${p.id}')">🗑️</button>
            </div>
          </div>

          <!-- CAJA DE PROGRESO DE PÁGINAS -->
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
    }
  }).join('');
}

// Handlers de progreso de audiolibro
function handleAudioSliderInput(id, val) {
  const p = appData.reading.find(x => x.id === id);
  if (p) {
    p.audioProgress = parseInt(val, 10);
    const card = document.querySelector(`.project-card[data-id="${id}"]`);
    if (card) {
      const strong = card.querySelector('.audiobook-badge-icon strong');
      const fill = card.querySelector('.progress-fill');
      if (strong) strong.textContent = `${p.audioProgress}%`;
      if (fill) fill.style.width = `${p.audioProgress}%`;
    }
  }
}

function handleAudioSliderChange(id, val) {
  const p = appData.reading.find(x => x.id === id);
  if (p) {
    p.audioProgress = parseInt(val, 10);
    saveData();
    vibratePhone(20);
    renderActiveReadings();
  }
}

function updateAudiobookProgress(id, delta) {
  const p = appData.reading.find(x => x.id === id);
  if (!p) return;
  p.audioProgress = Math.min(100, Math.max(0, (Number(p.audioProgress) || 0) + delta));
  saveData();
  vibratePhone(22);
  renderActiveReadings();
}

function setAudiobookProgress(id, val) {
  const p = appData.reading.find(x => x.id === id);
  if (!p) return;
  p.audioProgress = val;
  saveData();
  vibratePhone(40);
  renderActiveReadings();
}

// ========================================================
// RENDERIZADO: LISTA DE DESEOS (LIBROS POR LEER)
// ========================================================
function renderReadingWishlist() {
  const container = document.getElementById('reading-wishlist-container');
  if (!container) return;

  const list = appData.readingWishlist || [];
  if (list.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <span class="empty-state-icon">🔖</span>
        <h4>Tu lista de libros por leer está vacía</h4>
        <p>Apunta aquí libros que quieres leer o añade los más leídos de España desde la pestaña «Top España».</p>
        <button class="btn btn-primary" onclick="openWishlistModal()">+ Añadir a Por Leer</button>
      </div>
    `;
    return;
  }

  container.innerHTML = list.map(item => {
    const isAudio = item.format === 'audiobook';
    const isIndifferent = item.format === 'any';
    let formatTag = '<span class="badge-format-pill book">📖 Papel / eBook</span>';
    if (isAudio) formatTag = '<span class="badge-format-pill audio">🎧 Audiolibro</span>';
    if (isIndifferent) formatTag = '<span class="badge-format-pill" style="background:#FFF8E7; color:#B7791F; border:1px solid #F6E05E;">✨ Papel o Audio</span>';

    return `
      <div class="wishlist-card" data-id="${item.id}">
        <div class="wishlist-card-content">
          <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:10px;">
            <div>
              <h3 class="wishlist-book-title">${escapeHtml(item.title)}</h3>
              <div class="wishlist-book-author">${item.author ? 'de ' + escapeHtml(item.author) : ''}</div>
            </div>
            <button class="btn-delete-card" title="Eliminar de la lista" onclick="deleteWishlistItem('${item.id}')">🗑️</button>
          </div>

          <div class="wishlist-tags-row">
            ${formatTag}
            ${item.genre ? `<span class="chip">🏷️ ${escapeHtml(item.genre)}</span>` : ''}
          </div>

          ${item.notes ? `
            <div class="wishlist-notes-box">
              <strong>Motivo / Nota:</strong> ${escapeHtml(item.notes)}
            </div>
          ` : ''}
        </div>

        <div class="wishlist-actions-row">
          <button class="btn-start-reading" onclick="startReadingFromWishlist('${item.id}')">
            <span>${isAudio ? '🎧' : '📖'}</span>
            <span>Comenzar a ${isAudio ? 'escuchar' : 'leer'} ahora</span>
          </button>
        </div>
      </div>
    `;
  }).join('');
}

function openWishlistModal() {
  document.getElementById('form-wishlist').reset();
  const modal = document.getElementById('modal-wishlist');
  if (modal) {
    modal.classList.add('open');
    const first = modal.querySelector('input');
    if (first) setTimeout(() => first.focus(), 100);
  }
}

function handleSaveWishlist(e) {
  e.preventDefault();
  const title = document.getElementById('wishlist-title').value.trim();
  const author = document.getElementById('wishlist-author').value.trim();
  const genre = document.getElementById('wishlist-genre').value.trim();
  const format = document.getElementById('wishlist-format').value || 'book';
  const notes = document.getElementById('wishlist-notes').value.trim();

  if (!title) return;

  const newItem = {
    id: 'wish-' + Date.now(),
    title,
    author,
    genre,
    format,
    notes,
    createdAt: new Date().toISOString()
  };

  if (!Array.isArray(appData.readingWishlist)) appData.readingWishlist = [];
  appData.readingWishlist.unshift(newItem);
  saveData();
  renderReading();
  closeModal('modal-wishlist');
  vibratePhone(30);
}

function deleteWishlistItem(id) {
  if (confirm('¿Deseas quitar este libro de tu lista de libros por leer?')) {
    appData.readingWishlist = (appData.readingWishlist || []).filter(x => x.id !== id);
    saveData();
    vibratePhone(30);
    renderReading();
  }
}

function startReadingFromWishlist(id) {
  const item = (appData.readingWishlist || []).find(x => x.id === id);
  if (!item) return;

  const isAudio = item.format === 'audiobook';

  const newReading = {
    id: 'reading-' + Date.now(),
    title: item.title,
    author: item.author,
    format: isAudio ? 'audiobook' : 'book',
    rating: 0,
    quotes: item.notes ? `Nota inicial: ${item.notes}` : '',
    createdAt: new Date().toISOString()
  };

  if (isAudio) {
    newReading.audioProgress = 0;
    newReading.audioDuration = '';
  } else {
    newReading.currentPage = 0;
    newReading.totalPages = 350; // valor inicial editable
  }

  // Añadir a lecturas activas y quitar de pendientes
  appData.reading.unshift(newReading);
  appData.readingWishlist = appData.readingWishlist.filter(x => x.id !== id);
  saveData();

  // Cambiar a la pestaña de lecturas activas
  switchReadingSubnav('active');
  vibratePhone(45);
}

// ========================================================
// RENDERIZADO: RECOMENDACIONES SEMANALES DE ESPAÑA
// ========================================================
const SPAIN_BESTSELLERS_DATABASE = [
  {
    id: 'rec-1',
    title: 'La península de las casas vacías',
    author: 'David Uclés',
    genreCategory: 'historia',
    genre: 'Ficción Histórica & Realismo Mágico',
    rankText: '🏆 Fenómeno Librerías Independientes (CEGAL)',
    synopsis: 'Una descomunal saga familiar en un pueblo de Jaén durante la Guerra Civil española narrada con un realismo mágico poético y desbordante. Considerada por críticos y lectores una de las novelas del año en España.',
    hasBook: true,
    hasAudio: true
  },
  {
    id: 'rec-2',
    title: 'Por si un día volvemos',
    author: 'María Dueñas',
    genreCategory: 'historia',
    genre: 'Narrativa Emocional & Época',
    rankText: '✨ Gran Lanzamiento Superventas',
    synopsis: 'La esperadísima novela de la autora de «El tiempo entre costuras». Una emocionante historia sobre el exilio, la resiliencia femenina, la identidad y las segundas oportunidades en tiempos convulsos.',
    hasBook: true,
    hasAudio: true
  },
  {
    id: 'rec-3',
    title: 'El susurro del fuego',
    author: 'Javier Castillo',
    genreCategory: 'thriller',
    genre: 'Novela Negra & Suspense Psicológico',
    rankText: '🔥 Nº 1 en Suspense en España',
    synopsis: 'El escritor malagueño superventas regresa con una trama asfixiante de secretos del pasado y giros constantes que no permiten soltar el libro ni pausar el audio.',
    hasBook: true,
    hasAudio: true
  },
  {
    id: 'rec-4',
    title: 'Alas de ónix (Empíreo 3)',
    author: 'Rebecca Yarros',
    genreCategory: 'cozy',
    genre: 'Romantasy & Aventura Épica',
    rankText: '🐉 Éxito Mundial en Librerías de España',
    synopsis: 'El fenómeno de fantasía, jinetes de dragón y romance que arrasa en Casa del Libro y Fnac. Una lectura trepidante de lealtades puestas a prueba y pasiones intensas.',
    hasBook: true,
    hasAudio: true
  },
  {
    id: 'rec-5',
    title: 'Un animal salvaje',
    author: 'Joël Dicker',
    genreCategory: 'thriller',
    genre: 'Thriller Psicológico',
    rankText: '🔍 Top Ficción Traducida en España',
    synopsis: 'Ginebra, 2022. Dos atracadores planean el asalto a una gran joyería mientras las apariencias de una familia perfecta comienzan a resquebrajarse sin remedio.',
    hasBook: true,
    hasAudio: true
  },
  {
    id: 'rec-6',
    title: 'La isla de la mujer dormida',
    author: 'Arturo Pérez-Reverte',
    genreCategory: 'historia',
    genre: 'Aventura, Mar y Espías',
    rankText: '🌊 Top Ventas Ficción Contemporánea',
    synopsis: 'En una pequeña isla griega del mar Egeo en 1937, una misión clandestina de torpederos y espías se cruza con un triángulo de pasiones y honor.',
    hasBook: true,
    hasAudio: true
  },
  {
    id: 'rec-7',
    title: 'La asistenta',
    author: 'Freida McFadden',
    genreCategory: 'thriller',
    genre: 'Thriller Doméstico Adictivo',
    rankText: '🎧 El Audiolibro Más Escuchado',
    synopsis: 'Millie consigue trabajo como asistenta interna en la mansión de la familia Winchester. Pero la puerta del ático solo se cierra por fuera... Un éxito absoluto boca a boca.',
    hasBook: true,
    hasAudio: true
  },
  {
    id: 'rec-8',
    title: 'Blackwater (Saga Fluvial)',
    author: 'Michael McDowell',
    genreCategory: 'cozy',
    genre: 'Saga Familiar & Gótico Sureño',
    rankText: '🍂 El Fenómeno Editorial del Año',
    synopsis: 'La crecida del río en Perdido, Alabama, y la misteriosa llegada de Elinor Dammert. Una saga matriarcal hipnótica publicada en elegantes volúmenes que agotaron tiradas.',
    hasBook: true,
    hasAudio: true
  },
  {
    id: 'rec-9',
    title: 'Victoria',
    author: 'Paloma Sánchez-Garnica',
    genreCategory: 'historia',
    genre: 'Drama Histórico & Superación',
    rankText: '🏆 Premio Planeta de Novela',
    synopsis: 'Berlín tras la Segunda Guerra Mundial y el Nueva York de los años cincuenta. La lucha de una mujer por proteger a su familia frente al espionaje y la intolerancia.',
    hasBook: true,
    hasAudio: true
  },
  {
    id: 'rec-10',
    title: 'Las que no duermen: NASH',
    author: 'Dolores Redondo',
    genreCategory: 'thriller',
    genre: 'Misterio & Mitología Vasconavarra',
    rankText: '🌲 Top Suspense en el Norte',
    synopsis: 'La prestigiosa psicóloga forense Nash Elizondo investiga una muerte en los valles nevados de Navarra, descubriendo secretos de brujería y crímenes sepultados.',
    hasBook: true,
    hasAudio: true
  },
  {
    id: 'rec-11',
    title: 'Donde todo brilla',
    author: 'Alice Kellen',
    genreCategory: 'cozy',
    genre: 'Romance Cálido & Sentimiento',
    rankText: '☕ Favorito Cozy & Emoción',
    synopsis: 'La infancia compartida en un pequeño pueblo costero de Maine, la pesca de langostas, el olor a madera y salitre, y un amor que madura con el paso de los años.',
    hasBook: true,
    hasAudio: true
  },
  {
    id: 'rec-12',
    title: 'Los tres mundos (Serie César 3)',
    author: 'Santiago Posteguillo',
    genreCategory: 'historia',
    genre: 'Novela Histórica Romana',
    rankText: '🏛️ Bestseller Histórico en España',
    synopsis: 'Santiago Posteguillo nos sumerge con su pulso magistral en los años decisivos de Julio César entre la Galia, Roma y el destino del Imperio.',
    hasBook: true,
    hasAudio: true
  },
  {
    id: 'rec-13',
    title: 'El clan',
    author: 'Carmen Mola',
    genreCategory: 'thriller',
    genre: 'Novela Negra Española',
    rankText: '⚡ Cierre de la Saga Elena Blanco',
    synopsis: 'El impactante desenlace de la serie policíaca más vendida en España. Ritmo vertiginoso, corrupción al más alto nivel y giros inesperados.',
    hasBook: true,
    hasAudio: true
  },
  {
    id: 'rec-14',
    title: 'La sociedad de la nieve',
    author: 'Pablo Vierci',
    genreCategory: 'historia',
    genre: 'Superación Humana & Hermandad',
    rankText: '🏔️ Gran Éxito Testimonial',
    synopsis: 'El relato definitivo y profundamente conmovedor de los dieciséis supervivientes del accidente de los Andes, convertidos en una sociedad de afecto y entrega.',
    hasBook: true,
    hasAudio: true
  },
  {
    id: 'rec-15',
    title: 'En agosto nos vemos',
    author: 'Gabriel García Márquez',
    genreCategory: 'cozy',
    genre: 'Literatura & Deseo',
    rankText: '🌺 Joya Póstuma del Nobel',
    synopsis: 'Cada mes de agosto, Ana Magdalena Bach viaja en transbordador hasta la isla donde está enterrada su madre. Una hermosa meditación sobre la libertad y la madurez.',
    hasBook: true,
    hasAudio: true
  },
  {
    id: 'rec-16',
    title: 'La biblioteca de la medianoche',
    author: 'Matt Haig',
    genreCategory: 'cozy',
    genre: 'Ficción Reflexiva & Esperanza',
    rankText: '☕ Un Clásico Moderno en España',
    synopsis: 'Entre la vida y la muerte hay una biblioteca donde cada libro ofrece la oportunidad de vivir otra vida que pudiste haber elegido. Profundamente reconfortante.',
    hasBook: true,
    hasAudio: true
  }
];

function getWeekNumber(d = new Date()) {
  const target = new Date(d.valueOf());
  const dayNr = (d.getDay() + 6) % 7;
  target.setDate(target.getDate() - dayNr + 3);
  const firstThursday = target.valueOf();
  target.setMonth(0, 1);
  if (target.getDay() !== 4) {
    target.setMonth(0, 1 + ((4 - target.getDay()) + 7) % 7);
  }
  return 1 + Math.ceil((firstThursday - target) / 604800000);
}

function renderSpainRecommendations() {
  const container = document.getElementById('reading-recs-container');
  const tagEl = document.getElementById('recsWeekTag');
  if (!container) return;

  const now = new Date();
  const weekNum = getWeekNumber(now);
  const year = now.getFullYear();

  if (tagEl) {
    tagEl.textContent = `Semana ${weekNum} · ${year}`;
  }

  // Filtrado de recomendaciones
  let items = SPAIN_BESTSELLERS_DATABASE;
  if (currentRecFilter === 'thriller') {
    items = items.filter(x => x.genreCategory === 'thriller');
  } else if (currentRecFilter === 'historia') {
    items = items.filter(x => x.genreCategory === 'historia');
  } else if (currentRecFilter === 'cozy') {
    items = items.filter(x => x.genreCategory === 'cozy');
  } else if (currentRecFilter === 'audio') {
    items = items.filter(x => x.hasAudio);
  }

  // Rotación semanal dinámica: destaca los libros según la semana del año
  const sorted = [...items].sort((a, b) => {
    const idxA = (SPAIN_BESTSELLERS_DATABASE.indexOf(a) + weekNum) % SPAIN_BESTSELLERS_DATABASE.length;
    const idxB = (SPAIN_BESTSELLERS_DATABASE.indexOf(b) + weekNum) % SPAIN_BESTSELLERS_DATABASE.length;
    return idxA - idxB;
  });

  const wishlistTitles = (appData.readingWishlist || []).map(x => x.title.toLowerCase().trim());
  const readingTitles = (appData.reading || []).map(x => x.title.toLowerCase().trim());

  container.innerHTML = sorted.map(book => {
    const isAlreadyInWish = wishlistTitles.includes(book.title.toLowerCase().trim());
    const isAlreadyReading = readingTitles.includes(book.title.toLowerCase().trim());

    let btnText = '+ Añadir a mi lista 🔖';
    let btnClass = 'btn-add-rec';

    if (isAlreadyInWish) {
      btnText = '✓ En tus pendientes 🔖';
      btnClass = 'btn-add-rec added';
    } else if (isAlreadyReading) {
      btnText = '📖 En tus lecturas actuales';
      btnClass = 'btn-add-rec added';
    }

    return `
      <div class="rec-card" data-rec-id="${book.id}">
        <span class="rec-rank-ribbon">${escapeHtml(book.rankText)}</span>
        <h3 class="rec-title">${escapeHtml(book.title)}</h3>
        <div class="rec-author">de <strong>${escapeHtml(book.author)}</strong> · <em>${escapeHtml(book.genre)}</em></div>
        <p class="rec-synopsis">${escapeHtml(book.synopsis)}</p>

        <div class="rec-meta-row">
          <div class="rec-badges-list">
            ${book.hasBook ? '<span class="badge-format-pill book">📖 Papel / eBook</span>' : ''}
            ${book.hasAudio ? '<span class="badge-format-pill audio">🎧 Audiolibro</span>' : ''}
          </div>
          <button class="${btnClass}" onclick="addToWishlistFromRec('${book.id}')" ${isAlreadyInWish || isAlreadyReading ? 'title="Ya está guardado"' : ''}>
            ${btnText}
          </button>
        </div>
      </div>
    `;
  }).join('');
}

function filterRecommendations(category, btn) {
  currentRecFilter = category;
  document.querySelectorAll('.recs-filter-bar .filter-pill').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  renderSpainRecommendations();
  vibratePhone(15);
}

function addToWishlistFromRec(bookId) {
  const book = SPAIN_BESTSELLERS_DATABASE.find(x => x.id === bookId);
  if (!book) return;

  if (!Array.isArray(appData.readingWishlist)) appData.readingWishlist = [];

  const exists = appData.readingWishlist.some(x => x.title.toLowerCase().trim() === book.title.toLowerCase().trim());
  if (exists) {
    alert(`«${book.title}» ya está en tu lista de libros por leer.`);
    return;
  }

  const newWish = {
    id: 'wish-' + Date.now(),
    title: book.title,
    author: book.author,
    genre: book.genre,
    format: book.hasAudio ? 'any' : 'book',
    notes: `Recomendado en el Top de España: ${book.rankText}`,
    createdAt: new Date().toISOString()
  };

  appData.readingWishlist.unshift(newWish);
  saveData();
  vibratePhone(40);
  renderReading();
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
// 4. SECCIÓN CUIDADO DE MIS PLANTAS (🪴)
// ========================================================
let currentPlantFilter = 'all';

function renderPlants() {
  const container = document.getElementById('plants-list');
  if (!container) return;

  if (!Array.isArray(appData.plants)) appData.plants = [];

  // Calcular estadísticas para los contadores superiores
  const now = Date.now();
  let countWaterNeeded = 0;
  let countOk = 0;

  appData.plants.forEach(p => {
    const daysSinceWatered = Math.max(0, Math.floor((now - new Date(p.lastWatered).getTime()) / (1000 * 60 * 60 * 24)));
    const freq = Math.max(1, parseInt(p.waterFrequency, 10) || 7);
    const daysRemaining = freq - daysSinceWatered;
    if (daysRemaining <= 0) {
      countWaterNeeded++;
    } else {
      countOk++;
    }
  });

  const statTotal = document.getElementById('stat-total-plants');
  const statWater = document.getElementById('stat-water-plants');
  const statOk = document.getElementById('stat-ok-plants');

  if (statTotal) statTotal.textContent = appData.plants.length;
  if (statWater) statWater.textContent = countWaterNeeded;
  if (statOk) statOk.textContent = countOk;

  // Filtrado
  let filteredPlants = appData.plants;
  if (currentPlantFilter === 'water') {
    filteredPlants = appData.plants.filter(p => {
      const daysSinceWatered = Math.max(0, Math.floor((now - new Date(p.lastWatered).getTime()) / (1000 * 60 * 60 * 24)));
      const freq = Math.max(1, parseInt(p.waterFrequency, 10) || 7);
      return (freq - daysSinceWatered) <= 0;
    });
  } else if (currentPlantFilter === 'fertilize') {
    filteredPlants = appData.plants.filter(p => {
      if (!p.lastFertilized) return true;
      const daysSince = Math.max(0, Math.floor((now - new Date(p.lastFertilized).getTime()) / (1000 * 60 * 60 * 24)));
      return daysSince >= (p.fertilizeFrequency || 30);
    });
  } else if (currentPlantFilter === 'ok') {
    filteredPlants = appData.plants.filter(p => {
      const daysSinceWatered = Math.max(0, Math.floor((now - new Date(p.lastWatered).getTime()) / (1000 * 60 * 60 * 24)));
      const freq = Math.max(1, parseInt(p.waterFrequency, 10) || 7);
      return (freq - daysSinceWatered) > 0;
    });
  }

  if (filteredPlants.length === 0) {
    if (appData.plants.length === 0) {
      container.innerHTML = `
        <div class="empty-state">
          <span class="empty-state-icon">🪴</span>
          <h4>Tu jardín interior está por florecer</h4>
          <p>Añade tus plantas para no olvidar cuándo regarlas ni abonarlas.</p>
          <button class="btn btn-primary" onclick="openNewPlantModal()">+ Añadir Primera Planta</button>
        </div>
      `;
    } else {
      container.innerHTML = `
        <div class="empty-state" style="padding: 28px 18px;">
          <span class="empty-state-icon">✨</span>
          <h4>¡No hay plantas en esta categoría!</h4>
          <p>Todas tus plantas están en orden o no coinciden con este filtro.</p>
          <button class="btn btn-secondary" onclick="filterPlants('all', document.querySelector('.plants-filter-bar button'))">Ver todas las plantas</button>
        </div>
      `;
    }
    return;
  }

  container.innerHTML = filteredPlants.map(p => {
    const daysSinceWatered = Math.max(0, Math.floor((now - new Date(p.lastWatered).getTime()) / (1000 * 60 * 60 * 24)));
    const freq = Math.max(1, parseInt(p.waterFrequency, 10) || 7);
    const daysRemaining = freq - daysSinceWatered;

    // Hidratación en porcentaje (100% recién regada, 0% o negativo necesita agua)
    const hydrationPct = Math.max(0, Math.min(100, Math.round(((freq - daysSinceWatered) / freq) * 100)));
    let barClass = '';
    if (hydrationPct <= 25) barClass = 'danger';
    else if (hydrationPct <= 50) barClass = 'warning';

    // Badge y texto de estado de riego
    let statusBadge = '';
    let statusText = '';
    if (daysRemaining < 0) {
      const daysLate = Math.abs(daysRemaining);
      statusBadge = `<span class="badge-water-late">🚨 Riego atrasado (${daysLate}d)</span>`;
      statusText = `¡Atrasado ${daysLate} ${daysLate === 1 ? 'día' : 'días'}!`;
    } else if (daysRemaining === 0) {
      statusBadge = `<span class="badge-water-needed">💧 ¡Toca regar hoy!</span>`;
      statusText = 'El sustrato ya pide agua hoy.';
    } else if (daysSinceWatered === 0) {
      statusBadge = `<span class="badge-water-ok">✨ Regada hoy</span>`;
      statusText = `Próximo riego en ${daysRemaining} ${daysRemaining === 1 ? 'día' : 'días'}.`;
    } else {
      statusBadge = `<span class="badge-water-ok">🌿 En fecha</span>`;
      statusText = `Próximo riego en ${daysRemaining} ${daysRemaining === 1 ? 'día' : 'días'}.`;
    }

    // Texto de último riego
    let lastWateredText = 'Hoy';
    if (daysSinceWatered === 1) lastWateredText = 'Ayer';
    else if (daysSinceWatered > 1) lastWateredText = `Hace ${daysSinceWatered} días`;

    // Estado del abono
    const fertilizeFreq = p.fertilizeFrequency || 30;
    const daysSinceFertilized = p.lastFertilized 
      ? Math.max(0, Math.floor((now - new Date(p.lastFertilized).getTime()) / (1000 * 60 * 60 * 24)))
      : 999;
    const needsFertilizer = daysSinceFertilized >= fertilizeFreq;
    let fertilizeText = '';
    if (daysSinceFertilized === 0) fertilizeText = 'Abonada hoy ✨';
    else if (daysSinceFertilized > 365) fertilizeText = 'Sin abonar aún';
    else fertilizeText = `Hace ${daysSinceFertilized}d (cada ${fertilizeFreq}d)`;

    return `
      <div class="plant-card" data-id="${p.id}">
        <div class="card-top-bar" style="margin-bottom:8px;">
          <div class="plant-card-header" style="margin-bottom:0; flex:1;">
            <div class="plant-avatar">
              ${escapeHtml(p.icon || '🪴')}
            </div>
            <div class="plant-title-info">
              <h3 class="plant-name">${escapeHtml(p.name)}</h3>
              ${p.variety ? `<div class="plant-variety">${escapeHtml(p.variety)}</div>` : ''}
              <div class="plant-tags">
                ${p.location ? `<span class="plant-tag">📍 ${escapeHtml(p.location)}</span>` : ''}
                ${p.light ? `<span class="plant-tag">☀️ ${escapeHtml(p.light)}</span>` : ''}
                <span class="plant-tag">💧 Cada ${freq} días</span>
              </div>
            </div>
          </div>
          <div class="card-actions">
            <button class="btn-delete-card" title="Editar cuidados" onclick="editPlant('${p.id}')">✏️</button>
            <button class="btn-delete-card" title="Eliminar planta" onclick="deletePlant('${p.id}')">🗑️</button>
          </div>
        </div>

        <!-- Caja de hidratación y riego -->
        <div class="water-status-box">
          <div class="water-status-header">
            <span class="water-status-title">💧 Nivel de Hidratación</span>
            ${statusBadge}
          </div>

          <div class="hydration-bar-container">
            <div class="hydration-bar-track">
              <div class="hydration-bar-fill ${barClass}" style="width: ${hydrationPct}%;"></div>
            </div>
          </div>

          <div class="water-dates-grid">
            <span>Último riego: <strong>${lastWateredText}</strong></span>
            <span><strong>${statusText}</strong></span>
          </div>

          <!-- Información de abono -->
          <div class="fertilize-info-line">
            <span>🌿 Abono: <strong>${fertilizeText}</strong></span>
            ${needsFertilizer ? '<span style="color:#C05621; font-weight:700; font-size:0.75rem;">¡Toca abonar!</span>' : '<span style="color:#276749; font-weight:700; font-size:0.75rem;">Al día</span>'}
          </div>
        </div>

        <!-- Botones táctiles de acción rápida -->
        <div class="plant-actions-row">
          <button class="btn-plant-action btn-water" onclick="waterPlant('${p.id}')" title="Registrar que has regado esta planta hoy">
            💧 Regada Hoy
          </button>
          <button class="btn-plant-action btn-fertilize" onclick="fertilizePlant('${p.id}')" title="Registrar abono aplicado hoy">
            🌿 Abonada Hoy
          </button>
        </div>

        <!-- Notas de cuidados de la planta -->
        <div class="notes-section" style="margin-top:14px;">
          <div class="notes-label">
            <span>📝 Cuidados & Notas</span>
            <small style="opacity:0.6;">(Auto-guardado)</small>
          </div>
          <textarea class="notes-textarea" style="min-height:55px;" placeholder="Tierra, humedad, poda, transplante..." 
            onchange="updatePlantNotes('${p.id}', this.value)"
            oninput="debouncedPlantNotes('${p.id}', this.value)">${escapeHtml(p.notes || '')}</textarea>
        </div>
      </div>
    `;
  }).join('');
}

function debouncedPlantNotes(id, text) {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    updatePlantNotes(id, text);
  }, 400);
}

function updatePlantNotes(id, text) {
  if (!Array.isArray(appData.plants)) return;
  const plant = appData.plants.find(p => p.id === id);
  if (plant) {
    plant.notes = text;
    saveData();
  }
}

function waterPlant(id) {
  const plant = appData.plants.find(p => p.id === id);
  if (!plant) return;
  plant.lastWatered = new Date().toISOString();
  saveData();
  vibratePhone(40);
  renderPlants();
}

function fertilizePlant(id) {
  const plant = appData.plants.find(p => p.id === id);
  if (!plant) return;
  plant.lastFertilized = new Date().toISOString();
  saveData();
  vibratePhone(35);
  renderPlants();
}

function deletePlant(id) {
  const plant = appData.plants.find(p => p.id === id);
  const name = plant ? plant.name : 'esta planta';
  if (confirm(`¿Estás segura de que quieres eliminar ${name} de tu registro de plantas?`)) {
    appData.plants = appData.plants.filter(p => p.id !== id);
    saveData();
    vibratePhone(35);
    renderPlants();
  }
}

function filterPlants(type, btn) {
  currentPlantFilter = type;
  document.querySelectorAll('.plants-filter-bar .filter-pill').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  renderPlants();
}

function openNewPlantModal() {
  document.getElementById('form-plant').reset();
  document.getElementById('plant-id').value = '';
  document.getElementById('plant-icon-value').value = '🪴';
  document.querySelectorAll('.plant-icon-choice').forEach((b, idx) => {
    if (idx === 0) b.classList.add('active');
    else b.classList.remove('active');
  });
  document.getElementById('btn-save-plant').textContent = 'Guardar Planta';
  const modal = document.getElementById('modal-plant');
  if (modal) modal.classList.add('open');
}

function editPlant(id) {
  const p = appData.plants.find(x => x.id === id);
  if (!p) return;

  document.getElementById('plant-id').value = p.id;
  document.getElementById('plant-name').value = p.name || '';
  document.getElementById('plant-variety').value = p.variety || '';
  document.getElementById('plant-location').value = p.location || '';
  document.getElementById('plant-water-freq').value = p.waterFrequency || 7;
  document.getElementById('plant-fertilize-freq').value = p.fertilizeFrequency || 30;
  document.getElementById('plant-light').value = p.light || '';
  document.getElementById('plant-notes').value = p.notes || '';
  document.getElementById('plant-icon-value').value = p.icon || '🪴';

  document.querySelectorAll('.plant-icon-choice').forEach(b => {
    if (b.textContent.includes(p.icon)) b.classList.add('active');
    else b.classList.remove('active');
  });

  document.getElementById('btn-save-plant').textContent = 'Actualizar Planta';
  const modal = document.getElementById('modal-plant');
  if (modal) modal.classList.add('open');
}

function handleSavePlant(e) {
  e.preventDefault();
  const idInput = document.getElementById('plant-id').value;
  const name = document.getElementById('plant-name').value.trim();
  const variety = document.getElementById('plant-variety').value.trim();
  const location = document.getElementById('plant-location').value.trim();
  const waterFrequency = Math.max(1, parseInt(document.getElementById('plant-water-freq').value, 10) || 7);
  const fertilizeFrequency = Math.max(1, parseInt(document.getElementById('plant-fertilize-freq').value, 10) || 30);
  const light = document.getElementById('plant-light').value.trim();
  const icon = document.getElementById('plant-icon-value').value || '🪴';
  const notes = document.getElementById('plant-notes').value.trim();

  if (!name) return;

  if (idInput) {
    const p = appData.plants.find(x => x.id === idInput);
    if (p) {
      p.name = name;
      p.variety = variety;
      p.location = location;
      p.waterFrequency = waterFrequency;
      p.fertilizeFrequency = fertilizeFrequency;
      p.light = light;
      p.icon = icon;
      p.notes = notes;
    }
  } else {
    const newPlant = {
      id: 'plant-' + Date.now(),
      name,
      variety,
      location,
      waterFrequency,
      lastWatered: new Date().toISOString(),
      fertilizeFrequency,
      lastFertilized: new Date().toISOString(),
      light,
      icon,
      notes,
      createdAt: new Date().toISOString()
    };
    if (!Array.isArray(appData.plants)) appData.plants = [];
    appData.plants.unshift(newPlant);
  }

  saveData();
  renderPlants();
  closeModal('modal-plant');
  vibratePhone(30);
}

function setWaterFreqPreset(days) {
  const input = document.getElementById('plant-water-freq');
  if (input) input.value = days;
}

function setFertilizeFreqPreset(days) {
  const input = document.getElementById('plant-fertilize-freq');
  if (input) input.value = days;
}

function selectPlantIcon(icon, btn) {
  document.getElementById('plant-icon-value').value = icon;
  document.querySelectorAll('.plant-icon-choice').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
}

// ========================================================
// 5. SECCIÓN DE NATURALEZA Y FAUNA DIARIA (#tab-nature)
// Planta u Hongo del Día & Animal del Día
// ========================================================
let currentNatureSection = 'plant'; // 'plant' o 'animal'
let natureDayOffset = 0; // 0 = hoy, -1 = ayer, +1 = mañana

function getDayOfYear(date = new Date()) {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = (date - start) + ((start.getTimezoneOffset() - date.getTimezoneOffset()) * 60 * 1000);
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

function renderNatureHub() {
  const container = document.getElementById('nature-content');
  if (!container) return;

  if (typeof NATURE_PLANTS_DATA === 'undefined' || typeof NATURE_ANIMALS_DATA === 'undefined') {
    container.innerHTML = '<p style="text-align:center; padding:20px;">Cargando catálogo natural...</p>';
    return;
  }

  const targetDate = new Date(Date.now() + natureDayOffset * 86400000);
  const dayOfYear = getDayOfYear(targetDate);

  // Selector cíclico según día del año
  const plantIndex = Math.abs(dayOfYear) % NATURE_PLANTS_DATA.length;
  const animalIndex = Math.abs(dayOfYear + 2) % NATURE_ANIMALS_DATA.length;

  const currentPlant = NATURE_PLANTS_DATA[plantIndex];
  const currentAnimal = NATURE_ANIMALS_DATA[animalIndex];

  // Actualizar etiqueta de fecha y botón "Hoy"
  const dateLabel = document.getElementById('natureDateLabel');
  const btnToday = document.getElementById('btnNatureToday');
  if (dateLabel) {
    if (natureDayOffset === 0) {
      dateLabel.textContent = `Descubrimiento de Hoy · ${targetDate.toLocaleDateString('es-ES', { day: 'numeric', month: 'long' })}`;
    } else if (natureDayOffset === -1) {
      dateLabel.textContent = `Ayer · ${targetDate.toLocaleDateString('es-ES', { day: 'numeric', month: 'long' })}`;
    } else if (natureDayOffset === 1) {
      dateLabel.textContent = `Mañana · ${targetDate.toLocaleDateString('es-ES', { day: 'numeric', month: 'long' })}`;
    } else {
      dateLabel.textContent = `${targetDate.toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}`;
    }
  }
  if (btnToday) {
    btnToday.style.display = natureDayOffset === 0 ? 'none' : 'inline-block';
  }

  // Actualizar botones del segmento
  const btnPlant = document.getElementById('btn-nature-plant');
  const btnAnimal = document.getElementById('btn-nature-animal');
  if (btnPlant) btnPlant.classList.toggle('active', currentNatureSection === 'plant');
  if (btnAnimal) btnAnimal.classList.toggle('active', currentNatureSection === 'animal');

  if (currentNatureSection === 'plant') {
    renderPlantShowcase(container, currentPlant);
  } else {
    renderAnimalShowcase(container, currentAnimal);
  }
}

function renderPlantShowcase(container, item) {
  const cleanType = (item.type || '').replace(/^🍄\s*|^🌿\s*|^🪴\s*/, '').trim();
  container.innerHTML = `
    <div class="nature-showcase-card">
      <div class="nature-hero-media" onclick="openNatureLightbox('${escapeHtml(item.photo)}')">
        <img src="${escapeHtml(item.photo)}" alt="${escapeHtml(item.name)}" class="nature-hero-img"
          onerror="this.onerror=null; this.src='icon-autumn.svg';">
        <div class="nature-media-badge">
          <span class="nature-badge-icon">${item.fallbackIcon || '🍄'}</span>
          <span class="nature-badge-type">${escapeHtml(cleanType || item.type)}</span>
        </div>
        <div class="nature-zoom-hint">🔍 Toca para ampliar foto</div>
      </div>

      <div class="nature-card-body">
        <div class="nature-title-group">
          <span class="nature-scientific-name">Clasificación botánica: <em>${escapeHtml(item.scientificName)}</em></span>
          <h2 class="nature-common-name">${escapeHtml(item.name)}</h2>
          <div class="nature-popular-subtitle">«${escapeHtml(item.popularName)}»</div>
        </div>

        <div class="nature-chips-grid">
          <div class="nature-chip-item">
            <strong>🌲 Hábitat natural</strong>
            <span>${escapeHtml(item.habitat)}</span>
          </div>
          <div class="nature-chip-item">
            <strong>🍂 Época / Estación</strong>
            <span>${escapeHtml(item.season)}</span>
          </div>
          <div class="nature-chip-item">
            <strong>🍽️ Comestibilidad</strong>
            <span>${escapeHtml(item.edibility)}</span>
          </div>
          <div class="nature-chip-item">
            <strong>🏷️ Rasgos</strong>
            <span>${item.tags.join(' · ')}</span>
          </div>
        </div>

        <!-- 📜 Historia, Mitología y Tradición -->
        <div class="nature-story-box">
          <div class="nature-block-header">
            <span>📜</span>
            <span>Historia, Mitología & Tradición</span>
          </div>
          <p class="nature-block-text">${escapeHtml(item.history)}</p>
        </div>

        <!-- 🔬 Características Botánicas o Micológicas -->
        <div class="nature-features-box">
          <div class="nature-block-header">
            <span>🔬</span>
            <span>Características Botánicas & Morfología</span>
          </div>
          <p class="nature-block-text">${escapeHtml(item.characteristics)}</p>
        </div>

        <!-- ✨ Curiosidad Fascinante -->
        <div class="nature-curiosity-box">
          <div class="curiosity-title">
            <span>✨</span>
            <span>¿Sabías que...?</span>
          </div>
          <p class="nature-block-text">${escapeHtml(item.curiosity)}</p>
        </div>

        <!-- 🌿 Consejo de Respeto / Recolección -->
        ${item.tip ? `
          <div class="nature-tip-box">
            <strong>🌿 Consejo de la naturaleza:</strong> ${escapeHtml(item.tip)}
          </div>
        ` : ''}
      </div>
    </div>
  `;
}

function renderAnimalShowcase(container, item) {
  const cleanType = (item.type || '').replace(/^🦊\s*|^🦔\s*|^🦉\s*|^🐿️\s*|^🐦\s*|^🦦\s*|^🦌\s*/, '').trim();
  container.innerHTML = `
    <div class="nature-showcase-card">
      <div class="nature-hero-media" onclick="openNatureLightbox('${escapeHtml(item.photo)}')">
        <img src="${escapeHtml(item.photo)}" alt="${escapeHtml(item.name)}" class="nature-hero-img"
          onerror="this.onerror=null; this.src='icon-autumn.svg';">
        <div class="nature-media-badge">
          <span class="nature-badge-icon">${item.fallbackIcon || '🦊'}</span>
          <span class="nature-badge-type">${escapeHtml(cleanType || item.type)}</span>
        </div>
        <div class="nature-zoom-hint">🔍 Toca para ampliar foto</div>
      </div>

      <div class="nature-card-body">
        <div class="nature-title-group">
          <span class="nature-scientific-name">Especie: <em>${escapeHtml(item.scientificName)}</em></span>
          <h2 class="nature-common-name">${escapeHtml(item.name)}</h2>
          <div class="nature-popular-subtitle">«${escapeHtml(item.popularName)}»</div>
        </div>

        <div class="nature-chips-grid">
          <div class="nature-chip-item">
            <strong>🌲 Hábitat Silvestre</strong>
            <span>${escapeHtml(item.habitat)}</span>
          </div>
          <div class="nature-chip-item">
            <strong>🍂 Época / Estación</strong>
            <span>${escapeHtml(item.season)}</span>
          </div>
          <div class="nature-chip-item">
            <strong>🫐 Dieta natural</strong>
            <span>${escapeHtml(item.diet)}</span>
          </div>
          <div class="nature-chip-item">
            <strong>🏷️ Rasgos</strong>
            <span>${item.tags.join(' · ')}</span>
          </div>
        </div>

        <!-- 📜 Historia, Simbolismo y Leyendas -->
        <div class="nature-story-box">
          <div class="nature-block-header">
            <span>📜</span>
            <span>Historia, Simbolismo & Leyendas</span>
          </div>
          <p class="nature-block-text">${escapeHtml(item.history)}</p>
        </div>

        <!-- 🐾 Características Físicas y Adaptaciones -->
        <div class="nature-features-box">
          <div class="nature-block-header">
            <span>🐾</span>
            <span>Características Físicas & Adaptaciones</span>
          </div>
          <p class="nature-block-text">${escapeHtml(item.characteristics)}</p>
        </div>

        <!-- 🍂 Comportamiento en esta estación -->
        ${item.autumnBehavior ? `
          <div class="nature-features-box" style="border-left: 4px solid var(--accent-primary); background:var(--bg-card);">
            <div class="nature-block-header">
              <span>🍂</span>
              <span>Comportamiento en esta Estación</span>
            </div>
            <p class="nature-block-text">${escapeHtml(item.autumnBehavior)}</p>
          </div>
        ` : ''}

        <!-- ✨ Curiosidad Fascinante -->
        <div class="nature-curiosity-box">
          <div class="curiosity-title">
            <span>✨</span>
            <span>¿Sabías que...?</span>
          </div>
          <p class="nature-block-text">${escapeHtml(item.curiosity)}</p>
        </div>
      </div>
    </div>
  `;
}

function switchNatureSection(section) {
  currentNatureSection = section;
  renderNatureHub();
  vibratePhone(20);
}

function changeNatureDay(delta) {
  natureDayOffset += delta;
  renderNatureHub();
  vibratePhone(24);
}

function randomNatureDay() {
  natureDayOffset = Math.floor(Math.random() * 60) - 30;
  renderNatureHub();
  vibratePhone(35);
}

function resetNatureToToday() {
  natureDayOffset = 0;
  renderNatureHub();
  vibratePhone(25);
}

function navigateToNature(section) {
  currentNatureSection = section;
  natureDayOffset = 0;

  // Activar botón en el bottom nav
  document.querySelectorAll('.nav-item').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-tab') === 'tab-nature');
  });

  // Activar tab-content correspondiente
  document.querySelectorAll('.tab-content').forEach(tab => {
    tab.classList.toggle('active', tab.id === 'tab-nature');
  });

  renderNatureHub();
  vibratePhone(25);

  const natureSection = document.getElementById('tab-nature');
  if (natureSection) {
    natureSection.scrollIntoView({ behavior: 'smooth' });
  }
}

function updateDailyNaturePreviews() {
  if (typeof NATURE_PLANTS_DATA === 'undefined' || typeof NATURE_ANIMALS_DATA === 'undefined') return;

  const today = new Date();
  const dayOfYear = getDayOfYear(today);

  const plant = NATURE_PLANTS_DATA[Math.abs(dayOfYear) % NATURE_PLANTS_DATA.length];
  const animal = NATURE_ANIMALS_DATA[Math.abs(dayOfYear + 2) % NATURE_ANIMALS_DATA.length];

  const plantNameEl = document.getElementById('dailyPreviewPlantName');
  const plantIconEl = document.getElementById('dailyPreviewPlantIcon');
  const animalNameEl = document.getElementById('dailyPreviewAnimalName');
  const animalIconEl = document.getElementById('dailyPreviewAnimalIcon');

  if (plantNameEl && plant) plantNameEl.textContent = plant.name;
  if (plantIconEl && plant) plantIconEl.textContent = plant.fallbackIcon || '🍄';
  if (animalNameEl && animal) animalNameEl.textContent = animal.name;
  if (animalIconEl && animal) animalIconEl.textContent = animal.fallbackIcon || '🦊';
}

function openNatureLightbox(src) {
  const box = document.getElementById('nature-lightbox');
  const img = document.getElementById('nature-lightbox-img');
  if (box && img) {
    img.src = src;
    box.classList.add('open');
    vibratePhone(20);
  }
}

function closeNatureLightbox() {
  const box = document.getElementById('nature-lightbox');
  if (box) box.classList.remove('open');
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
    if (hobby === 'reading') {
      const form = document.getElementById('form-reading');
      if (form) form.reset();
      setReadingFormat('book');
      resetStarRatingInput();
    }
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

// Guardar nuevo libro o audiolibro
function handleSaveReading(e) {
  e.preventDefault();
  const format = document.getElementById('reading-format').value || 'book';
  const title = document.getElementById('reading-title').value.trim();
  const author = document.getElementById('reading-author').value.trim();
  const rating = parseInt(document.getElementById('reading-rating').value, 10) || 0;
  const quotes = document.getElementById('reading-quotes').value.trim();

  if (!title) return;

  const newBook = {
    id: 'reading-' + Date.now(),
    title,
    author,
    format,
    rating,
    quotes,
    createdAt: new Date().toISOString()
  };

  if (format === 'audiobook') {
    const audioProgress = Math.min(100, Math.max(0, parseInt(document.getElementById('reading-audio-progress').value, 10) || 0));
    const audioDuration = document.getElementById('reading-audio-duration').value.trim();
    newBook.audioProgress = audioProgress;
    newBook.audioDuration = audioDuration;
  } else {
    const currentPage = Math.max(0, parseInt(document.getElementById('reading-current-page').value, 10) || 0);
    const totalPages = Math.max(1, parseInt(document.getElementById('reading-total-pages').value, 10) || 1);
    newBook.currentPage = Math.min(totalPages, currentPage);
    newBook.totalPages = totalPages;
  }

  appData.reading.unshift(newBook);
  saveData();
  renderReading();
  closeModal('modal-reading');
  document.getElementById('form-reading').reset();
  setReadingFormat('book');
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
      if (imported && (imported.crochet || imported.diamond || imported.reading || imported.plants)) {
        appData = {
          diary: imported.diary || JSON.parse(JSON.stringify(initialSampleData.diary)),
          crochet: Array.isArray(imported.crochet) ? imported.crochet : [],
          diamond: Array.isArray(imported.diamond) ? imported.diamond : [],
          reading: Array.isArray(imported.reading) ? imported.reading : [],
          readingWishlist: Array.isArray(imported.readingWishlist) ? imported.readingWishlist : [],
          plants: Array.isArray(imported.plants) ? imported.plants : []
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

// ========================================================
// PANTALLA DE INICIO: BLOC DE NOTAS & DIARIO DE PENSAMIENTOS
// ========================================================
let diaryDebounceTimer = null;

function getCozyDateFormatted(date = new Date()) {
  try {
    const options = { weekday: 'long', day: 'numeric', month: 'long' };
    const str = date.toLocaleDateString('es-ES', options);
    return str.charAt(0).toUpperCase() + str.slice(1);
  } catch (e) {
    return 'Hoy';
  }
}

function initDiarySystem() {
  const dateEl = document.getElementById('diaryCurrentDate');
  if (dateEl) {
    dateEl.textContent = getCozyDateFormatted();
  }

  if (!appData.diary) {
    appData.diary = JSON.parse(JSON.stringify(initialSampleData.diary));
  }
  if (!appData.diary.currentDraft) {
    appData.diary.currentDraft = { title: '', text: '', mood: '☕', lastSaved: null };
  }
  if (!Array.isArray(appData.diary.entries)) {
    appData.diary.entries = [];
  }

  const titleInput = document.getElementById('diaryEntryTitle');
  const textInput = document.getElementById('diaryEntryText');

  if (titleInput && appData.diary.currentDraft) {
    titleInput.value = appData.diary.currentDraft.title || '';
  }
  if (textInput && appData.diary.currentDraft) {
    textInput.value = appData.diary.currentDraft.text || '';
  }

  const mood = (appData.diary.currentDraft && appData.diary.currentDraft.mood) || '☕';
  document.querySelectorAll('.btn-mood').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-mood') === mood);
  });

  renderDiaryHistory();
  renderDiaryCalendar();
}

function handleDiaryInput() {
  const statusEl = document.getElementById('diarySavedStatus');
  if (statusEl) {
    statusEl.textContent = '✍️ Guardando...';
    statusEl.style.opacity = '1';
  }

  clearTimeout(diaryDebounceTimer);
  diaryDebounceTimer = setTimeout(() => {
    const title = document.getElementById('diaryEntryTitle')?.value || '';
    const text = document.getElementById('diaryEntryText')?.value || '';
    const mood = appData.diary?.currentDraft?.mood || '☕';

    if (!appData.diary) appData.diary = { currentDraft: {}, entries: [] };
    appData.diary.currentDraft = {
      title,
      text,
      mood,
      lastSaved: new Date().toISOString()
    };
    saveData();

    if (statusEl) {
      statusEl.textContent = '✨ Guardado';
      setTimeout(() => {
        if (statusEl.textContent === '✨ Guardado') {
          statusEl.style.opacity = '0.7';
        }
      }, 1500);
    }
  }, 350);
}

function setDiaryMood(mood, btnEl) {
  if (!appData.diary) appData.diary = { currentDraft: {}, entries: [] };
  if (!appData.diary.currentDraft) appData.diary.currentDraft = { title: '', text: '' };
  appData.diary.currentDraft.mood = mood;

  document.querySelectorAll('.btn-mood').forEach(b => {
    b.classList.toggle('active', b.getAttribute('data-mood') === mood);
  });

  saveData();
  vibratePhone(15);
}

function saveCurrentDiaryEntry() {
  const titleInput = document.getElementById('diaryEntryTitle');
  const textInput = document.getElementById('diaryEntryText');
  const title = (titleInput?.value || '').trim();
  const text = (textInput?.value || '').trim();
  const mood = appData.diary?.currentDraft?.mood || '☕';

  if (!title && !text) {
    showCozyToast('✏️ Escribe primero algo en tu diario para guardarlo.');
    return;
  }

  const now = new Date();
  const timeStr = now.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
  const newEntry = {
    id: 'diary-' + Date.now(),
    title: title || 'Reflexión del día',
    text: text,
    mood: mood,
    date: now.toISOString(),
    dateFormatted: getCozyDateFormatted(now) + ` a las ${timeStr}`
  };

  if (!appData.diary) appData.diary = { currentDraft: {}, entries: [] };
  if (!Array.isArray(appData.diary.entries)) appData.diary.entries = [];
  appData.diary.entries.unshift(newEntry);

  // Reiniciar borrador actual para nueva hoja
  appData.diary.currentDraft = { title: '', text: '', mood: '☕', lastSaved: null };
  if (titleInput) titleInput.value = '';
  if (textInput) textInput.value = '';

  saveData();
  renderDiaryHistory();
  renderDiaryCalendar();
  renderDiaryCalendar();
  vibratePhone(30);

  const statusEl = document.getElementById('diarySavedStatus');
  if (statusEl) {
    statusEl.textContent = '📖 Guardado en el diario';
    statusEl.style.opacity = '1';
    setTimeout(() => { statusEl.textContent = '✨ Al día'; }, 2200);
  }

  showCozyToast('📖 ¡Página guardada con amor en tu diario!');
}

function startNewDiaryEntry() {
  const titleInput = document.getElementById('diaryEntryTitle');
  const textInput = document.getElementById('diaryEntryText');
  const title = (titleInput?.value || '').trim();
  const text = (textInput?.value || '').trim();

  if (title || text) {
    if (confirm('¿Quieres guardar esta página en tu diario antes de abrir una hoja en blanco?')) {
      saveCurrentDiaryEntry();
      return;
    }
  }

  if (titleInput) titleInput.value = '';
  if (textInput) textInput.value = '';
  if (appData.diary) {
    appData.diary.currentDraft = { title: '', text: '', mood: '☕', lastSaved: null };
    saveData();
  }
  if (titleInput) titleInput.focus();
  vibratePhone(20);
  showCozyToast('✨ Hoja en blanco lista para escribir.');
}

function renderDiaryHistory() {
  const container = document.getElementById('diary-history-list');
  const countEl = document.getElementById('diaryCount');
  const entries = (appData.diary && Array.isArray(appData.diary.entries)) ? appData.diary.entries : [];

  if (countEl) countEl.textContent = entries.length;
  if (!container) return;

  if (entries.length === 0) {
    container.innerHTML = `
      <div style="text-align:center; padding:18px 12px; color:var(--text-light); font-size:0.86rem; font-style:italic;">
        Aún no has archivado páginas anteriores. Escribe tus pensamientos arriba y pulsa «Guardar en el diario».
      </div>
    `;
    return;
  }

  container.innerHTML = entries.map(entry => `
    <div class="diary-entry-card" id="${entry.id}">
      <div class="diary-entry-top">
        <div class="diary-entry-meta">
          <span>${entry.mood || '☕'}</span>
          <span>${escapeHtml(entry.dateFormatted || 'Página anterior')}</span>
        </div>
        <div class="diary-entry-actions">
          <button class="btn-entry-action" onclick="loadDiaryEntryToEdit('${entry.id}')" title="Continuar escribiendo esta página">
            ✏️ Editar
          </button>
          <button class="btn-entry-action delete" onclick="deleteDiaryEntry('${entry.id}')" title="Eliminar del diario">
            🗑️
          </button>
        </div>
      </div>
      <div class="diary-entry-title">${escapeHtml(entry.title)}</div>
      <div class="diary-entry-body">${escapeHtml(entry.text)}</div>
    </div>
  `).join('');
}

function toggleDiaryHistory() {
  const container = document.getElementById('diary-history-list');
  const icon = document.getElementById('diaryHistoryToggleIcon');
  if (!container) return;

  const isHidden = container.style.display === 'none' || container.style.display === '';
  container.style.display = isHidden ? 'flex' : 'none';
  if (icon) {
    icon.classList.toggle('open', isHidden);
  }
  vibratePhone(15);
}

function loadDiaryEntryToEdit(id) {
  const entry = appData.diary?.entries?.find(e => e.id === id);
  if (!entry) return;

  const titleInput = document.getElementById('diaryEntryTitle');
  const textInput = document.getElementById('diaryEntryText');

  if (titleInput) titleInput.value = entry.title || '';
  if (textInput) textInput.value = entry.text || '';

  setDiaryMood(entry.mood || '☕');

  // Al editarla, se vuelve a cargar como borrador principal
  appData.diary.entries = appData.diary.entries.filter(e => e.id !== id);
  appData.diary.currentDraft = {
    title: entry.title || '',
    text: entry.text || '',
    mood: entry.mood || '☕',
    lastSaved: new Date().toISOString()
  };
  saveData();
  renderDiaryHistory();
  renderDiaryCalendar();

  if (textInput) {
    textInput.focus();
    textInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
  vibratePhone(25);
  showCozyToast('✏️ Página cargada en el bloc de notas para editar.');
}

function deleteDiaryEntry(id) {
  if (!confirm('¿Deseas eliminar esta página del diario?')) return;
  if (!appData.diary || !Array.isArray(appData.diary.entries)) return;

  appData.diary.entries = appData.diary.entries.filter(e => e.id !== id);
  saveData();
  renderDiaryHistory();
  renderDiaryCalendar();
  vibratePhone(25);
  showCozyToast('🗑️ Página eliminada del diario.');
}

function showCozyToast(message) {
  let toast = document.getElementById('cozy-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'cozy-toast';
    toast.className = 'cozy-toast';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add('visible');
  clearTimeout(toast._timeout);
  toast._timeout = setTimeout(() => {
    toast.classList.remove('visible');
  }, 2400);
}

// ========================================================
// CALENDARIO MENSUAL DE PENSAMIENTOS (TABLA)
// ========================================================
let currentCalendarMonth = new Date().getMonth();
let currentCalendarYear = new Date().getFullYear();
let selectedCalendarDay = null; // 'YYYY-MM-DD'

function renderDiaryCalendar() {
  const tbody = document.getElementById('diaryCalendarBody');
  const labelEl = document.getElementById('diaryCalendarMonthYear');
  if (!tbody || !labelEl) return;

  const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  labelEl.textContent = `${monthNames[currentCalendarMonth]} ${currentCalendarYear}`;

  // Mapear días con entradas
  const entryDateMap = {};
  const entries = (appData.diary && Array.isArray(appData.diary.entries)) ? appData.diary.entries : [];
  entries.forEach(entry => {
    if (!entry.date) return;
    const d = new Date(entry.date);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    if (!entryDateMap[key]) entryDateMap[key] = [];
    entryDateMap[key].push(entry);
  });

  const today = new Date();
  const todayKey = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

  const firstDay = new Date(currentCalendarYear, currentCalendarMonth, 1);
  const totalDays = new Date(currentCalendarYear, currentCalendarMonth + 1, 0).getDate();
  const startDayIndex = (firstDay.getDay() + 6) % 7; // Lunes = 0

  let html = '';
  let dayCounter = 1;
  const numRows = Math.ceil((startDayIndex + totalDays) / 7);

  for (let row = 0; row < numRows; row++) {
    html += '<tr>';
    for (let col = 0; col < 7; col++) {
      const cellIndex = row * 7 + col;
      if (cellIndex < startDayIndex || dayCounter > totalDays) {
        html += '<td class="cal-cell empty"></td>';
      } else {
        const thisDay = dayCounter;
        const dateKey = `${currentCalendarYear}-${String(currentCalendarMonth + 1).padStart(2, '0')}-${String(thisDay).padStart(2, '0')}`;
        const dayEntries = entryDateMap[dateKey];
        const hasEntry = !!(dayEntries && dayEntries.length > 0);
        const isToday = (dateKey === todayKey);
        const isSelected = (dateKey === selectedCalendarDay);

        let cellClasses = ['cal-cell'];
        if (isToday) cellClasses.push('is-today');
        if (hasEntry) cellClasses.push('has-entry');
        if (isSelected) cellClasses.push('is-selected');

        const primaryMood = hasEntry ? (dayEntries[0].mood || '🍂') : '';

        html += `
          <td class="${cellClasses.join(' ')}" onclick="handleCalendarDayClick('${dateKey}', ${hasEntry})">
            <span class="cal-day-num">${thisDay}</span>
            ${hasEntry ? `<span class="cal-entry-badge" title="${dayEntries.length} nota(s)">${primaryMood}</span>` : ''}
          </td>
        `;
        dayCounter++;
      }
    }
    html += '</tr>';
  }

  tbody.innerHTML = html;
  renderCalendarDayDetails(selectedCalendarDay, entryDateMap);
}

function changeDiaryCalendarMonth(delta) {
  currentCalendarMonth += delta;
  if (currentCalendarMonth < 0) {
    currentCalendarMonth = 11;
    currentCalendarYear--;
  } else if (currentCalendarMonth > 11) {
    currentCalendarMonth = 0;
    currentCalendarYear++;
  }
  selectedCalendarDay = null;
  renderDiaryCalendar();
  vibratePhone(15);
}

function resetDiaryCalendarToday() {
  const now = new Date();
  currentCalendarMonth = now.getMonth();
  currentCalendarYear = now.getFullYear();
  selectedCalendarDay = null;
  renderDiaryCalendar();
  vibratePhone(20);
}

function handleCalendarDayClick(dateKey, hasEntry) {
  if (selectedCalendarDay === dateKey) {
    selectedCalendarDay = null;
  } else {
    selectedCalendarDay = dateKey;
  }
  renderDiaryCalendar();
  vibratePhone(15);
}

function renderCalendarDayDetails(dateKey, entryDateMap) {
  const container = document.getElementById('calendar-day-entries');
  if (!container) return;

  if (!dateKey) {
    container.style.display = 'none';
    container.innerHTML = '';
    return;
  }

  const entries = (entryDateMap && entryDateMap[dateKey]) || [];
  const parts = dateKey.split('-');
  const y = parseInt(parts[0]);
  const m = parseInt(parts[1]);
  const d = parseInt(parts[2]);
  const dateObj = new Date(y, m - 1, d);
  const dateFormatted = getCozyDateFormatted(dateObj);

  if (entries.length === 0) {
    container.style.display = 'block';
    container.innerHTML = `
      <div class="cal-detail-card">
        <div class="cal-detail-header">
          <span>📅 ${dateFormatted}</span>
          <button type="button" class="cal-detail-close" onclick="closeCalendarDayDetails()">&times;</button>
        </div>
        <p class="cal-detail-empty">No hay notas escritas en este día.</p>
        <button type="button" class="btn btn-secondary" style="font-size:0.78rem; padding:5px 12px;" onclick="startDiaryForDate('${dateKey}')">
          ✏️ Escribir nota para este día
        </button>
      </div>
    `;
    return;
  }

  container.style.display = 'block';
  container.innerHTML = `
    <div class="cal-detail-card">
      <div class="cal-detail-header">
        <span>📖 ${dateFormatted} (${entries.length} entrada${entries.length > 1 ? 's' : ''})</span>
        <button type="button" class="cal-detail-close" onclick="closeCalendarDayDetails()">&times;</button>
      </div>
      <div class="cal-detail-list">
        ${entries.map(e => `
          <div class="cal-detail-entry">
            <div class="cal-detail-entry-top">
              <strong>${e.mood || '☕'} ${escapeHtml(e.title || 'Pensamiento')}</strong>
              <button type="button" class="btn-entry-action" onclick="loadDiaryEntryToEdit('${e.id}')">✏️ Cargar en bloc</button>
            </div>
            <p>${escapeHtml(e.text)}</p>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function closeCalendarDayDetails() {
  selectedCalendarDay = null;
  renderDiaryCalendar();
}

function startDiaryForDate(dateKey) {
  const parts = dateKey.split('-');
  const y = parts[0];
  const m = parts[1];
  const d = parts[2];
  const titleInput = document.getElementById('diaryEntryTitle');
  const textInput = document.getElementById('diaryEntryText');

  if (titleInput) {
    titleInput.value = `Nota del ${d}/${m}/${y}`;
  }
  if (textInput) {
    textInput.focus();
    textInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
  selectedCalendarDay = null;
  renderDiaryCalendar();
  showCozyToast(`✏️ Bloc listo para escribir nota.`);
}

// ========================================================
// SISTEMA DE SEGURIDAD CON CONTRASEÑA
// ========================================================
const SECURITY_STORAGE_KEY = 'mis_hobbies_security_pin';
const SECURITY_UNLOCKED_KEY = 'mis_hobbies_unlocked';

function checkAppSecurityOnLaunch() {
  updateSecurityUIState();
  const storedPassword = localStorage.getItem(SECURITY_STORAGE_KEY);
  if (!storedPassword) return; // Sin contraseña configurada

  const isUnlocked = sessionStorage.getItem(SECURITY_UNLOCKED_KEY) === 'true';
  const overlay = document.getElementById('lock-screen-overlay');
  if (overlay) {
    if (!isUnlocked) {
      overlay.style.display = 'flex';
      const input = document.getElementById('lockInputPassword');
      if (input) {
        input.value = '';
        setTimeout(() => input.focus(), 250);
      }
    } else {
      overlay.style.display = 'none';
    }
  }
}

function updateSecurityUIState() {
  const storedPassword = localStorage.getItem(SECURITY_STORAGE_KEY);
  const lockBtn = document.getElementById('btnLockApp');
  if (lockBtn) {
    if (storedPassword) {
      lockBtn.innerHTML = '🔒';
      lockBtn.title = 'Bloquear aplicación ahora (Protegida con contraseña)';
    } else {
      lockBtn.innerHTML = '🔓';
      lockBtn.title = 'Configurar contraseña de seguridad';
    }
  }

  // Actualizar contenido del modal de seguridad si existe
  const statusHeading = document.getElementById('securityStatusHeading');
  const statusDesc = document.getElementById('securityStatusDesc');
  const statusIcon = document.getElementById('securityStatusIcon');
  const groupCurrent = document.getElementById('groupCurrentPassword');
  const btnRemove = document.getElementById('btnRemoveSecurity');
  const secNewPasswordLabel = document.getElementById('secNewPasswordLabel');

  if (statusHeading) {
    if (storedPassword) {
      statusHeading.textContent = 'Protegida con Contraseña';
      statusDesc.textContent = 'La aplicación está bloqueada para personas sin contraseña.';
      statusIcon.textContent = '🔒';
      if (groupCurrent) groupCurrent.style.display = 'block';
      if (btnRemove) btnRemove.style.display = 'inline-block';
      if (secNewPasswordLabel) secNewPasswordLabel.textContent = 'Nueva Contraseña o PIN';
    } else {
      statusHeading.textContent = 'Sin contraseña configurada';
      statusDesc.textContent = 'Cualquiera que abra la app puede ver tus notas y aficiones.';
      statusIcon.textContent = '🔓';
      if (groupCurrent) groupCurrent.style.display = 'none';
      if (btnRemove) btnRemove.style.display = 'none';
      if (secNewPasswordLabel) secNewPasswordLabel.textContent = 'Elige una Contraseña o PIN';
    }
  }
}

function handleSecurityButton() {
  const storedPassword = localStorage.getItem(SECURITY_STORAGE_KEY);
  if (storedPassword) {
    // Si ya tiene contraseña, bloquear inmediatamente
    lockAppNow();
  } else {
    // Si no tiene contraseña, abrir modal de configuración
    openSecurityModal();
  }
}

function lockAppNow() {
  sessionStorage.removeItem(SECURITY_UNLOCKED_KEY);
  const overlay = document.getElementById('lock-screen-overlay');
  const errorMsg = document.getElementById('lockErrorMessage');
  const input = document.getElementById('lockInputPassword');

  if (errorMsg) errorMsg.style.display = 'none';
  if (input) input.value = '';
  if (overlay) {
    overlay.style.display = 'flex';
    if (input) setTimeout(() => input.focus(), 250);
  }
  vibratePhone(25);
  showCozyToast('🔒 Aplicación bloqueada.');
}

function handleUnlockSubmit(event) {
  event.preventDefault();
  const input = document.getElementById('lockInputPassword');
  const errorMsg = document.getElementById('lockErrorMessage');
  const storedPassword = localStorage.getItem(SECURITY_STORAGE_KEY);
  const entered = (input?.value || '').trim();

  if (storedPassword && entered === storedPassword) {
    sessionStorage.setItem(SECURITY_UNLOCKED_KEY, 'true');
    const overlay = document.getElementById('lock-screen-overlay');
    if (overlay) {
      overlay.style.display = 'none';
    }
    if (errorMsg) errorMsg.style.display = 'none';
    if (input) input.value = '';
    vibratePhone(25);
    showCozyToast('✨ ¡Bienvenida de nuevo!');
  } else {
    vibratePhone(60);
    if (errorMsg) {
      errorMsg.textContent = '⚠️ Contraseña incorrecta. Inténtalo de nuevo.';
      errorMsg.style.display = 'block';
    }
    if (input) {
      input.select();
      input.focus();
    }
  }
}

function togglePasswordVisibility(inputId, btnEl) {
  const input = document.getElementById(inputId);
  if (!input) return;
  const isPassword = input.type === 'password';
  input.type = isPassword ? 'text' : 'password';
  if (btnEl) {
    btnEl.textContent = isPassword ? '🙈' : '👁️';
  }
}

function openSecurityModal() {
  updateSecurityUIState();
  const modal = document.getElementById('modal-security');
  const err = document.getElementById('secErrorMsg');
  if (err) err.style.display = 'none';
  const form = document.getElementById('securityConfigForm');
  if (form) form.reset();
  if (modal) modal.classList.add('open');
}

function handleSaveSecurityConfig(event) {
  event.preventDefault();
  const storedPassword = localStorage.getItem(SECURITY_STORAGE_KEY);
  const currentPassInput = document.getElementById('secCurrentPassword');
  const newPassInput = document.getElementById('secNewPassword');
  const confirmPassInput = document.getElementById('secConfirmPassword');
  const errorMsg = document.getElementById('secErrorMsg');

  const currentEntered = (currentPassInput?.value || '').trim();
  const newPass = (newPassInput?.value || '').trim();
  const confirmPass = (confirmPassInput?.value || '').trim();

  // Si ya existía contraseña, verificar la actual
  if (storedPassword && currentEntered !== storedPassword) {
    if (errorMsg) {
      errorMsg.textContent = '⚠️ La contraseña actual introducida no es correcta.';
      errorMsg.style.display = 'block';
    }
    vibratePhone(40);
    return;
  }

  if (!newPass || newPass.length < 3) {
    if (errorMsg) {
      errorMsg.textContent = '⚠️ La nueva contraseña debe tener al menos 3 caracteres.';
      errorMsg.style.display = 'block';
    }
    vibratePhone(40);
    return;
  }

  if (newPass !== confirmPass) {
    if (errorMsg) {
      errorMsg.textContent = '⚠️ Las contraseñas no coinciden.';
      errorMsg.style.display = 'block';
    }
    vibratePhone(40);
    return;
  }

  localStorage.setItem(SECURITY_STORAGE_KEY, newPass);
  sessionStorage.setItem(SECURITY_UNLOCKED_KEY, 'true');
  updateSecurityUIState();
  closeModal('modal-security');
  vibratePhone(30);
  showCozyToast('🔐 ¡Contraseña guardada con éxito!');
}

function handleRemoveSecurity() {
  const storedPassword = localStorage.getItem(SECURITY_STORAGE_KEY);
  if (!storedPassword) return;

  const currentEntered = prompt('Introduce tu contraseña actual para desactivar la seguridad:');
  if (currentEntered === null) return; // Cancelado

  if (currentEntered.trim() === storedPassword) {
    localStorage.removeItem(SECURITY_STORAGE_KEY);
    sessionStorage.removeItem(SECURITY_UNLOCKED_KEY);
    updateSecurityUIState();
    closeModal('modal-security');
    vibratePhone(25);
    showCozyToast('🔓 Contraseña desactivada.');
  } else {
    alert('Contraseña incorrecta. No se ha desactivado la seguridad.');
  }
}

function handleForgotSecurityPassword() {
  const proceed = confirm(
    '¿Has olvidado tu contraseña?\n\nSi aceptas, se desactivará la contraseña para que puedas entrar a tu aplicación.\n\nNota: Tus notas del diario, plantas y aficiones NO se borrarán.'
  );
  if (proceed) {
    localStorage.removeItem(SECURITY_STORAGE_KEY);
    sessionStorage.setItem(SECURITY_UNLOCKED_KEY, 'true');
    const overlay = document.getElementById('lock-screen-overlay');
    if (overlay) overlay.style.display = 'none';
    updateSecurityUIState();
    vibratePhone(30);
    showCozyToast('🔓 Contraseña restablecida. Puedes entrar a la app.');
  }
}
