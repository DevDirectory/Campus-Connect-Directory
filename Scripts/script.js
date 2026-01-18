// Data defaults + versioning to avoid stale localStorage
const DATA_VERSION = '2026-01-19'; // bump when defaults change
const DEFAULT_CLUBS = [
  {name:"GDG on campus AASTU", desc:"Google Developer Group", president:"Johnathan L.", members:"1000+", founded:"2020", topic:"Technology", telegram:"https://t.me/DSCAASTU", linkedin:"https://www.linkedin.com/company/gdgaastu"},
  {name:"Build a DAO Ethiopia", desc:"Educate students about Web3", president:"Biruk H.", members:"150+", founded:"2024", topic:"Technology", telegram:"https://t.me/BaDEthiopia", linkedin:""},
  {name:"Brana Culture and Arts Center", desc:"በአዲስ አበባ ሳይንስና ቴክኖሎጂ ዩንቨርስቲ ብራና የባህል እና የኪነጥበብ ማዕከል", president:"Yeabsira.", members:"220+", founded:"2024", topic:"Culture", telegram:"https://www.instagram.com/brana_arts?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==", linkedin:""},
  {name:"SheCodes AASTU", desc:"Empowering women in tech by educating them while connecting them to real-world experience", president:"Medina and Merbibt", members:"200+", founded:"2022", topic:"Technology", telegram:"", linkedin:""},
  {name:"Innovation and Entrepreneurship Development Club", desc:"Startup & pitch events", president:"Minase.", members:"180+", founded:"2021", topic:"Entrepreneurship", telegram:"https://t.me/IEDC2", linkedin:""},
  {name:"PsyPulse – The Mental Wellness Hub", desc:"supportive community that promotes mental health awareness", president:"Soliyana K.", members:"220+", founded:"2024", topic:"Other", telegram:"", linkedin:""}
];

const DEFAULT_EVENTS = [
  {name:"Tech Fest 2025", date:"15-17 Mar 2025", time:"9AM-6PM", location:"Main Auditorium", desc:"Hackathon & workshops"},
  {name:"Cultural Night", date:"5 May 2025", time:"6PM-11PM", location:"Open Air Theater", desc:"Music, dance, food"},
  {name:"AI & Robotics Expo", date:"12 Feb 2026", time:"10AM-4PM", location:"Innovation Lab", desc:"Student projects showcase and demos"},
  {name:"Startup Pitch Day", date:"28 Feb 2026", time:"2PM-6PM", location:"Entrepreneurship Hub", desc:"Pitch competition with mentors and judges"},
  {name:"Sports Meet", date:"10 Mar 2026", time:"8AM-5PM", location:"Central Field", desc:"Track events, football, basketball"},
  {name:"Culture & Coffee", date:"18 Mar 2026", time:"5PM-8PM", location:"Student Lounge", desc:"Cultural exchange, music and poetry"},
  {name:"Open Source Sprint", date:"23 Mar 2026", time:"1PM-7PM", location:"CS Block A", desc:"Contribute to OSS; beginners welcome"},
  {name:"Mental Wellness Workshop", date:"29 Mar 2026", time:"3PM-5PM", location:"Seminar Hall 2", desc:"Mindfulness, stress management, peer support"}
];

// Ensure localStorage is initialized with current defaults on version change
(function ensureDataVersion(){
  const v = localStorage.getItem('campus_data_version');
  if (v !== DATA_VERSION) {
    // Merge defaults into existing data without overwriting user additions
    const existingClubs = JSON.parse(localStorage.getItem('campus_clubs') || '[]');
    const existingEvents = JSON.parse(localStorage.getItem('campus_events') || '[]');

    const mergeByName = (existing, defaults) => {
      const names = new Set((existing || []).map(x => (x?.name || '').toLowerCase()));
      const merged = Array.isArray(existing) ? existing.slice() : [];
      defaults.forEach(d => {
        if (!names.has((d.name || '').toLowerCase())) merged.push(d);
      });
      return merged;
    };

    const mergedClubs = mergeByName(existingClubs, DEFAULT_CLUBS);
    const mergedEvents = mergeByName(existingEvents, DEFAULT_EVENTS);

    localStorage.setItem('campus_clubs', JSON.stringify(mergedClubs));
    localStorage.setItem('campus_events', JSON.stringify(mergedEvents));
    localStorage.setItem('campus_data_version', DATA_VERSION);
  }
})();

