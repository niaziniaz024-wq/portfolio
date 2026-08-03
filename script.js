const body = document.body;
const toggleButton = document.querySelector('.theme-toggle');
const themeIcon = document.querySelector('.theme-icon');
const yearElement = document.getElementById('year');
const revealItems = document.querySelectorAll('.reveal');

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

const applyTheme = (isLight) => {
  body.classList.toggle('light-mode', isLight);
  if (themeIcon) {
    themeIcon.textContent = isLight ? '🌙' : '☀️';
  }
};

const savedTheme = localStorage.getItem('portfolio-theme');
if (savedTheme === 'light') {
  applyTheme(true);
}

if (toggleButton) {
  toggleButton.addEventListener('click', () => {
    const isLight = !body.classList.contains('light-mode');
    applyTheme(isLight);
    localStorage.setItem('portfolio-theme', isLight ? 'light' : 'dark');
  });
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

revealItems.forEach((item) => observer.observe(item));

document.querySelector('.contact-form')?.addEventListener('submit', (event) => {
  event.preventDefault();
  const button = event.currentTarget.querySelector('button[type="submit"]');
  if (button) {
    const originalText = button.textContent;
    button.textContent = 'Message Sent';
    button.disabled = true;
    setTimeout(() => {
      button.textContent = originalText;
      button.disabled = false;
      event.currentTarget.reset();
    }, 1800);
  }
});
