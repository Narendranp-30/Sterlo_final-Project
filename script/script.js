
// Admin Dashboard - 


// Global Variables and Configuration
const API_URL = 'https://mocki.io/v1/ce1c0dca-1ab4-46a4-a4a6-6790e6d201b8';
const THEME_KEY = 'admin_theme_v1';
const REFRESH_INTERVAL = 30000; // 30 seconds

// DOM Elements
const elements = {
  // API Cards
  usersCount: document.getElementById('usersCount1'),
  salesAmount: document.getElementById('salesAmount1'),
  visitorsCount: document.getElementById('visitorsCount1'),
  
  // Navigation
  navItems: document.querySelectorAll('.navItem1'),
  viewSections: document.querySelectorAll('.viewSection1'),
  themeToggle: document.getElementById('themeToggle1'),
  
  // Charts
  salesChart: document.getElementById('salesChart1'),
  userChart: document.getElementById('userChart1'),
  
  // Activity Table
  activityTableBody: document.getElementById('activityTableBody1'),
  refreshActivity: document.getElementById('refreshActivity1'),
  exportActivity: document.getElementById('exportActivity1'),
  
  // Filter Controls
  filterSelect: document.getElementById('filterSelect1'),
  timePeriodSelect: document.getElementById('timePeriodSelect1'),
  dayFilter: document.getElementById('dayFilter1'),
  monthFilter: document.getElementById('monthFilter1'),
  dateFilter: document.getElementById('dateFilter1'),
  resetFilters: document.getElementById('resetFilters1')
};

// // Chart instances
// let salesChartInstance = null;
// let userChartInstance = null;





// Filter Management

function initializeFilters() {
  if (elements.filterSelect) {
    elements.filterSelect.addEventListener('change', applyFilters);
  }
  
  if (elements.timePeriodSelect) {
    elements.timePeriodSelect.addEventListener('change', applyFilters);
  }
  
  if (elements.dayFilter) {
    elements.dayFilter.addEventListener('change', applyFilters);
  }
  
  if (elements.monthFilter) {
    elements.monthFilter.addEventListener('change', applyFilters);
  }
  
  if (elements.dateFilter) {
    elements.dateFilter.addEventListener('change', applyFilters);
  }
  
  if (elements.resetFilters) {
    elements.resetFilters.addEventListener('click', resetFilters);
  }
}

function applyFilters() {
  const filterType = elements.filterSelect?.value || 'all';
  const dayFilter = elements.dayFilter?.value || 'all';
  const monthFilter = elements.monthFilter?.value || 'all';
  const dateFilter = elements.dateFilter?.value || 'all';
  
  if (!window.dashboardData) return;
  
  // Get  cards
  const kpiCards = document.querySelectorAll('.kpiCard1');
  
  // Apply filter 
  kpiCards.forEach((card, index) => {
    const cardType = getCardType(index);
    
    if (filterType === 'all' || filterType === cardType) {
      card.classList.remove('filtered-out');
      card.style.display = 'block';
    } else {
      card.classList.add('filtered-out');
    }
  });
  
  // Apply filters to data
  const originalData = window.dashboardData;
  let filteredData = { ...originalData };
  
  // Filter by Day
  if (dayFilter !== 'all' && originalData.usersRawData.length > 0) {
    const dayData = originalData.usersRawData.find(item => item.day === dayFilter);
    filteredData.users = dayData ? dayData.value : 0;

    // Filter user distribution chart data for pie chart
    filteredData.userDistribution = dayData ? [
      { role: dayFilter, count: dayData.value }
    ] : [];
  }
  
  // Filter Sales by Month wise
  if (monthFilter !== 'all' && originalData.salesRawData.length > 0) {
    const monthData = originalData.salesRawData.find(item => item.month === monthFilter);
    filteredData.sales = monthData ? monthData.value : 0;

    // Filter sales chart data for line chart wise
    filteredData.salesData = monthData ? [monthData] : [];
  }
  
  // Filter Visitors by Date wise
  if (dateFilter !== 'all' && originalData.visitorsRawData.length > 0) {
    const dateData = originalData.visitorsRawData.find(item => item.date === dateFilter);
    filteredData.visitors = dateData ? dateData.value : 0;
  }
  
  // Update  filtered data final data
  updateKPICards(filteredData);
  updateCharts(filteredData);
  
  //  show filter status
  updateChartTitles(dayFilter, monthFilter, dateFilter);
  
  // Show notification
  const filterText = filterType === 'all' ? 'All metrics' : filterType;
  let filterDetails = [];
  if (dayFilter !== 'all') filterDetails.push(`Day: ${dayFilter}`);
  if (monthFilter !== 'all') filterDetails.push(`Month: ${monthFilter}`);
  if (dateFilter !== 'all') filterDetails.push(`Date: ${dateFilter}`);
  
  const detailText = filterDetails.length > 0 ? ` (${filterDetails.join(', ')})` : '';
  showNotification(`Filtered by: ${filterText}${detailText}`, 'info');
}

