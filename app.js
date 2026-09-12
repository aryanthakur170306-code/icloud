/* iCloudEMS-inspired student portal demo. All data stays in this browser's localStorage. */
const $ = (selector, root = document) => root.querySelector(selector);
const app = $('#app');
const picker = $('#media-picker');
const PROFILE_SEED_REVISION = 3;
const RESULTS_SEED_REVISION = 4;
const FEES_SEED_REVISION = 4;
const ARYAN_PROFILE = {
  name: 'ARYAN THAKUR', roll: '23131010559', admission: '23SCSE1012155', section: 'Section-24', email: 'aryanthakur15708@gmail.com',
  father: 'SANTOSH THAKUR', mother: 'JYOTI THAKUR', dob: '17 March 2006', phone: '7011408281',
  address: 'Shadipur, New Delhi, Delhi - 110008', localAddress: 'Shadipur, New Delhi, Delhi - 110008', permanentAddress: 'Shadipur, New Delhi, Delhi - 110008', city: 'New Delhi', state: 'Delhi', pincode: '110008', country: 'India',
  seedRevision: PROFILE_SEED_REVISION
};

const DEFAULT = {
  profile: {
    name: 'ARYAN THAKUR', roll: '23131010559', section: 'Section-24', email: 'aryanthakur15708@gmail.com',
    father: 'SANTOSH THAKUR', mother: 'JYOTI THAKUR', dob: '17 March 2006', nationality: 'Indian', phone: '7011408281', gender: 'Male', religion: 'Hinduism',
    admission: '23SCSE1012155', application: 'UG2323717', className: 'Btech_CSE(DS) IV 2023-2024 Sem VII', programme: 'Bachelor of Technology in Computer Science and Engineering with specialization in Data Science [ SCSE142 ]', address: '', localAddress: '', permanentAddress: '', city: '', state: '', pincode: '', country: 'India', abcId: '',
    avatar: '', ...ARYAN_PROFILE
  },
  attendance: [
    { title: 'Research Methodology and IPR', code: 'R1UC701T', type: 'PP', attended: 5, delivered: 12 },
    { title: 'Generative and Explainable AI', code: 'R1UD702B', type: 'PP', attended: 6, delivered: 14 },
    { title: 'Generative and Explainable AI', code: 'R1UD702B', type: 'PR', attended: 2, delivered: 7 },
    { title: 'Internship Mooc NPTEL', code: 'R1UR701R', type: 'PR', attended: 0, delivered: 0 }
  ],
  timetable: [
    { date: '2026-09-13', start: '12:50', end: '13:40', subject: 'Research Methodology and IPR (PP)', code: 'R1UC701T', teacher: 'Mandeep' },
    { date: '2026-09-13', start: '13:45', end: '14:35', subject: 'Research Methodology and IPR (PP)', code: 'R1UC701T', teacher: 'Mandeep' },
    { date: '2026-09-13', start: '14:35', end: '15:25', subject: 'Generative and Explainable AI (PP)', code: 'R1UD702B', teacher: 'Chouhan Mahesh Kumar' },
    { date: '2026-09-13', start: '15:30', end: '16:20', subject: 'Generative and Explainable AI (PP)', code: 'R1UD702B', teacher: 'Chouhan Mahesh Kumar' },
    { date: '2026-09-13', start: '16:20', end: '17:10', subject: 'Generative and Explainable AI (PP)', code: 'R1UD702B', teacher: 'Chouhan Mahesh Kumar' }
  ],
  // The account is settled; the individual heads remain available in the editable UI.
  fees: { tuition: 149000, exam: 15000, paid: 164000, seedRevision: FEES_SEED_REVISION },
  receipts: [],
  resultsRevision: RESULTS_SEED_REVISION,
  results: [
    { semester: 1, session: 'Regular', sgpa: '8.39', cgpa: '8.39', status: 'PASS', courses: [{code:'C1UB120T',name:'Environmental Impact Analysis',credit:'0',grade:'A'}, {code:'C1UC122B',name:'Engineering Mathematics-I',credit:'4',grade:'A'}, {code:'C1UD124B',name:'Semiconductor and Optoelectronic Devices',credit:'4',grade:'A'}, {code:'E2UC102C',name:'Programming for Problem Solving',credit:'4',grade:'A+'}, {code:'G2UC101B',name:'Introduction of Digital System',credit:'3',grade:'A'}, {code:'O1UA104B',name:'Communication Skills for Engineers',credit:'3',grade:'A+'}] },
    { semester: 2, session: 'Regular', sgpa: '8.09', cgpa: '8.22', status: 'PASS', courses: [{code:'C1UB129T',name:'Chemical and Biological Materials',credit:'3',grade:'A'}, {code:'C1UC222B',name:'Engineering Mathematics-II',credit:'4',grade:'A'}, {code:'C1UC224T',name:'Discrete Mathematics',credit:'3',grade:'B+'}, {code:'E2UC201C',name:'OOPS',credit:'5',grade:'A+'}, {code:'G2UA120B',name:'Basic Electrical and Electronics Engg.',credit:'4',grade:'A'}, {code:'G3UB101B',name:'Engineering Design and Prototyping',credit:'4',grade:'A'}, {code:'L1UB120T',name:'YOGA',credit:'0',grade:'O'}] },
    { semester: 3, session: 'Regular', sgpa: '7.91', cgpa: '8.11', status: 'PASS', courses: [{code:'C1UC322T',name:'Probability and Statistics',credit:'3',grade:'A'}, {code:'E1UA307C',name:'Java Programming',credit:'5',grade:'A'}, {code:'E2UC301T',name:'Computer Organisation and Architecture',credit:'4',grade:'A'}, {code:'E2UC302B',name:'Data Base Management System',credit:'4',grade:'A'}, {code:'O1UA301L',name:'Communication Competency and Aptitude Building - I',credit:'2',grade:'A'}, {code:'R1UC301L',name:'Design Thinking',credit:'1',grade:'O'}, {code:'R1UC303B',name:'Data Structures using JAVA',credit:'4',grade:'B+'}] },
    { semester: 4, session: 'Regular', sgpa: '7.91', cgpa: '8.06', status: 'PASS', courses: [{code:'O1UA422L',name:'Verbal and Quantitative Reasoning - I',credit:'2',grade:'B+'}, {code:'R1UC403B',name:'Operating System',credit:'4',grade:'B+'}, {code:'R1UC406B',name:'Data Communication and Networking',credit:'4',grade:'A'}, {code:'R1UC407B',name:'Design and Analysis of Algorithm',credit:'5',grade:'A'}, {code:'R1UC408B',name:'Computer Graphics',credit:'4',grade:'A+'}, {code:'R1UC409T',name:'Understanding Harmony and Ethical Human Conduct',credit:'1',grade:'A'}, {code:'R1UC413T',name:'Renewable Energy',credit:'3',grade:'A'}] },
    { semester: 5, session: 'Regular', sgpa: '7.57', cgpa: '7.95', status: 'PASS', courses: [{code:'K1UC523L',name:'Communication Competency and Aptitude Building - III',credit:'2',grade:'B'}, {code:'R1UC501T',name:'Theory of Computation',credit:'3',grade:'A'}, {code:'R1UC507T',name:'Distributed Computing',credit:'3',grade:'A'}, {code:'R1UC511R',name:'Internship Summer',credit:'2',grade:'A'}, {code:'R1UC525B',name:'Machine Learning',credit:'4',grade:'B+'}, {code:'R1UC531B',name:'Advanced Data Structures and Algorithms',credit:'5',grade:'B'}, {code:'R1UC534B',name:'Frontend Development',credit:'4',grade:'O'}] },
    { semester: 6, session: 'Regular', sgpa: '7.22', cgpa: '7.83', status: 'PASS', courses: [{code:'O1UA603L',name:'Professional Readiness',credit:'2',grade:'B+'}, {code:'R1UC601B',name:'Advanced Algorithmic Problem Solving',credit:'4',grade:'B+'}, {code:'R1UC626C',name:'Web Technology',credit:'5',grade:'B'}, {code:'R1UC647T',name:'Compiler Design',credit:'3',grade:'A+'}, {code:'R1UC649B',name:'Cyber Security',credit:'4',grade:'A'}, {code:'R1UC651B',name:'Software Engineering',credit:'5',grade:'B+'}] },
    { semester: 7, session: 'Regular', sgpa: '', cgpa: '', status: 'NOT PUBLISHED', courses: [] },
    { semester: 8, session: 'Regular', sgpa: '', cgpa: '', status: 'NOT PUBLISHED', courses: [] }
  ],
  records: { Notifications: [], Holidays: [], Enrollment: [], Feedback: [], Undertaking: [], Grievance: [], Mentorship: [], 'NEFT Form': [], Performance: [], 'Request Center': [], 'Admit Card': [], 'Exam Form': [], 'Report Card': [], 'Seating Plan': [], 'Upload Documents': [] },
  notifications: [
    { title: 'Welcome to iCloudEMS', text: 'Your student portal is ready for use.', date: 'Today' },
    { title: 'Academic update', text: 'You can edit your profile and add your project data from this demo.', date: 'Today' }
  ]
};

