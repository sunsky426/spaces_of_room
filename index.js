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