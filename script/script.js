const API_URL = 'https://mocki.io/v1/ce1c0dca-1ab4-46a4-a4a6-6790e6d201b8';
const THEME_KEY = 'admin_theme_v1';

const elements = {
  usersCount: document.getElementById('usersCount1'),
  salesAmount: document.getElementById('salesAmount1'),
  visitorsCount: document.getElementById('visitorsCount1'),
  navItems: document.querySelectorAll('.navItem1'),
  viewSections: document.querySelectorAll('.viewSection1'),
  themeToggle: document.getElementById('themeToggle1'),
  salesChart: document.getElementById('salesChart1'),
  userChart: document.getElementById('userChart1'),
  activityTableBody: document.getElementById('activityTableBody1'),
  filterSelect: document.getElementById('filterSelect1'),
  timePeriodSelect: document.getElementById('timePeriodSelect1'),
  dayFilter: document.getElementById('dayFilter1'),
  monthFilter: document.getElementById('monthFilter1'),
  dateFilter: document.getElementById('dateFilter1'),
  resetFilters: document.getElementById('resetFilters1')
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

window.addEventListener('resize', () => {
  if (salesChartInstance) salesChartInstance.resize();
  if (userChartInstance) userChartInstance.resize();
});