let state = loadState();
let current = 'login';
let activeFee = 'All Fees';
let currentModule = '';
let selectedScheduleDate = new Date(2026, 8, 13, 12);
let selectedResultSemester = 1;

function loadState() {
  try {
    const stored = JSON.parse(localStorage.getItem('ems-demo-data'));
    return stored ? mergeDefaults(stored) : structuredClone(DEFAULT);
  } catch { return structuredClone(DEFAULT); }
}
function mergeDefaults(saved) {
 const savedClasses = saved.timetable || DEFAULT.timetable;
 const profile = { ...DEFAULT.profile, ...(saved.profile || {}) };
 if ((profile.seedRevision || 0) < PROFILE_SEED_REVISION) Object.assign(profile, ARYAN_PROFILE);
 const fees = { ...DEFAULT.fees, ...(saved.fees || {}) };
 if ((fees.seedRevision || 0) < FEES_SEED_REVISION) Object.assign(fees, structuredClone(DEFAULT.fees));
 const results = (saved.resultsRevision || 0) < RESULTS_SEED_REVISION ? structuredClone(DEFAULT.results) : (saved.results || structuredClone(DEFAULT.results));
 return { ...structuredClone(DEFAULT), ...saved, profile, fees, receipts: saved.receipts || [], resultsRevision: RESULTS_SEED_REVISION, results, records: { ...DEFAULT.records, ...(saved.records || {}) }, timetable: savedClasses.map(item => ({ ...item, date: item.date || '2026-09-13' })) };
}
function save() { localStorage.setItem('ems-demo-data', JSON.stringify(state)); }
function escapeHtml(value = '') { return String(value).replace(/[&<>'"]/g, c => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', "'":'&#039;', '"':'&quot;' }[c])); }
function money(value) { return `₹${Number(value || 0).toLocaleString('en-IN')}`; }
function icon(name) {
 name = ({'All Fees':'Fees','Academic Fees':'Fees','Hostel Fees':'Fees','Transport Fees':'Fees','Miscellaneous Fees':'Fees', Overall:'Attendance', 'Subject Wise':'Attendance', Qr:'Qr'})[name] || name;
 const icons = {
  Attendance:'<path d="M8 3h8v3H8zM6 5H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/><path d="M7 13l2.2 2.2L14 10.5"/>',
  Timetable:'<circle cx="12" cy="12" r="8"/><path d="M12 7v5l3.4 2"/>',
  Fees:'<path d="M6 4h12M6 8h12M8 8c0 5 2.6 8 7 8H8l8 4"/>',
  Holidays:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
  Notifications:'<path d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 22h4"/>',
  Enrollment:'<path d="M5 3h14v18H5zM8 7h8M8 11h8M8 15h5"/>',
  Feedback:'<path d="M4 4h16v12H8l-4 4z"/><path d="M8 9h8M8 12h5"/>',
  Undertaking:'<path d="M5 2h10l4 4v16H5z"/><path d="M15 2v5h5M8 12h8M8 16h6"/>',
  Grievance:'<path d="M7 21v-2a5 5 0 0 1 10 0v2M12 14a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"/><path d="M18 11l1.5 1.5L22 9"/>',
  Mentorship:'<circle cx="8" cy="9" r="3"/><circle cx="17" cy="10" r="2.5"/><path d="M2.5 21a5.5 5.5 0 0 1 11 0M14 21a4 4 0 0 1 7.5-2"/>',
  'NEFT Form':'<path d="M5 2h10l4 4v16H5z"/><path d="M15 2v5h5M8 12h8M8 16h8"/>',
  Performance:'<path d="M4 20V10M10 20V4M16 20v-7M22 20V7"/><path d="M3 20h20"/>',
  'Request Center':'<path d="M4 4h16v12H7l-3 3z"/><path d="M8 8h8M8 12h5"/>',
  'Admit Card':'<rect x="4" y="3" width="16" height="18" rx="2"/><circle cx="12" cy="9" r="2"/><path d="M8 17c1-3 7-3 8 0"/>',
  'Exam Form':'<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M8 8h8M8 12h8M8 16h5"/>',
  'Report Card':'<path d="M5 3h14v18H5z"/><path d="M8 8h8M8 12h8M8 16h5"/>',
  'Seating Plan':'<circle cx="12" cy="12" r="9"/><circle cx="8" cy="10" r="1.5"/><circle cx="16" cy="10" r="1.5"/><path d="M5.5 17c.8-2.7 4.2-3.3 6.5-1M12 16c2.3-2.3 5.7-1.7 6.5 1"/>',
  Support:'<path d="M4 13v-1a8 8 0 0 1 16 0v1M4 13v4h3v-5H4M20 13v4h-3v-5h3M17 18c-1 2-3 3-5 3"/>',
  'Sign Out':'<path d="M10 4H5v16h5M14 8l4 4-4 4M18 12H9"/>',
  'My Account':'<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
  'Upload Documents':'<path d="M12 15V3M8 7l4-4 4 4M5 13v7h14v-7"/>',
  'Personal Info':'<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
  'University Information':'<path d="M3 5l9-3 9 3-9 3zM5 10v7M9 9v8M15 9v8M19 10v7M3 21h18"/>',
  Address:'<path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0z"/><circle cx="12" cy="10" r="2.5"/>',
  'Update ABC ID':'<circle cx="9" cy="8" r="3"/><path d="M3 20a6 6 0 0 1 12 0M16 16l2 2 4-5"/>',
  Home:'<path d="M3 11l9-8 9 8v10h-6v-6H9v6H3z"/>',
  Qr:'<path d="M3 10V3h7M14 3h7v7M21 14v7h-7M10 21H3v-7"/><path d="M7 7h.01M17 7h.01M7 17h.01M16 16h2v2h-2z"/>'
 };
 return `<svg class="glyph" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[name] || icons['Exam Form']}</svg>`;
}
function avatar(className = 'avatar-fallback') { return state.profile.avatar ? `<img class="${className}" src="${state.profile.avatar}" alt="Profile photo">` : `<div class="${className}">${state.profile.name.slice(0,1)}</div>`; }

