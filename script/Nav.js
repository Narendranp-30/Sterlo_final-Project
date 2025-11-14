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


const themeBtn = document.getElementById("themeToggle1");

function initializeTheme() {
  const saved = localStorage.getItem("admin_theme") || "dark";
  setTheme(saved);

  themeBtn.addEventListener("click", () => {
    const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    setTheme(next);
    localStorage.setItem("admin_theme", next);
  });
}

function setTheme(theme) {
  document.documentElement.dataset.theme = theme;
  themeBtn.textContent = theme === "dark" ? "🌙" : "☀️";
}
