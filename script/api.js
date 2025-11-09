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
  if (!apiData?.kpis || !Array.isArray(apiData.kpis)) {
    throw new Error('Invalid API response structure');
  }

  const usersData = apiData.kpis.find(item => item.id === 1 && item.title === "Users");
  const salesData = apiData.kpis.find(item => item.id === 2 && item.title === "Sales");
  const visitorsData = apiData.kpis.find(item => item.id === 3 && item.title === "Visitors");
  
  const totalUsers = usersData?.data.reduce((sum, item) => sum + item.value, 0) || 0;
  const totalSales = salesData?.data.reduce((sum, item) => sum + item.value, 0) || 0;
  const totalVisitors = visitorsData?.data.reduce((sum, item) => sum + item.value, 0) || 0;
  
  return {
    users: totalUsers,
    sales: totalSales,
    visitors: totalVisitors,
    
    usersRawData: usersData ? usersData.data : [],
    salesRawData: salesData ? salesData.data : [],
    visitorsRawData: visitorsData ? visitorsData.data : [],
    
   
    usersChange: usersData ? usersData.change : '+0%',
    salesChange: salesData ? salesData.change : '+0%',
    visitorsChange: visitorsData ? visitorsData.change : '+0%',
    
    
    salesData: salesData ? salesData.data : [],
    
    // for pie chart 
    userDistribution: usersData ? [
      { role: 'Monday', count: usersData.data.find(d => d.day === 'Mon')?.value || 0 },
      { role: 'Tuesday', count: usersData.data.find(d => d.day === 'Tue')?.value || 0 },
      { role: 'Wednesday', count: usersData.data.find(d => d.day === 'Wed')?.value || 0 },
      { role: 'Thursday', count: usersData.data.find(d => d.day === 'Thu')?.value || 0 },
      { role: 'Friday', count: usersData.data.find(d => d.day === 'Fri')?.value || 0 },
      { role: 'Saturday', count: usersData.data.find(d => d.day === 'Sat')?.value || 0 },
      { role: 'Sunday', count: usersData.data.find(d => d.day === 'Sun')?.value || 0 },
    ] : [],
    activities: generateMockActivities()
  };
}

function updateKPICards(data) {
  // Store  data for filtering
  window.dashboardData = data;
  
  // Animate number
  animateNumber(elements.usersCount, data.users);
  animateNumber(elements.salesAmount, data.sales, '₹');
 
  animateNumber(elements.visitorsCount, data.visitors);
}

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
    
    // animation with delay
    row.style.opacity = '0';
    row.style.transform = 'translateY(20px)';
    elements.activityTableBody.appendChild(row);
    
    setTimeout(() => {
      row.style.transition = 'all 0.3s ease';
      row.style.opacity = '1';
      row.style.transform = 'translateY(0)';
    }, index * 50);
  });
}

function updateAllActivityTable() {
  const allActivityTableBody = document.getElementById('allActivityTableBody1');
  if (!allActivityTableBody) return;
  
  const allActivities = generateAllActivities();
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
    
    // animation with delay
    row.style.opacity = '0';
    row.style.transform = 'translateY(20px)';
    allActivityTableBody.appendChild(row);
    
    setTimeout(() => {
      row.style.transition = 'all 0.3s ease';
      row.style.opacity = '1';
      row.style.transform = 'translateY(0)';
    }, index * 50);
  });
}

function generateMockActivities() {
  const activities = [
    {
      id: 1,
      title: 'User login from new device',
      type: 'security',
      status: 'Success',
      date: new Date(Date.now() - 1000 * 60 * 5),
      user: 'John Doe'
    },
    {
      id: 2,
      title: 'Database backup completed',
      type: 'system',
      status: 'Success',
      date: new Date(Date.now() - 1000 * 60 * 15),
      user: 'System'
    },
    {
      id: 3,
      title: 'New support ticket created',
      type: 'support',
      status: 'Pending',
      date: new Date(Date.now() - 1000 * 60 * 30),
      user: 'Jane Smith'
    },
    {
      id: 4,
      title: 'Payment processed successfully',
      type: 'payment',
      status: 'Success',
      date: new Date(Date.now() - 1000 * 60 * 45),
      user: 'Mike Johnson'
    },
    {
      id: 5,
      title: 'Server maintenance scheduled',
      type: 'system',
      status: 'Scheduled',
      date: new Date(Date.now() - 1000 * 60 * 60),
      user: 'Admin'
    },
    {
      id:6,
      title:'New user registered',
      type:'user',
      status:'Success',
      date:new Date(Date.now() - 1000 * 60 * 60),
      user:'John Doe'
    }
  ];
  
  return activities;
}

function generateAllActivities() {
  const activities = [
    {
      id: 1,
      title: 'User login from new device',
      type: 'security',
      status: 'Success',
      date: new Date(Date.now() - 1000 * 60 * 5),
      user: 'John Doe'
    },
    {
      id: 2,
      title: 'Database backup completed',
      type: 'system',
      status: 'Success',
      date: new Date(Date.now() - 1000 * 60 * 15),
      user: 'System'
    },
    {
      id: 3,
      title: 'New support ticket created',
      type: 'support',
      status: 'Pending',
      date: new Date(Date.now() - 1000 * 60 * 30),
      user: 'Jane Smith'
    },
    {
      id: 4,
      title: 'Payment processed successfully',
      type: 'payment',
      status: 'Success',
      date: new Date(Date.now() - 1000 * 60 * 45),
      user: 'Mike Johnson'
    },
    {
      id: 5,
      title: 'Server maintenance scheduled',
      type: 'system',
      status: 'Scheduled',
      date: new Date(Date.now() - 1000 * 60 * 60),
      user: 'Admin'
    },
    {
      id: 6,
      title: 'Password changed successfully',
      type: 'security',
      status: 'Success',
      date: new Date(Date.now() - 1000 * 60 * 90),
      user: 'John Doe'
    },
    {
      id: 7,
      title: 'Email notification failed to send',
      type: 'system',
      status: 'Failed',
      date: new Date(Date.now() - 1000 * 60 * 120),
      user: 'System'
    },
    {
      id: 8,
      title: 'Refund issued to customer',
      type: 'payment',
      status: 'Success',
      date: new Date(Date.now() - 1000 * 60 * 180),
      user: 'Finance Team'
    },
    {
      id: 9,
      title: 'New user registered',
      type: 'user',
      status: 'Success',
      date: new Date(Date.now() - 1000 * 60 * 240),
      user: 'Emily Davis'
    },
    {
      id: 10,
      title: 'Support ticket resolved',
      type: 'support',
      status: 'Completed',
      date: new Date(Date.now() - 1000 * 60 * 300),
      user: 'Support Team'
    }
  ];
  
  return activities;
}

function formatDate(date) {
  const now = new Date();
  const diff = now - new Date(date);
  const minutes = Math.floor(diff / (1000 * 60));
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  
  if (minutes < 1) return 'Just now';
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;
  
  return new Date(date).toLocaleDateString();
}