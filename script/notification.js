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

  notification.style.position = 'fixed';
  notification.style.top = '40px';
  notification.style.right = '300px';
  notification.style.background = 'var(--secondary-bg)';
  notification.style.border = '1px solid var(--border-color)';
  notification.style.borderRadius = '12px';
  notification.style.padding = '15px 1.5rem';
  notification.style.zIndex = '1000';

  document.body.appendChild(notification);

  setTimeout(function() {
    notification.style.transform = 'translateX(0)';
  }, 100);

  setTimeout(function() {
    notification.style.transform = 'translateX(100%)';
    setTimeout(function() {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 300);//3s
  }, 3000);
}



// Auto-refresh functionality


function startAutoRefresh() {
  setInterval(() => {
    fetchKPIData();
  }, 30000);
}