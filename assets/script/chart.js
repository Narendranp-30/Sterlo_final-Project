

// Chart Management


function initializeCharts() {
  createSalesChart();
  createUserChart();
}

function createSalesChart() {
  const ctx = elements.salesChart.getContext('2d');
  
  salesChartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels: [ ],
      datasets: [{
        label: 'Monthly Sales',
        data: [ ],
        borderColor: '#00d4ff',
        backgroundColor: 'rgba(0, 212, 255, 0.1)',
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#00d4ff',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
        pointRadius: 6,
        pointHoverRadius: 8
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        }
      },
      scales: {
        x: {
          grid: {
            color: 'rgba(255, 255, 255, 0.1)',
            borderColor: 'rgba(255, 255, 255, 0.1)'
          },
          ticks: {
            color: '#94a3b8'
          }
        },
        y: {
          grid: {
            color: 'rgba(255, 255, 255, 0.1)',
            borderColor: 'rgba(255, 255, 255, 0.1)'
          },
          ticks: {
            color: '#94a3b8',
            callback: function(value) {
              return '₹' + value.toLocaleString();
            }
          }
        }
      },
      interaction: {
        intersect: false,
        mode: 'index'
      }
    }
  });
}

function createUserChart() {
  const ctx = elements.userChart.getContext('2d');
  
  userChartInstance = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: [ ],
      datasets: [{
        data: [],
        backgroundColor: [
          '#00d4ff',
          '#7c3aed',
          '#f59e0b',
          '#10b981'
        ],
        borderWidth: 0,
        hoverOffset: 10
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            color: '#94a3b8',
            padding: 20,
            usePointStyle: true,
            pointStyle: 'circle'
          }
        }
      }
    }
  });
}

function updateCharts(data) {
 
  if (salesChartInstance && data.salesData) {
    salesChartInstance.data.labels = data.salesData.map(item => item.month);
    salesChartInstance.data.datasets[0].data = data.salesData.map(item => item.value);
    salesChartInstance.update('active');
  }
  
 
  if (userChartInstance && data.userDistribution) {
    userChartInstance.data.labels = data.userDistribution.map(item => item.role);
    userChartInstance.data.datasets[0].data = data.userDistribution.map(item => item.count);
    userChartInstance.update('active');
  }
}
