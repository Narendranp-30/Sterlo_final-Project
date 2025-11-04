
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
  // Create notification
  const notification = document.createElement('div');
  notification.className = `notification1 ${type}`;
  notification.innerHTML = `
    <div class="notification-content">
      <span class="notification-icon">${getNotificationIcon(type)}</span>
      <span class="notification-message">${message}</span>
    </div>
  `;
  
  // style
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: var(--secondary-bg);
    border: 1px solid var(--border-color);
    border-radius: 12px;
    padding: 1rem 1.5rem;
    box-shadow: var(--shadow-primary);
    z-index: 1000;
    transform: translateX(100%);
    transition: transform 0.3s ease;
  `;
  
  document.body.appendChild(notification);
  
  // Animate
  setTimeout(() => {
    notification.style.transform = 'translateX(0)';
  }, 100);
  
  //  3 seconds
  setTimeout(() => {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 300);
  }, 3000);
}

function getNotificationIcon(type) {
  const icons = {
    success: '✅',
    warning: '⚠️',
    error: '❌',
    info: 'ℹ️'
  };
  return icons[type] || icons.info;
}


// Auto-refresh functionality


function startAutoRefresh() {
  setInterval(() => {
    fetchKPIData();
  }, REFRESH_INTERVAL);
}