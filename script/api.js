// API Data Fetching

async function fetchKPIData() {
  try {
    // Show loading
    showLoadingState();
    
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const apiData = await response.json();
    
   
    const transformedData = transformAPIData(apiData);
    
    updateKPICards(transformedData);
    //  updateAvgSalaryPerUser(transformedData);
    updateCharts(transformedData);
    updateActivityTable(transformedData.activities || generateMockActivities());
    
    
    hideLoadingState();
    
    showNotification('Data refreshed from API', 'success');
    
  } catch (error) {
    console.error('Error fetching KPI data:', error);
    hideLoadingState();
    showNotification('Failed to load data from API', 'error');
  }
}


function transformAPIData(apiData) {
 
  let usersData = null, salesData = null, visitorsData = null;
  
  for (let i = 0; i < apiData.kpis.length; i++) {
    const item = apiData.kpis[i];
    if (item.id === 1 && item.title === "Users") usersData = item;
    if (item.id === 2 && item.title === "Sales") salesData = item;
    if (item.id === 3 && item.title === "Visitors") visitorsData = item;
  }
  
  function sumValues(data) {
    if (!data) return 0;
    let total = 0;
    for (let i = 0; i < data.length; i++) {
      total += data[i].value || 0;
    }
    return total;
  }

  return {
    users: sumValues(usersData ? usersData.data : null),
    sales: sumValues(salesData ? salesData.data : null),
    visitors: sumValues(visitorsData ? visitorsData.data : null),
    
    usersRawData: usersData ? usersData.data : [],
    salesRawData: salesData ? salesData.data : [],
    visitorsRawData: visitorsData ? visitorsData.data : [],
    
    usersChange: usersData ? usersData.change : '+0%',
    salesChange: salesData ? salesData.change : '+0%',
    visitorsChange: visitorsData ? visitorsData.change : '+0%',
    
    salesData: salesData ? salesData.data : [],
    
    userDistribution: usersData ? [
      { role: 'Monday', count: getDayValue(usersData.data, 'Mon') },
      { role: 'Tuesday', count: getDayValue(usersData.data, 'Tue') },
      { role: 'Wednesday', count: getDayValue(usersData.data, 'Wed') },
      { role: 'Thursday', count: getDayValue(usersData.data, 'Thu') },
      { role: 'Friday', count: getDayValue(usersData.data, 'Fri') },
      { role: 'Saturday', count: getDayValue(usersData.data, 'Sat') },
      { role: 'Sunday', count: getDayValue(usersData.data, 'Sun') }
    ] : [],
    activities: generateMockActivities()
  };
}

function getDayValue(data, day) {
  for (let i = 0; i < data.length; i++) {
    if (data[i].day === day) return data[i].value || 0;
  }
  return 0;
}

function updateKPICards(data) {
 
  window.dashboardData = data;
  
  // Animate number
  animateNumber(elements.usersCount, data.users);
  animateNumber(elements.salesAmount, data.sales, '₹');
 
  animateNumber(elements.visitorsCount, data.visitors);
}



// function updateAvgSalaryPerUser(data){
//   if(!elements.avgSalaryPerUser) return;
//   const avgSalaryPerUser = data.sales/data.users;
//   animateNumber(elements.avgSalaryPerUser, avgSalaryPerUser, '₹');
// }

function animateNumber(element, targetValue, prefix = '') {
  if (!element) return;
  
  const startValue = parseInt(element.textContent.replace(/[^0-9]/g, '')) || 0;
  const duration = 1000;
  const steps = 30;
  const increment = (targetValue - startValue) / steps;
  let currentValue = startValue;
  let step = 0;
  
  const timer = setInterval(() => {
    step++;
    currentValue += increment;
    
    if (step >= steps) {
      currentValue = targetValue;
      clearInterval(timer);
    }
    
    const displayValue = prefix + Math.round(currentValue).toLocaleString();
    element.textContent = displayValue;
  }, duration / steps);
}


// Activity Table Management

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

