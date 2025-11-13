const API_URL = 'https://mocki.io/v1/ce1c0dca-1ab4-46a4-a4a6-6790e6d201b8';
const THEME_KEY = 'admin_theme_v1';

const CardDoms = {
  usersCount: document.getElementById('usersCount1'),
  salesAmount: document.getElementById('salesAmount1'),
  visitorsCount: document.getElementById('visitorsCount1'),
  navItems: document.querySelectorAll('.navItem1'),
  viewSections: document.querySelectorAll('.viewSection1'),
};

function initializeDashboard() {
  console.log('Initializing Admin Dashboard...');
  initializeTheme();
  initializeNavigation();
  initializeCharts();
  fetchKPIData();
  startAutoRefresh();
  addStatusBadgeStyles();
  console.log('Dashboard initialized successfully!');
  alert('Dashboard loaded successfully', 'success');
}

 document.addEventListener('DOMContentLoaded', initializeDashboard);

// window.addEventListener('resize', () => {
//   if (salesChartInstance) salesChartInstance.resize();
//   if (userChartInstance) userChartInstance.resize();
// });