function getCardType(index) {
  const cardTypes = ['users', 'sales', 'visitors'];
  return cardTypes[index] || 'unknown';
}

function updateChartTitles(dayFilter, monthFilter, dateFilter) {
  // Update sales chart title
  const salesTitle = document.querySelector('.chartContainer1 .chartTitle1');
  if (salesTitle) {
    if (monthFilter !== 'all') {
      salesTitle.textContent = `Sales Trend - ${monthFilter} (Filtered)`;
    } else {
      salesTitle.textContent = 'Monthly Sales Trend';
    }
  }
  
  // Update user chart title
  const userTitle = document.querySelectorAll('.chartContainer1 .chartTitle1')[1];
  if (userTitle) {
    if (dayFilter !== 'all') {
      userTitle.textContent = `User Distribution - ${dayFilter} (Filtered)`;
    } else {
      userTitle.textContent = 'User Distribution';
    }
  }
}


function applyTimePeriodFilter(timePeriod) {
  if (!window.dashboardData) return;
  
  const originalData = window.dashboardData;
  let filteredData = { ...originalData };
  
 // Apply time-based multipliers (simulation)
  const multipliers = {
    today: 0.03, // ~1/30 of monthly
    week: 0.25,  // ~1/4 of monthly  
    month: 1,    // baseline
    quarter: 3,  // 3x monthly
    year: 12     // 12x monthly
  };
  
  const multiplier = multipliers[timePeriod] || 1;
  
  filteredData.users = Math.round(originalData.users * multiplier);
  filteredData.sales = Math.round(originalData.sales * multiplier);
  filteredData.visitors = Math.round(originalData.visitors * multiplier);
  
  // Update  filtered data
  updateKPICards(filteredData);
  updateCharts(filteredData);
}

function resetFilters() {
  // Reset filter controls
  if (elements.filterSelect) {
    elements.filterSelect.value = 'all';
  }
  
  if (elements.timePeriodSelect) {
    elements.timePeriodSelect.value = 'all';
  }
  
  if (elements.dayFilter) {
    elements.dayFilter.value = 'all';
  }
  
  if (elements.monthFilter) {
    elements.monthFilter.value = 'all';
  }
  
  if (elements.dateFilter) {
    elements.dateFilter.value = 'all';
  }
  
  // Remove all filter classes
  const kpiCards = document.querySelectorAll('.kpiCard1');
  kpiCards.forEach(card => {
    card.classList.remove('filtered-out');
    card.style.display = 'block';
  });
  
  // Reset original data
  if (window.dashboardData) {
    // chart data is restored
    const originalData = { ...window.dashboardData };
    
    // Ensure chart data is properly restored
    if (originalData.salesRawData) {
      originalData.salesData = originalData.salesRawData;
    }
    if (originalData.usersRawData) {
      // Restored the full user distribution for the  pie chart section
      const dayMapping = {
        'Mon': 'Monday',
        'Tue': 'Tuesday', 
        'Wed': 'Wednesday',
        'Thu': 'Thursday',
        'Fri': 'Friday',
        'Sat': 'Saturday',
        'Sun': 'Sunday'
      };
      
      originalData.userDistribution = originalData.usersRawData.map(item => ({
        role: dayMapping[item.day] || item.day,
        count: item.value
      }));
    }
    
    updateKPICards(originalData);
    updateCharts(originalData);
  }
  
  // Reset chart titles
  updateChartTitles('all', 'all', 'all');
  
  showNotification('Filters reset', 'success');
}


