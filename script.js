const body = document.body;
const toggleButton = document.querySelector('.theme-toggle');
const themeIcon = document.querySelector('.theme-icon');
const yearElement = document.getElementById('year');
const revealItems = document.querySelectorAll('.reveal');
const profilePortrait = document.querySelector('.profile-portrait');
const avatarCircle = document.querySelector('.avatar-circle');

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

if (profilePortrait && avatarCircle) {
  profilePortrait.addEventListener('load', () => {
    avatarCircle.style.opacity = '0';
    avatarCircle.style.visibility = 'hidden';
    avatarCircle.style.display = 'grid';
  });

  profilePortrait.addEventListener('error', () => {
    profilePortrait.style.display = 'none';
    avatarCircle.style.opacity = '1';
    avatarCircle.style.visibility = 'visible';
    avatarCircle.style.display = 'grid';
  });
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

document.querySelector('.contact-form')?.addEventListener('submit', () => {
  const button = document.querySelector('.contact-form button[type="submit"]');
  if (button) {
    const originalText = button.textContent;
    button.textContent = 'Sending...';
    button.disabled = true;

    setTimeout(() => {
      button.textContent = 'Sent';
    }, 1000);

    setTimeout(() => {
      button.textContent = originalText;
      button.disabled = false;
    }, 5000);
  }
});
