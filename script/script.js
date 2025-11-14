const CardDoms = {
  usersCount: document.getElementById('usersCount1'),
  salesAmount: document.getElementById('salesAmount1'),
  visitorsCount: document.getElementById('visitorsCount1'),
  navItems: document.querySelectorAll('.navItem1'),
  viewSections: document.querySelectorAll('.viewSection1'),
};

function initializeDashboard() {
  console.log('Retriving Admin Dashboard...');
  initializeTheme();
  initializeNavigation();
  initializeCharts();
  fetchKPIData();
  console.log('Dashboard initialized successfully!');
}

 document.addEventListener('DOMContentLoaded', initializeDashboard);



