function initializeNavigation() {
  const adminLink = document.querySelector('[data-section="dashboardView1"]');
  const activityLink = document.querySelector('[data-section="activityView1"]');
  const dashboardSection = document.getElementById('dashboardView1');
  const activitySection = document.getElementById('activityView1');

  adminLink.addEventListener('click', () => {
    dashboardSection.style.display = 'block';
    activitySection.style.display = 'none';

    adminLink.classList.add('active1');
    activityLink.classList.remove('active1');
    if (typeof updatePageTitle === 'function') {
      updatePageTitle('Dashboad');
    }
  });

  activityLink.addEventListener('click', () => {
    dashboardSection.style.display = 'none';
    activitySection.style.display = 'block';

    activityLink.classList.add('active1');
    adminLink.classList.remove('active1');

    if (typeof updateAllActivityTable === 'function') {
      updateAllActivityTable();
    }

    if (typeof updatePageTitle === 'function') {
      updatePageTitle('Activity');
    }
  });
}

function updatePageTitle(sectionName) {
  const pageTitle = document.querySelector('.pageTitle1');
  if (pageTitle) {
    pageTitle.textContent = `${sectionName} Dashboard`;
    t = `${sectionName} Dashboard`;
  }
}

function initializeTheme() {
  const savedTheme = localStorage.getItem(THEME_KEY) || 'dark';
  applyTheme(savedTheme);
  
  AllDoms.themeToggle.addEventListener('click', toggleTheme);
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  
  applyTheme(newTheme);
  localStorage.setItem(THEME_KEY, newTheme);

  AllDoms.themeToggle.textContent = newTheme === 'dark' ? '🌙' : '☀️';
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  AllDoms.themeToggle.textContent = theme === 'dark' ? '🌙' : '☀️';
}
