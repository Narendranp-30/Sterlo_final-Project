// Loading States and Notifications


function showLoadingState() {
  const kpiCards = document.querySelectorAll('.kpiCard1');
  kpiCards.forEach(card => {
    card.classList.add('loading1');
  });
}

function hideLoadingState() {
  const kpiCards = document.querySelectorAll('.kpiCard1');
  kpiCards.forEach(card => {
    card.classList.remove('loading1');
  });
}

function showNotification(message, type = 'info') {
  console.log('Creating notification:', message, type);
  const notification = document.createElement('div');
  notification.className = `notification1 ${type}`;
  let icon = '✅';
  notification.innerHTML = `
    <div class="notification-content">
      <span class="notification-icon">${icon}</span>
      <span class="notification-message">${message}</span>
    </div>
  `;

  // Style
  notification.style.position = 'fixed';
  notification.style.top = '40px';
  notification.style.right = '300px';
  notification.style.background = 'var(--secondary-bg)';
  notification.style.border = '1px solid var(--border-color)';
  notification.style.borderRadius = '12px';
  notification.style.padding = '15px 1.5rem';
  notification.style.zIndex = '1000';
  notification.style.transform = 'translateX(100%)';
  notification.style.transition = 'transform 0.3s ease';

  document.body.appendChild(notification);

  // Slide in
  setTimeout(function() {
    notification.style.transform = 'translateX(0)';
  }, 100);

  // Remove after 3s
  setTimeout(function() {
    notification.style.transform = 'translateX(100%)';
    setTimeout(function() {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 300);
  }, 3000);
}


// Auto-refresh functionality


function startAutoRefresh() {
  setInterval(() => {
    fetchKPIData();
  }, 30000);
}