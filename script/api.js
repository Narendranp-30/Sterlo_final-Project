async function fetchKPIData() {
  try {
    const response = await fetch(API);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }    
    const apiData = await response.json();  
    const transformedData = transformAPIData(apiData);
    updateKPICards(transformedData);
    updateCharts(transformedData);
    updateActivityTable(transformedData.activities || generateMockActivities()); 
  } catch (error) {
    console.error('Error fetching KPI data:', error);
    alert('Failed to load data from API', 'error');
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
    salesData: salesData ? salesData.data : [],
    userDistribution: usersData ? [
      { role: 'Monday', count: getDayValue(usersData.data, 'Mon') },
      { role: 'Tuesday', count: getDayValue(usersData.data, 'Tue') },
      { role: 'Wednesday', count: getDayValue(usersData.data, 'Wed') },
      
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

  if (CardDoms.usersCount) {
    CardDoms.usersCount.textContent = data.users;
  }

  if (CardDoms.salesAmount) {
    CardDoms.salesAmount.textContent = '₹' + data.sales;
  }

  if (CardDoms.visitorsCount) {
    CardDoms.visitorsCount.textContent = data.visitors;
  }

}


const TableDom ={
    activityTableBody: document.getElementById('activityTableBody1'),
}
function updateActivityTable(activities) {
  TableDom.activityTableBody.innerHTML = '';
    activities.forEach((activity, index) => {
    const TableData = document.createElement('tr');
    TableData.innerHTML = `
      <td>${activity.id}</td>
      <td>${activity.title}</td>
      <td><span class="status-badge ${activity.type}">${activity.type}</span></td>
      <td><span class="status-badge ${activity.status.toLowerCase()}">${activity.status}</span></td>
      <td>${activity.date}</td>
      <td>${activity.user}</td>
    `;
    TableDom.activityTableBody.appendChild(TableData);
  });
}

function updateAllActivityTable() {
  const allActivityTableBody = document.getElementById('allActivityTableBody1');
  const allActivities = activities1;
  allActivityTableBody.innerHTML = '';
  
  allActivities.forEach((activity, index) => {
    const TableData = document.createElement('tr');
    TableData.innerHTML = `
      <td>${activity.id}</td>
      <td>${activity.title}</td>
      <td><span class="status-badge ${activity.type}">${activity.type}</span></td>
      <td><span class="status-badge ${activity.status.toLowerCase()}">${activity.status}</span></td>
      <td>${activity.date}</td>
      <td>${activity.user}</td>
    `;    
    allActivityTableBody.appendChild(TableData);
  });  
}

function generateMockActivities() {
  const activities = [
    {
      id: 1,title: 'User login from new device',
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
  return new Date(date);
}