// Activity Management


function initializeActivityManagement() {
  if (elements.refreshActivity) {
    elements.refreshActivity.addEventListener('click', () => {
      fetchKPIData();
      showNotification('Activity data refreshed', 'success');
    });
  }
  
  if (elements.exportActivity) {
    elements.exportActivity.addEventListener('click', exportActivityData);
  }
  
  // Activity view refresh button
  const refreshAllActivity = document.getElementById('refreshAllActivity1');
  if (refreshAllActivity) {
    refreshAllActivity.addEventListener('click', () => {
      updateAllActivityTable();
      showNotification('All activities refreshed', 'success');
    });
  }
  
  // Activity view export button
  const exportAllActivity = document.getElementById('exportAllActivity1');
  if (exportAllActivity) {
    exportAllActivity.addEventListener('click', exportAllActivityData);
  }
}

function exportActivityData() {
  const activities = generateMockActivities();
  const csvContent = convertToCSV(activities);
  downloadCSV(csvContent, 'activity-log.csv');
  showNotification('Activity data exported', 'success');
}

function exportAllActivityData() {
  const activities = generateAllActivities();
  const csvContent = convertToCSV(activities);
  downloadCSV(csvContent, 'all-activities.csv');
  showNotification('All activity data exported', 'success');
}

function convertToCSV(data) {
  const headers = ['ID', 'Title', 'Type', 'Status', 'Date', 'User'];
  const csvRows = [headers.join(',')];
  
  data.forEach(activity => {
    const row = [
      activity.id,
      `"${activity.title}"`,
      activity.type,
      activity.status,
      formatDate(activity.date),
      `"${activity.user}"`
    ];
    csvRows.push(row.join(','));
  });
  
  return csvRows.join('\n');
}

function downloadCSV(content, filename) {
  const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}





// Initialization


function initializeDashboard() {
  console.log('Initializing Admin Dashboard...');
  
  
  initializeTheme();
  initializeNavigation();
  initializeCharts();
  initializeActivityManagement();
  initializeFilters();
  
  
  fetchKPIData();
  

  startAutoRefresh();

  addStatusBadgeStyles();
  
  console.log('Dashboard initialized successfully!');
  showNotification('Dashboard loaded successfully', 'success');
}

function addStatusBadgeStyles() {
  const style = document.createElement('style');
  style.textContent = `
    .status-badge {
      padding: 0.25rem 0.75rem;
      border-radius: 12px;
      font-size: 0.75rem;
      font-weight: 500;
      text-transform: capitalize;
    }
    
    .status-badge.success { background: rgba(16, 185, 129, 0.2); color: #10b981; }
    .status-badge.pending { background: rgba(245, 158, 11, 0.2); color: #f59e0b; }
    .status-badge.error { background: rgba(239, 68, 68, 0.2); color: #ef4444; }
    .status-badge.scheduled { background: rgba(124, 58, 237, 0.2); color: #7c3aed; }
    
    .status-badge.security { background: rgba(239, 68, 68, 0.2); color: #ef4444; }
    .status-badge.system { background: rgba(16, 185, 129, 0.2); color: #10b981; }
    .status-badge.support { background: rgba(245, 158, 11, 0.2); color: #f59e0b; }
    .status-badge.payment { background: rgba(124, 58, 237, 0.2); color: #7c3aed; }
     .status-badge.user { background: rgba(124, 58, 237, 0.2); color: #23f4fbff; }
      .status-badge.failed { background: rgba(235, 87, 74, 1); color: #9a0000ff; }
       .status-badge.completed { background: rgba(67, 241, 3, 1); color: #7c3aed; }

  `;
  document.head.appendChild(style);
}





// DOM  fully loadedind
document.addEventListener('DOMContentLoaded', initializeDashboard);

//  responsive charts
window.addEventListener('resize', () => {
  if (salesChartInstance) salesChartInstance.resize();
  if (userChartInstance) userChartInstance.resize();
});

// Handle visibility change to pause/resume auto-refresh
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    console.log('Dashboard hidden - pausing auto-refresh');
  } else {
    console.log('Dashboard visible - resuming auto-refresh');
    fetchKPIData(); 
  }
});