// Working data loaded from localStorage (or defaults if missing)
let clubs = JSON.parse(localStorage.getItem('campus_clubs')) || DEFAULT_CLUBS.slice();
let events = JSON.parse(localStorage.getItem('campus_events')) || DEFAULT_EVENTS.slice();

function saveData() {
  localStorage.setItem('campus_clubs', JSON.stringify(clubs));
  localStorage.setItem('campus_events', JSON.stringify(events));
  localStorage.setItem('campus_data_version', DATA_VERSION);
}

// Optional helper to clear and reinitialize data
function resetData() {
  localStorage.removeItem('campus_clubs');
  localStorage.removeItem('campus_events');
  localStorage.removeItem('campus_data_version');
  clubs = DEFAULT_CLUBS.slice();
  events = DEFAULT_EVENTS.slice();
  saveData();
  loadContent();
}

// Load content
function loadContent() {
  const clubList = document.getElementById('clubList');
  const eventList = document.getElementById('eventList');

  if (clubList) {
    clubList.innerHTML = '';
    clubs.forEach((club, i) => {
      const card = document.createElement('div');
      card.className = 'card';
      card.setAttribute('data-search', (club.name + ' ' + club.desc).toLowerCase());
      card.setAttribute('data-topic', club.topic || 'Other');
      card.onclick = () => openClubModal(i);
      card.innerHTML = `
        <h3>${club.name}</h3>
        <p style="line-height:1.6; margin-bottom:14px;">${club.desc}</p>
        <button class="btn btn-primary" style="width:100%; padding:14px;">View Details</button>
      `;
      clubList.appendChild(card);
    });
    filterClubs();
  }

  if (eventList) {
    eventList.innerHTML = '';
    events.forEach((ev, i) => {
      const card = document.createElement('div');
      card.className = 'card';
      card.setAttribute('data-search', (ev.name + ' ' + ev.desc).toLowerCase());
      card.onclick = () => openEventModal(i);
      card.innerHTML = `
        <h3>${ev.name}</h3>
        <p style="line-height:1.6; margin-bottom:10px;">${ev.desc}</p>
        <p style="margin-bottom:10px;"><strong>${ev.date}</strong> • ${ev.location}</p>
        <button class="btn btn-primary" style="width:100%; padding:14px;">View Event</button>
      `;
      eventList.appendChild(card);
    });
  }
}

// Topic filter
function filterClubs() {
  const active = document.querySelector('.topic-btn.active');
  const topic = active ? active.dataset.topic : 'all';

  document.querySelectorAll('#clubList .card').forEach(card => {
    const t = card.dataset.topic;
    card.style.display = (topic === 'all' || t === topic) ? '' : 'none';
  });
}

document.querySelectorAll('.topic-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.topic-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    filterClubs();
  });
});

// Modals
function openClubModal(i) {
  const c = clubs[i];
  document.getElementById('clubName').textContent = c.name;
  document.getElementById('clubPresident').textContent = c.president || '—';
  document.getElementById('clubMembers').textContent = c.members || '—';
  document.getElementById('clubFounded').textContent = c.founded || '—';
  document.getElementById('clubDesc').textContent = c.desc;

  const tg = document.getElementById('clubTelegram');
  const li = document.getElementById('clubLinkedin');
  tg.href = c.telegram || '#';
  li.href = c.linkedin || '#';
  tg.style.display = c.telegram ? 'block' : 'none';
  li.style.display = c.linkedin ? 'block' : 'none';

  document.getElementById('clubModal').classList.add('active');
}

function openEventModal(i) {
  const e = events[i];
  document.getElementById('eventName').textContent = e.name;
  document.getElementById('eventDate').textContent = e.date || 'TBD';
  document.getElementById('eventTime').textContent = e.time || 'TBD';
  document.getElementById('eventLocation').textContent = e.location || 'TBD';
  document.getElementById('eventDesc').textContent = e.desc;
  document.getElementById('eventModal').classList.add('active');
}

function openAddModal(type) {
  document.getElementById('addType').value = type;
  document.getElementById('addModalTitle').textContent = type === 'club' ? 'Add New Club' : 'Register New Event';
  document.getElementById('addExtra1').placeholder = type === 'club' ? 'President Name' : 'Date';
  document.getElementById('addExtra2').placeholder = type === 'club' ? 'Members (e.g. 100+)' : 'Time';
  document.getElementById('addExtra3').placeholder = type === 'club' ? 'Founded Year' : 'Location';
  document.getElementById('addModal').classList.add('active');
}

