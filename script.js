"use strict";
const translations = {
  "ru": {
    "skip": "К содержимому",
    "projects": "Проекты",
    "eyebrow": "ЛИЧНАЯ СТРАНИЦА · ИГРЫ И ДИЗАЙН",
    "title": "Идеи, которыми<br>хочется <em>поделиться.</em>",
    "intro": "Я — Юлия Логинова. Здесь собраны мои проекты:<br class=\"desktop-break\"> игра для любителей логики и знак с заботой о чистом воздухе.",
    "myProjects": "Мои проекты",
    "tryNow": "Можно попробовать прямо сейчас",
    "gameTag": "ЛОГИЧЕСКАЯ ИГРА",
    "gameTitle": "Охота на лис",
    "gameText": "Лисы спрятались на поле. Читайте подсказки, проводите лучи и находите их с помощью логики.",
    "gameButton": "Об игре и играть",
    "gameDetail": "В браузере · без установки",
    "signTag": "ЗНАК ДЛЯ ЧИСТОГО ВОЗДУХА",
    "signText": "Дружелюбный знак для пространств без дыма. Улыбающееся облако, листья и немного заботы друг о друге.",
    "signButton": "Посмотреть и скачать",
    "footer": "Сделано с любопытством.",
    "pageTitle": "Iuliia Loginova — игры и дизайн",
    "description": "Проекты Юлии Логиновой: логическая игра «Охота на лис» и знак Prostor bez dima. Играть, знакомиться, скачивать.",
    "navigation": "Навигация"
  },
  "sr": {
    "skip": "Пређи на садржај",
    "projects": "Пројекти",
    "eyebrow": "ЛИЧНА СТРАНИЦА · ИГРЕ И ДИЗАЈН",
    "title": "Идеје које желим<br>да <em>поделим.</em>",
    "intro": "Ја сам Јулија Логинова. Овде су моји пројекти:<br class=\"desktop-break\"> игра за љубитеље логике и знак бриге о чистом ваздуху.",
    "myProjects": "Моји пројекти",
    "tryNow": "Испробајте их одмах",
    "gameTag": "ЛОГИЧКА ИГРА",
    "gameTitle": "Лов на лисице",
    "gameText": "Лисице су се сакриле на табли. Читајте трагове, пратите зраке и пронађите их уз помоћ логике.",
    "gameButton": "О игри и играј",
    "gameDetail": "У прегледачу · без инсталације",
    "signTag": "ЗНАК ЗА ЧИСТ ВАЗДУХ",
    "signText": "Пријатељски знак за просторе без дима. Насмејани облак, листови и мало бриге једних о другима.",
    "signButton": "Погледај и преузми",
    "footer": "Створено из радозналости.",
    "pageTitle": "Iuliia Loginova — игре и дизајн",
    "description": "Пројекти Јулије Логинове: логичка игра „Лов на лисице” и знак „Простор без дима”. Играјте, истражите, преузмите.",
    "navigation": "Навигација"
  },
  "en": {
    "skip": "Skip to content",
    "projects": "Projects",
    "eyebrow": "PERSONAL WEBSITE · GAMES & DESIGN",
    "title": "Ideas worth<br><em>sharing.</em>",
    "intro": "I’m Iuliia Loginova. Here are my projects:<br class=\"desktop-break\"> a game for logic lovers and a sign that cares about clean air.",
    "myProjects": "My projects",
    "tryNow": "Ready to explore",
    "gameTag": "LOGIC GAME",
    "gameTitle": "Fox Hunting",
    "gameText": "Foxes are hiding on the board. Read the clues, trace the rays and use logic to find them.",
    "gameButton": "Explore & play",
    "gameDetail": "In your browser · no installation",
    "signTag": "A SIGN FOR CLEAN AIR",
    "signText": "A friendly sign for smoke-free spaces. A smiling cloud, leaves and a little care for one another.",
    "signButton": "Explore & download",
    "footer": "Made with curiosity.",
    "pageTitle": "Iuliia Loginova — games & design",
    "description": "Projects by Iuliia Loginova: the Fox Hunting logic game and the Prostor bez dima sign. Play, explore and download.",
    "navigation": "Navigation"
  }
};

const htmlKeys = new Set(["title", "intro"]);
const supported = language => Object.hasOwn(translations, language);
function setLanguage(language, updateUrl = true) {
  const key = supported(language) ? language : "ru";
  const text = translations[key];
  document.documentElement.lang = key === "sr" ? "sr-Cyrl" : key;
  document.title = text.pageTitle;
  document.querySelector('meta[name="description"]').content = text.description;
  document.querySelector('meta[property="og:title"]').content = text.pageTitle;
  document.querySelector('meta[property="og:description"]').content = text.description;
  document.querySelectorAll('[data-i18n]').forEach(element => {
    const name = element.dataset.i18n;
    if (htmlKeys.has(name)) element.innerHTML = text[name];
    else element.textContent = text[name];
  });
  document.querySelectorAll('[data-i18n-alt]').forEach(element => { element.alt = text[element.dataset.i18nAlt]; });
  document.querySelectorAll('[data-i18n-label]').forEach(element => { element.setAttribute('aria-label', text[element.dataset.i18nLabel]); });
  document.querySelectorAll('[data-lang]').forEach(button => { button.setAttribute('aria-pressed', String(button.dataset.lang === key)); });
  document.querySelectorAll('[data-project-link]').forEach(link => {
    const url = new URL(link.href); url.searchParams.set('lang', key); link.href = url.href;
  });
  try { localStorage.setItem('loginyul-language', key); } catch (_) { /* Private browsing may disable storage. */ }
  if (updateUrl) {
    const url = new URL(location.href); url.searchParams.set('lang', key); history.replaceState(null, '', url);
  }
}
function initialLanguage() {
  const requested = new URLSearchParams(location.search).get('lang');
  if (supported(requested)) return requested;
  try { const saved = localStorage.getItem('loginyul-language'); if (supported(saved)) return saved; } catch (_) {}
  return 'ru';
}
document.querySelectorAll('[data-lang]').forEach(button => { button.addEventListener('click', () => setLanguage(button.dataset.lang)); });
window.addEventListener('pageshow', () => setLanguage(initialLanguage(), false));
setLanguage(initialLanguage(), false);
