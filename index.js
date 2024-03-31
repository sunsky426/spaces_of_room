document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.point').forEach(point => {
      point.addEventListener('mouseenter', function() {
          const data = this.getAttribute('data-text');
          const [title, subtitle, sectionText] = data.split('||', 3);
          const [sectionTitle, itemsText] = sectionText.split('::', 2);
          const items = itemsText.split(';;').filter(item => item.trim() !== '');

          // Generating the HTML content for the tooltip
          let contentHtml = `<h4>${title}</h4><h5>${subtitle}</h5><hr><h6>${sectionTitle}:</h6><ul>`;
          items.forEach(item => {
              contentHtml += `<li>${item}</li>`;
          });
          contentHtml += '</ul>';

          // Creating and adding the tooltip
          const tooltip = document.createElement('div');
          tooltip.className = 'tooltip';
          tooltip.innerHTML = contentHtml;

          adjustTooltipPosition(tooltip, this, document.querySelector('.fullscreen-image'));

          this.appendChild(tooltip);
      });

      point.addEventListener('mouseleave', function() {
          const tooltip = this.querySelector('.tooltip');
          if (tooltip) {
              this.removeChild(tooltip);
          }
      });
  });
});

function adjustTooltipPosition(tooltip, point, container) {
  // Temporarily append to calculate dimensions (if not already appended)
  point.appendChild(tooltip);

  const tooltipRect = tooltip.getBoundingClientRect();
  const pointRect = point.getBoundingClientRect();
  const containerRect = container.getBoundingClientRect();

  // Adjust horizontally if necessary
  if (tooltipRect.right > containerRect.right) {
      tooltip.style.left = 'auto';
      tooltip.style.right = '0';
  }

  // Adjust vertically if necessary
  if (tooltipRect.bottom > containerRect.bottom) {
      tooltip.style.top = 'auto';
      tooltip.style.bottom = `0`;
  }

  // If the tooltip extends out of the left boundary of the container
  if (tooltipRect.left < containerRect.left) {
      tooltip.style.left = '0';
  }

  // If the tooltip extends above the top boundary of the container
  if (tooltipRect.top < containerRect.top) {
      tooltip.style.top = `0`;
  }
}

function adjustPoints() {
  // Assuming the image fills the window - replace these with your image's actual dimensions if different
  const imageWidth = window.innerWidth;
  const imageHeight = window.innerHeight;

  const points = document.querySelectorAll('.point');
  points.forEach(point => {
    const xPercent = parseFloat(point.getAttribute('data-x-percent'));
    const yPercent = parseFloat(point.getAttribute('data-y-percent'));

    // Calculate new positions as a percentage of the current window size
    const xPosition = imageWidth * (xPercent / 100);
    const yPosition = imageHeight * (yPercent / 100);

    // Update point positions
    point.style.left = `${xPosition}px`;
    point.style.top = `${yPosition}px`;
  });
}

// Adjust points on window load and resize
window.addEventListener('load', adjustPoints);
window.addEventListener('resize', adjustPoints);