document.getElementById('addForm').addEventListener('submit', e => {
  e.preventDefault();
  const type = document.getElementById('addType').value;
  const item = {
    name: document.getElementById('addName').value.trim(),
    desc: document.getElementById('addDesc').value.trim(),
  };
  if (type === 'club') {
    item.president = document.getElementById('addExtra1').value.trim();
    item.members  = document.getElementById('addExtra2').value.trim();
    item.founded  = document.getElementById('addExtra3').value.trim();
    item.topic    = document.getElementById('addTopic').value;
    item.telegram = document.getElementById('addTelegram').value.trim();
    item.linkedin = document.getElementById('addLinkedin').value.trim();
    clubs.push(item);
  } else {
    item.date     = document.getElementById('addExtra1').value.trim();
    item.time     = document.getElementById('addExtra2').value.trim();
    item.location = document.getElementById('addExtra3').value.trim();
    events.push(item);
  }
  saveData();
  loadContent();
  closeModal('addModal');
  alert('Added successfully!');
});

function closeModal(id) {
  document.getElementById(id).classList.remove('active');
}

// Section switching
function showSection(id) {
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');

  document.querySelectorAll('.nav-links a').forEach(a => {
    a.classList.remove('active');
    if (a.getAttribute('onclick')?.includes(id)) a.classList.add('active');
  });

  closeMobileMenu();
  document.getElementById('searchInput').value = '';
  document.getElementById('mobileSearch').value = '';
  globalSearch();

  if (id === 'clubs') {
    document.querySelector('.topic-btn[data-topic="all"]').classList.add('active');
    document.querySelectorAll('.topic-btn:not([data-topic="all"])').forEach(b => b.classList.remove('active'));
    filterClubs();
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Search
function globalSearch() {
  const q = (document.getElementById('searchInput')?.value || document.getElementById('mobileSearch')?.value || '').toLowerCase().trim();

  document.querySelectorAll('.card').forEach(card => {
    const text = card.getAttribute('data-search') || '';
    card.style.display = q && !text.includes(q) ? 'none' : '';
  });
}

document.getElementById('searchInput')?.addEventListener('input', globalSearch);
document.getElementById('mobileSearch')?.addEventListener('input', globalSearch);

// Mobile menu
document.getElementById('hamburger').onclick = function() {
  this.classList.toggle('active');
  document.getElementById('mobileMenu').classList.toggle('active');
};

function closeMobileMenu() {
  document.getElementById('hamburger').classList.remove('active');
  document.getElementById('mobileMenu').classList.remove('active');
}

// Theme persistence across pages
const THEME_KEY = 'campus_theme';

function updateThemeIcon() {
  const icon = document.getElementById('themeToggle')?.querySelector('i');
  if (!icon) return;
  const isLight = document.body.classList.contains('light');
  icon.classList.toggle('fa-sun', isLight);
  icon.classList.toggle('fa-moon', !isLight);
}

function setTheme(mode) {
  document.body.classList.toggle('light', mode === 'light');
  localStorage.setItem(THEME_KEY, mode);
  updateThemeIcon();
}

function initTheme() {
  const saved = localStorage.getItem(THEME_KEY) || 'dark';
  setTheme(saved);
}

// Initialize theme on page load
initTheme();

// Theme toggle handler
const themeBtn = document.getElementById('themeToggle');
if (themeBtn) {
  themeBtn.onclick = function() {
    const isCurrentlyLight = document.body.classList.contains('light');
    setTheme(isCurrentlyLight ? 'dark' : 'light');
  };
}

// Simple auth (demo)
let isLogin = true;
function openModal() {
  document.getElementById('authModal').classList.add('active');
}

function switchMode() {
  isLogin = !isLogin;
  document.getElementById('modalTitle').textContent = isLogin ? 'Welcome Back!' : 'Create Account';
  document.querySelector('#authForm button').textContent = isLogin ? 'Login' : 'Sign Up';
  document.getElementById('emailField').style.display = isLogin ? 'none' : 'block';
  document.getElementById('switchText').textContent = isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login";
}

document.getElementById('authForm').addEventListener('submit', e => {
  e.preventDefault();
  const name = document.getElementById('username').value.trim();
  if (name) {
    document.querySelector('.account-btn').style.display = 'none';
    document.getElementById('userWelcome').style.display = 'block';
    document.getElementById('userWelcome').textContent = `Hi ${name}!`;
    closeModal('authModal');
  }
});

// Init
loadContent();