function render() {
  const pages = { login: loginPage, home: homePage, attendance: attendancePage, attendanceDetails: attendanceDetailsPage, timetable: timetablePage, fees: feesPage, academicFees: academicFeesPage, feeLedger: feeLedgerPage, reportCards: reportCardsPage, profile: profilePage, personal: personalInfoPage, notifications: notificationsPage, module: modulePage };
  app.innerHTML = pages[current] ? pages[current]() : homePage();
  bindPage();
}

function loginPage() {
  return `<section class="login-shell"><form id="login-form" class="login-card">
    <div class="brand-mark">iC</div><h1>iCloudEMS</h1><p class="sub">Student information portal</p>
    <label class="field">Email address<input id="login-email" type="email" required autocomplete="email" placeholder="student@example.com" value="${escapeHtml(state.profile.email)}"></label>
    <label class="field">Password<input type="password" required minlength="4" autocomplete="current-password" placeholder="Enter your password" value="student123"></label>
    <button class="primary" type="submit">Sign In</button><p class="helper">Demo mode: enter any valid email and password.</p>
  </form></section>`;
}
function topbar(title, opts = {}) {
  const { back = true, home = false, refresh = false, light = false } = opts;
  if (home) return `<header class="topbar home"><div class="topline"><button class="icon-btn" data-action="drawer" aria-label="Open menu">☰</button><div class="home-logo">iCloud<br>EMS</div><button class="icon-btn" data-action="support" aria-label="Support">♧</button></div><div class="home-greeting">Good Afternoon ☀️ ${escapeHtml(state.profile.name.split(' ')[0])}</div></header>`;
  return `<header class="topbar ${light ? 'light' : ''}"><div class="topline">${back ? `<button class="icon-btn" data-action="back" aria-label="Go back">‹</button>` : '<span></span>'}<span></span>${refresh ? `<button class="icon-btn" data-action="refresh" aria-label="Refresh">⟳</button>` : ''}</div><h1 class="bar-title">${escapeHtml(title)}</h1><div class="student-pill">▯ &nbsp; ${escapeHtml(state.profile.roll)}</div><span class="version">3.0.9</span></header>`;
}
function bottomNav(active = 'home') {
 return `<nav class="bottom-nav bottom-nav-simple" aria-label="Primary navigation"><button class="nav-item ${active === 'home' ? 'active' : ''}" data-page="home"><span class="nav-glyph">${icon('Home')}</span><span>Home</span></button></nav>`;
}
function homePage() {
 const quick = [['Attendance','#ffdfe5'],['Timetable','#dfdcff'],['Fees','#d5f5ec'],['Holidays','#caf1fa'],['Notifications','#fff0cb']];
 const utilities = ['Enrollment','Feedback','Undertaking','Grievance','Mentorship','NEFT Form','Performance','Request Center'];
 const assess = ['Admit Card','Exam Form','Report Card','Seating Plan'];
 return `<section class="shell">${topbar('', {home:true})}<main class="page home-page">
  <label class="search-wrap"><span>⌕</span><input id="module-search" placeholder="Search modules..." autocomplete="off"></label>
  <div class="quick-grid">${quick.map(([name,tone]) => `<button class="quick-card module-trigger" data-module="${name}" style="--tone:${tone}"><span>${name}</span><span class="quick-illustration">${icon(name)}</span></button>`).join('')}</div>
  <div class="mini-grid">${utilities.map(name => `<button class="mini-module module-trigger" data-module="${name}"><span class="module-icon">${icon(name)}</span><span>${name}</span></button>`).join('')}</div>
  <div class="section-label">Assessment Hub</div><section class="assessment">${assess.map((name,i) => `<button class="module-trigger" data-module="${name}"><span class="round-icon" style="--circle:${['#f4a7b6','#b5adf1','#8ed9c8','#75ccea'][i]}">${icon(name)}</span><span>${name}</span></button>`).join('')}</section>
 </main>${bottomNav('home')}</section>`;
}
function attendancePage() {
 return `<section class="shell">${topbar('Attendance',{refresh:true})}<section class="hero-blue"></section><div class="tab-cards"><button class="tab-card active" data-att-tab="day"><span>${icon('Attendance')}</span>Day Wise</button><button class="tab-card" data-att-tab="overall"><span>${icon('Overall')}</span>Overall</button><button class="tab-card" data-att-tab="subject"><span>${icon('Subject Wise')}</span>Subject Wise</button></div><main class="content-overlap"><section id="attendance-form" class="card form-card"></section></main>${bottomNav()}</section>`;
}
function attendanceForm(kind='day') {
 const title = kind === 'subject' ? 'Subject Wise Attendance' : kind === 'overall' ? 'Overall Attendance' : 'Day Wise Attendance';
 const sem = kind === 'day' ? `<label class="field">Semester Numeric<select><option>7</option><option>6</option><option>5</option></select></label>` : '';
 const dayFields = kind === 'day' ? `<label class="field">Month<select><option>September</option><option>August</option><option>October</option></select></label><label class="field">Date<input type="date" value="2026-09-12"></label>` : '';
 return `<h2>${title}</h2><label class="field">Academic Year<select><option>2026-2027</option><option>2025-2026</option></select></label>${sem}<label class="field">Class<select><option>${escapeHtml(state.profile.className)}</option><option>Btech CSE III Sem V</option></select></label>${dayFields}<button class="primary" data-action="attendance-search" data-kind="${kind}">Search</button>`;
}
function attendanceDetailsPage() {
 const totals = state.attendance.reduce((a,x) => ({ attended:a.attended+x.attended, delivered:a.delivered+x.delivered }), {attended:0,delivered:0});
 const percent = totals.delivered ? ((totals.attended/totals.delivered)*100).toFixed(2) : '0.00';
 const subjects = state.attendance.map(s => { const p = s.delivered ? ((s.attended/s.delivered)*100).toFixed(2) : '0'; return `<section class="card subject-card"><h3>${escapeHtml(s.title)} &nbsp; (${escapeHtml(s.code)})</h3><p>${escapeHtml(s.title)} &nbsp;-&nbsp; (${escapeHtml(s.type)})</p><div class="stats"><span>Course Code<strong>${escapeHtml(s.code)}</strong></span><span>Attended/Delivered<strong>${s.attended}/${s.delivered}</strong></span><span>Percent<strong>${p} %</strong></span></div></section>`; }).join('');
 return `<section class="shell">${topbar('Attendance Details')}<section class="hero-blue"><h1 style="font-size:26px">Subject Wise Attendance</h1></section><main class="content-overlap"><section class="card"><div class="stats"><span>From date<strong>06/08/2026</strong></span><span></span><span>To date<strong>10/01/2027</strong></span></div></section>${subjects}</main><section class="card total-card"><b>Total Percentage</b><span><b>Attended/Delivered</b><strong>${totals.attended}/${totals.delivered}</strong></span><span><b>Percent</b><strong>${percent} %</strong></span></section>${bottomNav()}</section>`;
}
function dateKey(date) { return [date.getFullYear(), String(date.getMonth() + 1).padStart(2, '0'), String(date.getDate()).padStart(2, '0')].join('-'); }
function copyDate(date) { return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 12); }
function dateOffset(date, days) { const result = copyDate(date); result.setDate(result.getDate() + days); return result; }
function weekStart(date) { return dateOffset(date, -((date.getDay() + 6) % 7)); }
function dateText(date, options) { return new Intl.DateTimeFormat('en-GB', options).format(date); }
function timetablePage() {
 const selectedKey = dateKey(selectedScheduleDate);
 const first = weekStart(selectedScheduleDate);
 const dates = Array.from({length: 7}, (_, index) => dateOffset(first, index));
 const events = state.timetable.filter(item => item.date === selectedKey).sort((a,b) => a.start.localeCompare(b.start));
 const cards = events.length ? events.map((e, index) => {
   const trueIndex = state.timetable.indexOf(e);
   return `<article class="schedule-item"><div class="time"><span>${icon('Timetable')}</span>${escapeHtml(e.start)}<small>to ${escapeHtml(e.end)}</small></div><div class="class-info"><h3>${escapeHtml(state.profile.className)} -<br>${escapeHtml(e.subject)}<br>${escapeHtml(e.code)} ${escapeHtml(state.profile.section)}</h3><span class="teacher">${escapeHtml(e.teacher || 'Faculty not set')}</span></div><div class="class-actions"><button data-action="edit-class" data-class-index="${trueIndex}" aria-label="Edit class">✎</button><button data-action="delete-class" data-class-index="${trueIndex}" aria-label="Delete class">×</button></div></article>`;
 }).join('') : `<section class="empty-schedule"><span>${icon('Timetable')}</span><h2>No classes for this day</h2><p>Add a class yourself, or choose another date from the week strip.</p><button class="primary" data-action="add-class">Add class</button></section>`;
 return `<section class="shell timetable-screen">${topbar('TimeTable',{light:true})}<section class="timetable-blue"><div class="month-nav"><button data-action="month-prev" aria-label="Previous month">‹</button><div><strong>${dateText(selectedScheduleDate,{month:'short'})}<br>${selectedScheduleDate.getFullYear()}</strong><small>${dateText(first,{day:'numeric',month:'short'})} – ${dateText(dates[6],{day:'numeric',month:'short'})}</small></div><button data-action="month-next" aria-label="Next month">›</button></div><div class="week-shift"><button data-action="week-prev">‹ Previous week</button><span>Weekly timetable</span><button data-action="week-next">Next week ›</button></div></section><section class="calendar-strip"><div class="week">${dates.map(d => `<button data-action="select-schedule-day" data-date="${dateKey(d)}">${dateText(d,{weekday:'short'})}</button>`).join('')}</div><div class="days">${dates.map(d => `<button class="${dateKey(d) === selectedKey ? 'active' : ''}" data-action="select-schedule-day" data-date="${dateKey(d)}">${d.getDate()}</button>`).join('')}</div></section><main class="schedule-list"><div class="schedule-date-label"><span>${dateText(selectedScheduleDate,{weekday:'long',day:'numeric',month:'long'})}</span><button class="add-class-inline" data-action="add-class">＋ Add class</button></div>${cards}</main><button class="floating-add" data-action="add-class" aria-label="Add timetable class">＋</button>${bottomNav()}</section>`;
}
function feesPage() {
 const heads = ['All Fees','Academic Fees','Hostel Fees','Transport Fees','Miscellaneous Fees'];
 const total = Object.values(state.fees).filter(v=>typeof v === 'number').reduce((a,b)=>a+b,0) - (state.fees.paid || 0) - (state.fees.tuition || 0) - (state.fees.exam || 0); // misc zero
 const outstanding = Math.max(0, state.fees.tuition + state.fees.exam - state.fees.paid);
 return `<section class="shell">${topbar('Fees')}<section class="hero-blue"><h1 style="font-size:25px">Fees</h1><p style="margin:6px 0 0;font-size:19px;font-weight:800">My Fees</p></section><main class="content-overlap"><section class="card identity-card"><div class="identity-head">${avatar('small-avatar')}<div><h2>${escapeHtml(state.profile.name)}</h2><p>Admission No.</p><strong>${escapeHtml(state.profile.admission)}</strong><p>Class</p><strong>${escapeHtml(state.profile.className)}</strong></div></div><div class="info-rows"><div><p>Division</p><strong>${escapeHtml(state.profile.section)}</strong></div><div><p>Roll No.</p><strong>${escapeHtml(state.profile.roll)}</strong></div><div><p>PRN</p><strong>${escapeHtml(state.profile.roll)}</strong></div></div><div class="programme"><p>Programme</p><strong>${escapeHtml(state.profile.programme)}</strong><p style="margin-top:19px">Application No.</p><strong>${escapeHtml(state.profile.application)} <span style="font-size:13px;color:#666">(This is a preadmission application No)</span></strong></div></section><div class="fee-menu">${heads.map(n=>`<button class="fee-head ${activeFee===n?'active':''}" data-fee="${n}"><span>${icon(n)}</span>${n}${n==='All Fees'?'<small style="display:block;color:#6e7278;margin-top:4px">(Incld. Misc)</small>':''}</button>`).join('')}</div><section class="card outstanding"><span>Total Outstanding Amount</span><strong>${money(outstanding)}</strong></section><div class="fee-summary">${[['Academic',outstanding],['Academic Miscellaneous',0],['Hostel',0],['Hostel Miscellaneous',0],['Transport',0],['Transport Miscellaneous',0]].map(([l,v])=>`<section class="card">${l}<strong>${money(v)}</strong></section>`).join('')}</div></main>${bottomNav()}</section>`;
}
function academicFeesPage() {
 const total = state.fees.tuition + state.fees.exam;
 const outstanding = Math.max(0,total - state.fees.paid);
 return `<section class="shell">${topbar('Fees')}<section class="hero-blue"><h1>Academic Fees</h1></section><main class="content-overlap"><section class="card fee-table"><div><strong>Head Name</strong><strong>Amount</strong></div><div><span>TUITION FEE</span><span>${money(state.fees.tuition)}</span></div><div><span>EXAM FEE</span><span>${money(state.fees.exam)}</span></div><div><span>Total Applicable Fee</span><span>${money(total)}</span></div><div><label>Amount to Pay</label><input id="fee-payment" type="number" min="1" max="${outstanding}" value="${outstanding}" aria-label="Amount to pay"></div></section><button class="primary pay-btn" data-action="pay">▣ &nbsp; Paytm · Demo payment</button><section class="card note-card" style="margin-top:55px"><b>ⓘ</b> Please note: this demo records a payment only in this browser. Your fee receipt can be saved in <b style="font-size:inherit;padding:0">All Fees</b>.</section></main>${bottomNav()}</section>`;
}
function feeLedgerPage() {
 const amounts = { 'All Fees': state.fees.tuition + state.fees.exam, 'Hostel Fees': 0, 'Transport Fees': 0, 'Miscellaneous Fees': 0 };
 const amount = amounts[activeFee] ?? 0;
 const entries = state.records[activeFee] || [];
 const receipts = activeFee === 'All Fees' ? `<section class="card list-editor" style="margin-top:20px"><h3>Payment receipts</h3>${state.receipts.length ? state.receipts.map((receipt,index) => `<div class="receipt-row"><span class="entry-thumb">✓</span><span class="entry-content"><strong>${escapeHtml(receipt.number)} · ${money(receipt.amount)}</strong><small>${escapeHtml(receipt.date)}</small></span><button class="secondary" data-action="download-receipt" data-receipt-index="${index}">↓ PDF</button></div>`).join('') : '<p class="empty">Make a demo payment to create a downloadable receipt.</p>'}</section>` : '';
 return `<section class="shell">${topbar('Fees',{light:true})}<section class="hero-blue"><h1>${escapeHtml(activeFee)}</h1></section><main class="content-overlap"><section class="card outstanding"><span>${escapeHtml(activeFee)} Total</span><strong>${money(amount)}</strong></section>${receipts}<section class="card list-editor" style="margin-top:20px"><h3>Receipts & notes</h3>${entries.length ? entries.map((x,i)=>`<div class="list-entry"><span class="entry-thumb">₹</span><span class="entry-content"><strong>${escapeHtml(x.title)}</strong><small>${escapeHtml(x.detail || '')}</small></span><button class="delete-entry" data-delete-fee-entry="${i}" aria-label="Delete receipt">×</button></div>`).join(''):'<p class="empty">No ${escapeHtml(activeFee.toLowerCase())} entries have been added.</p>'}</section><button class="primary" style="width:100%;margin-top:20px" data-action="new-fee-entry">Add receipt or note</button></main>${bottomNav()}</section>`;
}
function reportCardsPage() {
 const result = state.results.find(item => Number(item.semester) === Number(selectedResultSemester)) || state.results[0];
 const published = result.status !== 'NOT PUBLISHED';
 const courses = result.courses.length ? result.courses.map(course => `<tr><td>${escapeHtml(course.code)}</td><td>${escapeHtml(course.name)}</td><td>${escapeHtml(course.credit)}</td><td><b>${escapeHtml(course.grade)}</b></td></tr>`).join('') : `<tr><td colspan="4" class="pending-cell">Results have not been published for this semester.</td></tr>`;
 return `<section class="shell report-screen">${topbar('Report Card',{light:true})}<section class="hero-blue"><h1>Grade Card List</h1></section><main class="content-overlap"><section class="card report-filter"><label class="field">Select Semester <select id="result-semester">${state.results.map(item => `<option value="${item.semester}" ${Number(item.semester)===Number(selectedResultSemester)?'selected':''}>Semester ${item.semester}</option>`).join('')}</select></label><label class="field">Select Session <select><option>${escapeHtml(result.session)}</option><option>Regular</option></select></label></section><section class="card result-card"><div class="result-heading"><span><small>Semester ${result.semester}</small><h2 class="${published ? '' : 'not-published'}">${escapeHtml(result.status)}</h2></span><span class="result-score"><small>CGPA</small><b>${escapeHtml(result.cgpa || '—')}</b></span></div><div class="result-meta"><span>SGPA <b>${escapeHtml(result.sgpa || '—')}</b></span><span>Session <b>${escapeHtml(result.session)}</b></span></div><div class="result-table-wrap"><table class="result-table"><thead><tr><th>Course code</th><th>Course name</th><th>Credit</th><th>Grade</th></tr></thead><tbody>${courses}</tbody></table></div><div class="result-actions"><button class="secondary" data-action="edit-result" data-result-sem="${result.semester}">Edit result</button>${published ? `<button class="primary" data-action="download-result" data-result-sem="${result.semester}">↓ Download result</button>` : ''}</div></section><section class="semester-downloads"><h3>Download published semesters</h3>${state.results.filter(item => item.status !== 'NOT PUBLISHED').map(item => `<button data-action="download-result" data-result-sem="${item.semester}">Semester ${item.semester}<span>↓</span></button>`).join('')}</section></main>${bottomNav()}</section>`;
}
function profilePage() {
 const rows = [['Personal Info','Father name, Mother name, Email, DOB, Nationality, Phone, Gender, Religion'],['University Information','Admission, Application, Semester, Division, Class'],['Address','Local / Present Address, Permanent Address, City, State, Pincode, Country'],['Update ABC ID','Update ABC ID'],['Upload Documents','Upload Documents']];
 return `<section class="shell">${topbar('Profile')}<section class="profile-hero">${avatar()}<button class="profile-edit-trigger" data-action="edit-profile">Edit profile</button><button class="secondary" style="display:block;margin:10px auto -3px;border-color:white;background:transparent;color:white" data-action="change-avatar">Change photo</button><h1>${escapeHtml(state.profile.name)}</h1><p>${escapeHtml(state.profile.section)}</p><div class="roll-pill">${escapeHtml(state.profile.roll)}</div></section><main class="profile-list">${rows.map(([a,b])=>`<button class="profile-row" data-profile-item="${a}"><span>${icon(a)}</span><span><strong>${a}</strong><small>${b}</small></span><span class="chevron">›</span></button>`).join('')}</main>${bottomNav()}</section>`;
}
function personalInfoPage() {
 const info = [['Father Name','father'],['Mother Name','mother'],['Email','email'],['DOB','dob'],['Nationality','nationality'],['Phone','phone'],['Gender','gender'],['Religion','religion']];
 return `<section class="shell">${topbar('Personal Information')}<main class="page">${info.map(([label,key])=>`<section class="card info-card"><span>${label}</span><p>${escapeHtml(state.profile[key])}</p></section>`).join('')}<div class="editor-actions"><button class="primary" data-action="edit-personal">Edit information</button></div></main>${bottomNav()}</section>`;
}
function notificationsPage() {
 return `<section class="shell">${topbar('Notifications',{back:false})}<main class="page"><section class="card list-editor"><h3>Notifications</h3>${state.notifications.length ? state.notifications.map((n,i)=>`<div class="list-entry"><span class="entry-thumb">♟</span><span class="entry-content"><strong>${escapeHtml(n.title)}</strong><small>${escapeHtml(n.text)} · ${escapeHtml(n.date)}</small></span><button class="delete-entry" data-delete-notification="${i}" aria-label="Delete notification">×</button></div>`).join(''):'<p class="empty">No notifications yet.</p>'}</section><button class="primary" style="width:100%;margin-top:20px" data-action="new-notification">Add notification</button></main>${bottomNav('notifications')}</section>`;
}
function modulePage() {
 const records = state.records[currentModule] || [];
 return `<section class="shell data-screen">${topbar(currentModule)}<main class="page"><section class="card"><h2 style="margin:0 0 8px">${escapeHtml(currentModule)}</h2><p style="color:var(--muted);line-height:1.45;margin:0">Use this project space to add, edit, and remove your own ${escapeHtml(currentModule.toLowerCase())} data. Media stays stored locally in this browser.</p></section><section class="card list-editor" style="margin-top:20px"><h3>Your entries</h3>${records.length ? records.map((r,i)=>`<div class="list-entry">${r.media && r.mediaType?.startsWith('image/') ? `<img class="entry-thumb" src="${r.media}" alt="">` : `<span class="entry-thumb">${r.media ? '▣' : icon(currentModule)}</span>`}<span class="entry-content"><strong>${escapeHtml(r.title)}</strong><small>${escapeHtml(r.detail || r.mediaName || 'No details')}</small></span><button class="delete-entry" data-delete-record="${i}" aria-label="Delete entry">×</button></div>`).join(''):'<p class="empty">No entries yet. Add your first item below.</p>'}</section><button class="primary" style="width:100%;margin-top:20px" data-action="new-record">Add ${escapeHtml(currentModule)}</button></main>${bottomNav()}</section>`;
}