function updateActivityTable(activities) {
  if (!elements.activityTableBody) return;
  
  elements.activityTableBody.innerHTML = '';
  
  activities.forEach((activity, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${activity.id}</td>
      <td>${activity.title}</td>
      <td><span class="status-badge ${activity.type}">${activity.type}</span></td>
      <td><span class="status-badge ${activity.status.toLowerCase()}">${activity.status}</span></td>
      <td>${formatDate(activity.date)}</td>
      <td>${activity.user}</td>
    `;
    
    elements.activityTableBody.appendChild(row);

  });
}

function updateAllActivityTable() {
  const allActivityTableBody = document.getElementById('allActivityTableBody1');
  if (!allActivityTableBody) return;
  
  const allActivities = activities1;
  allActivityTableBody.innerHTML = '';
  
  allActivities.forEach((activity, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${activity.id}</td>
      <td>${activity.title}</td>
      <td><span class="status-badge ${activity.type}">${activity.type}</span></td>
      <td><span class="status-badge ${activity.status.toLowerCase()}">${activity.status}</span></td>
      <td>${formatDate(activity.date)}</td>
      <td>${activity.user}</td>
    `;
    
    allActivityTableBody.appendChild(row);
  
  });  
}

function generateMockActivities() {
  const activities = [
    {
      id: 1,
      title: 'User login from new device',
      type: 'security',
      status: 'Success',
      date: new Date(Date.now()),
      user: 'John Doe'
    },
    {
      id: 2,
      title: 'Database backup completed',
      type: 'system',
      status: 'Success',
      date: new Date(Date.now()),
      user: 'System'
    },
    {
      id: 3,
      title: 'New support ticket created',
      type: 'support',
      status: 'Pending',
      date: new Date(Date.now()),
      user: 'Jane Smith'
    },
    {
      id: 4,
      title: 'Payment processed successfully',
      type: 'payment',
      status: 'Success',
      date: new Date('2025-10-01'),
      user: 'Mike Johnson'
    },
    {
      id: 5,
      title: 'Server maintenance scheduled',
      type: 'system',
      status: 'Scheduled',
      date: new Date(Date.now() ),
      user: 'Admin'
    },
    {
      id:6,
      title:'New user registered',
      type:'user',
      status:'Success',
      date:new Date(Date.now()),
      user:'John Doe'
    }
  ];
  
  return activities;
}


  const activities1 = [
    {
      id: 1,
      title: 'User login from new device',
      type: 'security',
      status: 'Success',
      date: new Date(Date.now()),
      user: 'John Doe'
    },
    {
      id: 2,
      title: 'Database backup completed',
      type: 'system',
      status: 'Success',
      date: new Date(Date.now()),
      user: 'System'
    },
    {
      id: 3,
      title: 'New support ticket created',
      type: 'support',
      status: 'Pending',
      date: new Date(Date.now()),
      user: 'Jane Smith'
    },
    {
      id: 4,
      title: 'Payment processed successfully',
      type: 'payment',
      status: 'Success',
      date: new Date(Date.now()),
      user: 'Mike Johnson'
    },
    {
      id: 5,
      title: 'Server maintenance scheduled',
      type: 'system',
      status: 'Scheduled',
      date: new Date(Date.now()),
      user: 'Admin'
    },
    {
      id: 6,
      title: 'Password changed successfully',
      type: 'security',
      status: 'Success',
      date: new Date(Date.now()),
      user: 'John Doe'
    },
    {
      id: 7,
      title: 'Email notification failed to send',
      type: 'system',
      status: 'Failed',
      date: new Date(Date.now()),
      user: 'System'
    },
    {
      id: 8,
      title: 'Refund issued to customer',
      type: 'payment',
      status: 'Success',
      date: new Date(Date.now()),
      user: 'Finance Team'
    },
    {
      id: 9,
      title: 'New user registered',
      type: 'user',
      status: 'Success',
      date: new Date(Date.now()),
      user: 'Emily Davis'
    },
    {
      id: 10,
      title: 'Support ticket resolved',
      type: 'support',
      status: 'Completed',
      date: new Date(Date.now()),
      user: 'Support Team'
    }
  ];
  


function formatDate(date) {

  return new Date(date).toLocaleDateString();
}