
// Navigation System


function initializeNavigation() {
  elements.navItems.forEach(navItem => {
    navItem.addEventListener('click', (e) => {
      e.preventDefault();
      
      // Remove active class 
      elements.navItems.forEach(item => item.classList.remove('active1'));
      
      // Add active class 
      navItem.classList.add('active1');
      
      // Get target section
      const targetSection = navItem.dataset.section;
      
      // Hide all sections first
      document.querySelectorAll('.viewSection1').forEach(section => {
        section.classList.add('hidden1');
      });
      
      // Show target section
      const targetElement = document.getElementById(targetSection);
      if (targetElement) {
        targetElement.classList.remove('hidden1');
        
        // Load all activities when activity view is shown
        if (targetSection === 'activityView1') {
          updateAllActivityTable();
        }
      }
      
      // Update page title based on section
      updatePageTitle(navItem.textContent.trim());
    });
  });
}

function updatePageTitle(sectionName) {
  const pageTitle = document.querySelector('.pageTitle1');
  if (pageTitle) {
    pageTitle.textContent = `${sectionName} Dashboard`;
  }
}


// Theme Management


function initializeTheme() {
  const savedTheme = localStorage.getItem(THEME_KEY) || 'dark';
  applyTheme(savedTheme);
  
  elements.themeToggle.addEventListener('click', toggleTheme);
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  
  applyTheme(newTheme);
  localStorage.setItem(THEME_KEY, newTheme);
  
  // theme button icon
  elements.themeToggle.textContent = newTheme === 'dark' ? '🌙' : '☀️';
  
 // showNotification(`Switched to ${newTheme} theme`, 'success');
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  elements.themeToggle.textContent = theme === 'dark' ? '🌙' : '☀️';
}
