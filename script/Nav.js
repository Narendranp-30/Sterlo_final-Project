function initializeNavigation() {
  const adminClick = document.querySelector('[data-section="dashboardView1"]');
  const activityClick = document.querySelector('[data-section="activityView1"]');
  const dashboardTab = document.getElementById('dashboardView1');
  const activityTab = document.getElementById('activityView1');

  adminClick.addEventListener('click', () => {
    dashboardTab.style.display = 'block';
    activityTab.style.display = 'none';

    adminClick.classList.add('active1');
    activityClick.classList.remove('active1');
    if (typeof updatePageTitle === 'function') {
      updatePageTitle('Dashboad');
    }
  });

  activityClick.addEventListener('click', () => {
    dashboardTab.style.display = 'none';
    activityTab.style.display = 'block';

    activityClick.classList.add('active1');
    adminClick.classList.remove('active1');

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
