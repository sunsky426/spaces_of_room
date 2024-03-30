document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.point').forEach(point => {
      point.addEventListener('mouseenter', function() {
        const text = this.getAttribute('data-text');
        const sections = text.split('; '); // Splitting sections
        let contentHtml = '<ul>';

        sections.forEach(section => {
          if (section.startsWith('IMG: ')) {
            const imgSrc = section.replace('IMG: ', '').trim();
            contentHtml += `<li><img src="${imgSrc}" style="width: 100px;"></li>`; // Adjust styling as needed
          } else {
            const parts = section.split(': ');
            const sectionTitle = parts[0];
            const items = parts[1].split('|');

            contentHtml += `<li>${sectionTitle}<ul>`;
            items.forEach(item => {
              contentHtml += `<li>${item}</li>`;
            });
            contentHtml += '</ul></li>';
          }
        });

        contentHtml += '</ul>';

        // Creating and adding the tooltip
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.innerHTML = contentHtml;
        tooltip.style.top = '20px'; // Adjust this value to position the tooltip
        tooltip.style.left = '20px'; // Adjust this value to position the tooltip
        this.appendChild(tooltip);
      });

      point.addEventListener('mouseleave', function() {
        this.removeChild(this.querySelector('.tooltip'));
      });
    });
});

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