function drawer() {
 const daily = ['Attendance','Timetable']; const campus = ['Notifications','Holidays']; const assessment = ['Admit Card','Exam Form','Performance','Report Card'];
 const group = (title, items) => `<section class="drawer-group"><h2>${title}</h2>${items.map(x=>`<button class="drawer-link" data-module="${x}"><span class="drawer-icon">${icon(x)}</span><span>${x}</span><em>›</em></button>`).join('')}</section>`;
 return `<div class="drawer-backdrop" data-action="close-drawer"><aside class="drawer" role="dialog" aria-label="Navigation menu" onclick="event.stopPropagation()"><section class="account-banner">${avatar('small-avatar')}<span><strong>${escapeHtml(state.profile.name)}</strong><span>${escapeHtml(state.profile.roll)}</span></span><b>›</b></section><section class="drawer-account-actions"><button data-page="profile"><span>${icon('My Account')}</span>My Account</button><button data-action="support"><span>${icon('Support')}</span>Support</button><button data-action="logout"><span>${icon('Sign Out')}</span>Sign Out</button></section>${group('Daily Routine',daily)}${group('Campus & Events',campus)}${group('Assessment Hub',assessment)}</aside></div>`;
}
function showModal(inner) { document.body.insertAdjacentHTML('beforeend', `<div class="modal-backdrop" data-action="modal-close"><section class="modal" onclick="event.stopPropagation()">${inner}</section></div>`); }
function closeModal() { $('.modal-backdrop')?.remove(); }
function toast(message) { const region = $('#toast-region'); region.innerHTML = `<div class="toast">${escapeHtml(message)}</div>`; setTimeout(() => region.innerHTML = '', 2800); }
function downloadPdf(filename, title, lines) {
 const clean = value => String(value ?? '').replace(/[^\x20-\x7E]/g, '').replace(/\\/g, '\\\\').replace(/[()]/g, '\\$&');
 const content = [`BT /F1 18 Tf 48 795 Td (${clean(title)}) Tj`, `/F1 10 Tf 0 -29 Td (Generated by iCloudEMS Student Portal) Tj`];
 lines.forEach((line, index) => { if (!index || index % 45 !== 0) content.push(`0 -15 Td (${clean(line)}) Tj`); });
 content.push('ET');
 const stream = content.join('\n');
 const objects = ['<< /Type /Catalog /Pages 2 0 R >>', '<< /Type /Pages /Kids [3 0 R] /Count 1 >>', '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>', '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>', `<< /Length ${stream.length} >>\nstream\n${stream}\nendstream`];
 let pdf = '%PDF-1.4\n'; const offsets = [0];
 objects.forEach((object, index) => { offsets.push(pdf.length); pdf += `${index + 1} 0 obj\n${object}\nendobj\n`; });
 const xref = pdf.length; pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n${offsets.slice(1).map(offset => `${String(offset).padStart(10,'0')} 00000 n \n`).join('')}trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF`;
 const link = document.createElement('a'); link.href = URL.createObjectURL(new Blob([pdf], {type:'application/pdf'})); link.download = filename; document.body.append(link); link.click(); link.remove(); setTimeout(() => URL.revokeObjectURL(link.href), 1000);
}
function downloadReceipt(index) {
 const receipt = state.receipts[index]; if (!receipt) return;
 downloadPdf(`${receipt.number}.pdf`, 'FEE PAYMENT RECEIPT', [`Receipt number: ${receipt.number}`, `Student name: ${state.profile.name}`, `Roll number: ${state.profile.roll}`, `Class: ${state.profile.className}`, `Payment date: ${receipt.date}`, `Amount paid: INR ${Number(receipt.amount).toLocaleString('en-IN')}`, '', 'This is a locally generated project-demo receipt.']); toast('Fee receipt downloaded as PDF.');
}
function downloadResult(semester) {
 const result = state.results.find(item => Number(item.semester) === Number(semester)); if (!result) return;
 const lines = [`Student name: ${state.profile.name}`, `Roll number: ${state.profile.roll}`, `Class: ${state.profile.className}`, `Semester: ${result.semester}`, `Session: ${result.session}`, `Status: ${result.status}`, `SGPA: ${result.sgpa || 'Pending'}`, `CGPA: ${result.cgpa || 'Pending'}`, '', 'COURSE RESULTS'];
 result.courses.forEach(item => lines.push(`${item.code} | ${item.name} | Credit ${item.credit} | Grade ${item.grade}`));
 downloadPdf(`semester-${result.semester}-result.pdf`, `SEMESTER ${result.semester} GRADE CARD`, lines); toast(`Semester ${result.semester} result downloaded as PDF.`);
}
function go(page) { current = page; render(); window.scrollTo(0,0); }
function openModule(name) {
  if (name === 'Attendance') return go('attendance');
  if (name === 'Timetable') return go('timetable');
  if (name === 'Fees') return go('fees');
  if (name === 'Notifications') return go('notifications');
  if (name === 'Report Card') return go('reportCards');
  currentModule = name; go('module');
}
function editPersonalModal() {
 const f = state.profile;
 showModal(`<h2>Edit personal information</h2><form id="personal-form"><label class="field">Father Name<input name="father" required value="${escapeHtml(f.father)}"></label><label class="field">Mother Name<input name="mother" required value="${escapeHtml(f.mother)}"></label><label class="field">Email<input name="email" type="email" required value="${escapeHtml(f.email)}"></label><label class="field">DOB<input name="dob" value="${escapeHtml(f.dob)}"></label><label class="field">Phone<input name="phone" value="${escapeHtml(f.phone)}"></label><label class="field">Gender<select name="gender"><option ${f.gender==='Male'?'selected':''}>Male</option><option ${f.gender==='Female'?'selected':''}>Female</option><option ${f.gender==='Other'?'selected':''}>Other</option></select></label><label class="field">Religion<input name="religion" value="${escapeHtml(f.religion)}"></label><div class="buttons"><button type="button" class="secondary" data-action="modal-close">Cancel</button><button class="primary">Save changes</button></div></form>`);
}
function editProfileModal() {
 const f = state.profile;
 const input = (label, key, type = 'text') => `<label class="field">${label}<input name="${key}" type="${type}" value="${escapeHtml(f[key] || '')}"></label>`;
 const area = (label, key) => `<label class="field">${label}<textarea name="${key}">${escapeHtml(f[key] || '')}</textarea></label>`;
 showModal(`<h2>Edit all student information</h2><form id="profile-main-form"><h3 class="form-group-title">Student details</h3>${input('Full name','name')}${input('Roll / PRN number','roll')}${input('Section / division','section')}${input('Email address','email','email')}${input('Phone number','phone')}${input('Date of birth','dob')}<label class="field">Gender<select name="gender"><option ${f.gender==='Male'?'selected':''}>Male</option><option ${f.gender==='Female'?'selected':''}>Female</option><option ${f.gender==='Other'?'selected':''}>Other</option></select></label>${input('Nationality','nationality')}${input('Religion','religion')}<h3 class="form-group-title">Family & university</h3>${input('Father name','father')}${input('Mother name','mother')}${input('Admission number','admission')}${input('Application number','application')}${input('Class','className')}${area('Programme','programme')}<h3 class="form-group-title">Address & IDs</h3>${area('Current address','localAddress')}${area('Permanent address','permanentAddress')}${input('City','city')}${input('State','state')}${input('Pincode','pincode')}${input('Country','country')}${input('ABC ID','abcId')}<div class="buttons"><button type="button" class="secondary" data-action="modal-close">Cancel</button><button class="primary">Save all changes</button></div></form>`);
}
function editResultModal(semester) {
 const result = state.results.find(item => Number(item.semester) === Number(semester));
 if (!result) return;
 const courses = result.courses.map(item => `${item.code} | ${item.name} | ${item.credit} | ${item.grade}`).join('\n');
 showModal(`<h2>Edit semester ${semester} result</h2><form id="result-form" data-result-sem="${semester}"><div class="time-fields"><label class="field">SGPA<input name="sgpa" value="${escapeHtml(result.sgpa)}"></label><label class="field">CGPA<input name="cgpa" value="${escapeHtml(result.cgpa)}"></label></div><label class="field">Status<input name="status" value="${escapeHtml(result.status)}"></label><label class="field">Courses <small>One per line: code | course name | credit | grade</small><textarea name="courses" placeholder="R1UC101 | Course title | 4 | A">${escapeHtml(courses)}</textarea></label><div class="buttons"><button type="button" class="secondary" data-action="modal-close">Cancel</button><button class="primary">Save result</button></div></form>`);
}
function profileEditModal(type) {
 if (type === 'Upload Documents') return openModule('Upload Documents');
 if (type === 'Personal Info') return go('personal');
 const label = type === 'Address' ? 'Address' : type;
 const field = type === 'University Information' ? 'className' : type === 'Address' ? 'address' : 'abcId';
 showModal(`<h2>Edit ${label}</h2><form id="simple-profile-form"><label class="field">${type === 'Address' ? 'Current Address' : label}<textarea name="value" required>${escapeHtml(state.profile[field] || '')}</textarea></label><div class="buttons"><button type="button" class="secondary" data-action="modal-close">Cancel</button><button class="primary">Save changes</button></div></form>`);
 $('#simple-profile-form').dataset.field = field;
}
function newRecordModal() {
 showModal(`<h2>Add ${escapeHtml(currentModule)}</h2><form id="record-form"><label class="field">Title<input name="title" required placeholder="Title"></label><label class="field">Details<textarea name="detail" placeholder="Add details, dates, notes, or links"></textarea></label><label class="field">Media (optional)<button type="button" class="secondary" style="width:max-content" data-action="pick-media">Choose file</button><small id="media-name" style="font-weight:500;color:var(--muted)">No file selected</small></label><input name="media" type="hidden"><input name="mediaType" type="hidden"><input name="mediaName" type="hidden"><div class="buttons"><button type="button" class="secondary" data-action="modal-close">Cancel</button><button class="primary">Save entry</button></div></form>`);
}
function newFeeEntryModal() {
 showModal(`<h2>Add ${escapeHtml(activeFee)} note</h2><form id="fee-entry-form"><label class="field">Title<input name="title" required placeholder="Receipt or note title"></label><label class="field">Details<textarea name="detail" placeholder="Date, reference number, or note"></textarea></label><div class="buttons"><button type="button" class="secondary" data-action="modal-close">Cancel</button><button class="primary">Save entry</button></div></form>`);
}
function classModal(index = -1) {
 const item = index >= 0 ? state.timetable[index] : { date: dateKey(selectedScheduleDate), start: '09:00', end: '09:50', subject: '', code: '', teacher: '' };
 showModal(`<h2>${index >= 0 ? 'Edit class' : 'Add class'}</h2><form id="timetable-form" data-class-index="${index}"><label class="field">Date<input type="date" name="date" required value="${escapeHtml(item.date)}"></label><div class="time-fields"><label class="field">Start time<input type="time" name="start" required value="${escapeHtml(item.start)}"></label><label class="field">End time<input type="time" name="end" required value="${escapeHtml(item.end)}"></label></div><label class="field">Subject / class name<input name="subject" required placeholder="e.g. Data Structures (PP)" value="${escapeHtml(item.subject)}"></label><label class="field">Course code<input name="code" required placeholder="e.g. R1UD702B" value="${escapeHtml(item.code)}"></label><label class="field">Faculty name<input name="teacher" required placeholder="Faculty name" value="${escapeHtml(item.teacher)}"></label><div class="buttons"><button type="button" class="secondary" data-action="modal-close">Cancel</button><button class="primary">${index >= 0 ? 'Save class' : 'Add class'}</button></div></form>`);
}
function notificationModal() {
 showModal(`<h2>Add notification</h2><form id="notification-form"><label class="field">Title<input name="title" required></label><label class="field">Message<textarea name="text" required></textarea></label><div class="buttons"><button type="button" class="secondary" data-action="modal-close">Cancel</button><button class="primary">Publish</button></div></form>`);
}
function payment() {
 const amount = Number($('#fee-payment')?.value); const outstanding = state.fees.tuition + state.fees.exam - state.fees.paid;
 if (!amount || amount < 1 || amount > outstanding) return toast(`Enter an amount from ₹1 to ${money(outstanding)}.`);
 const now = new Date(); const receipt = { number: `RCP-${now.getFullYear()}-${String(state.receipts.length + 1).padStart(4,'0')}`, amount, date: now.toLocaleDateString('en-GB'), paidBy: state.profile.name };
 state.fees.paid += amount; state.receipts.unshift(receipt); state.records['All Fees'] = [{ title: `Payment receipt · ${money(amount)}`, detail: `${receipt.number} · ${receipt.date}` }, ...(state.records['All Fees'] || [])]; save(); toast(`Demo payment of ${money(amount)} recorded. Receipt is ready to download.`); setTimeout(() => { activeFee = 'All Fees'; go('feeLedger'); }, 700);
}

function bindPage() {
 $('#login-form')?.addEventListener('submit', event => { event.preventDefault(); const email = $('#login-email').value.trim(); state.profile.email = email; save(); go('home'); });
 $('#module-search')?.addEventListener('input', event => { const q = event.target.value.toLowerCase(); document.querySelectorAll('.module-trigger').forEach(node => node.hidden = !node.dataset.module.toLowerCase().includes(q)); });
 $('#attendance-form') && ($('#attendance-form').innerHTML = attendanceForm());
 $('#result-semester')?.addEventListener('change', event => { selectedResultSemester = Number(event.target.value); render(); });
}
function handleClick(event) {
 const target = event.target.closest('[data-action], [data-page], [data-module], [data-profile-item], [data-att-tab], [data-fee], [data-delete-record], [data-delete-fee-entry], [data-delete-notification]');
 if (!target) return;
 const { action, page, module, profileItem, attTab, fee, deleteRecord, deleteFeeEntry, deleteNotification } = target.dataset;
 if (target.closest('.drawer') && (page || module)) $('.drawer-backdrop')?.remove();
 if (page) go(page);
 else if (module) openModule(module);
 else if (profileItem) profileEditModal(profileItem);
 else if (attTab) { document.querySelectorAll('.tab-card').forEach(x=>x.classList.toggle('active',x.dataset.attTab===attTab)); $('#attendance-form').innerHTML = attendanceForm(attTab); }
 else if (fee) { activeFee = fee; fee === 'Academic Fees' ? go('academicFees') : go('feeLedger'); }
 else if (deleteRecord !== undefined) { state.records[currentModule].splice(Number(deleteRecord),1); save(); render(); }
 else if (deleteFeeEntry !== undefined) { state.records[activeFee].splice(Number(deleteFeeEntry),1); save(); render(); }
 else if (deleteNotification !== undefined) { state.notifications.splice(Number(deleteNotification),1); save(); render(); }
 else if (action === 'drawer') document.body.insertAdjacentHTML('beforeend', drawer());
 else if (action === 'close-drawer') $('.drawer-backdrop')?.remove();
 else if (action === 'back') { const hierarchy = {attendance:'home',attendanceDetails:'attendance',timetable:'home',fees:'home',academicFees:'fees',feeLedger:'fees',reportCards:'home',profile:'home',personal:'profile',notifications:'home',module:'home'}; go(hierarchy[current] || 'home'); }
 else if (action === 'refresh') toast('Portal data is up to date.');
 else if (action === 'scan') showModal(`<div class="qr-modal"><h2>Scan QR</h2><div class="qr-box" aria-label="Demo QR code"></div><p>Use your device camera to scan a campus QR code.</p><button class="primary" data-action="modal-close">Close</button></div>`);
 else if (action === 'modal-close') closeModal();
 else if (action === 'support') toast('Support request noted — this demo works offline.');
 else if (action === 'logout') { $('.drawer-backdrop')?.remove(); go('login'); toast('You have been signed out.'); }
 else if (action === 'attendance-search') go('attendanceDetails');
 else if (action === 'pay') payment();
 else if (action === 'edit-personal') editPersonalModal();
 else if (action === 'edit-profile') editProfileModal();
 else if (action === 'new-record') newRecordModal();
 else if (action === 'new-fee-entry') newFeeEntryModal();
 else if (action === 'new-notification') notificationModal();
 else if (action === 'download-receipt') downloadReceipt(Number(target.dataset.receiptIndex));
 else if (action === 'download-result') downloadResult(Number(target.dataset.resultSem));
 else if (action === 'edit-result') editResultModal(Number(target.dataset.resultSem));
 else if (action === 'add-class') classModal();
 else if (action === 'edit-class') classModal(Number(target.dataset.classIndex));
 else if (action === 'delete-class') { state.timetable.splice(Number(target.dataset.classIndex), 1); save(); render(); toast('Class removed from your timetable.'); }
 else if (action === 'select-schedule-day') { const [year, month, day] = target.dataset.date.split('-').map(Number); selectedScheduleDate = new Date(year, month - 1, day, 12); render(); }
 else if (action === 'pick-media') { picker.dataset.mode = 'record'; picker.accept = 'image/*,video/*,audio/*,.pdf,.doc,.docx'; picker.click(); }
 else if (action === 'change-avatar') { picker.dataset.mode = 'avatar'; picker.accept = 'image/*'; picker.click(); }
 else if (action === 'report-submit') { closeModal(); currentModule = 'Report Card'; go('module'); }
 else if (action === 'week-prev') { selectedScheduleDate = dateOffset(selectedScheduleDate, -7); render(); }
 else if (action === 'week-next') { selectedScheduleDate = dateOffset(selectedScheduleDate, 7); render(); }
 else if (action === 'month-prev' || action === 'month-next') { const direction = action === 'month-next' ? 1 : -1; selectedScheduleDate = new Date(selectedScheduleDate.getFullYear(), selectedScheduleDate.getMonth() + direction, selectedScheduleDate.getDate(), 12); render(); }
}

document.addEventListener('submit', event => {
 if (event.target.id === 'personal-form') { event.preventDefault(); const data = Object.fromEntries(new FormData(event.target)); Object.assign(state.profile,data); save(); closeModal(); render(); toast('Personal information updated.'); }
 if (event.target.id === 'profile-main-form') { event.preventDefault(); const data = Object.fromEntries(new FormData(event.target)); Object.assign(state.profile,data); save(); closeModal(); render(); toast('Your name and student details are updated.'); }
 if (event.target.id === 'simple-profile-form') { event.preventDefault(); const field = event.target.dataset.field; state.profile[field] = new FormData(event.target).get('value'); save(); closeModal(); render(); toast('Profile updated.'); }
 if (event.target.id === 'record-form') { event.preventDefault(); const data = Object.fromEntries(new FormData(event.target)); state.records[currentModule] ||= []; state.records[currentModule].unshift(data); save(); closeModal(); render(); toast('Entry saved locally.'); }
 if (event.target.id === 'fee-entry-form') { event.preventDefault(); const data = Object.fromEntries(new FormData(event.target)); state.records[activeFee] ||= []; state.records[activeFee].unshift(data); save(); closeModal(); render(); toast('Fee entry saved locally.'); }
 if (event.target.id === 'notification-form') { event.preventDefault(); const data = Object.fromEntries(new FormData(event.target)); state.notifications.unshift({ ...data, date: 'Just now' }); save(); closeModal(); render(); toast('Notification added.'); }
 if (event.target.id === 'timetable-form') { event.preventDefault(); const form = event.target; const data = Object.fromEntries(new FormData(form)); const index = Number(form.dataset.classIndex); if (data.end <= data.start) return toast('End time must be later than start time.'); if (index >= 0) state.timetable[index] = data; else state.timetable.push(data); const [year, month, day] = data.date.split('-').map(Number); selectedScheduleDate = new Date(year, month - 1, day, 12); save(); closeModal(); render(); toast(index >= 0 ? 'Class updated.' : 'Class added to your timetable.'); }
 if (event.target.id === 'result-form') { event.preventDefault(); const form = event.target; const result = state.results.find(item => Number(item.semester) === Number(form.dataset.resultSem)); const data = Object.fromEntries(new FormData(form)); result.sgpa = data.sgpa; result.cgpa = data.cgpa; result.status = data.status; result.courses = data.courses.split('\n').map(line => line.split('|').map(part => part.trim())).filter(parts => parts.length === 4 && parts[0]).map(([code,name,credit,grade]) => ({code,name,credit,grade})); save(); closeModal(); render(); toast(`Semester ${result.semester} result updated.`); }
});
document.addEventListener('click', handleClick);
picker.addEventListener('change', () => {
 const file = picker.files?.[0]; if (!file) return;
 if (file.size > 3 * 1024 * 1024) { toast('Please choose media under 3 MB for local storage.'); picker.value = ''; return; }
 const reader = new FileReader(); reader.onload = () => {
   if (picker.dataset.mode === 'avatar') { state.profile.avatar = reader.result; save(); render(); toast('Profile photo updated.'); }
   else { const input = $('#record-form input[name="media"]'); if (input) input.value = reader.result; const type = $('#record-form input[name="mediaType"]'); const name = $('#record-form input[name="mediaName"]'); if (type) type.value = file.type; if (name) name.value = file.name; const label = $('#media-name'); if (label) label.textContent = file.name; }
   picker.value = '';
 }; reader.readAsDataURL(file);
});

render();
