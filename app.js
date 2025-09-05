// Mobile menu toggle
const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');
if (menuBtn && mobileMenu) {
  menuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
  });
}

// Smooth scroll fallback
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId && targetId.length > 1) {
      const el = document.querySelector(targetId);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  });
});

// Footer year
const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// Donut chart for regional obesity stats
const statsCanvas = document.getElementById('statsDonut');
if (statsCanvas && window.Chart) {
  const ctx = statsCanvas.getContext('2d');
  // Values in percentages
  const data = [24.1, 10.3, 22.8, 22.1, 20.7];
  const labels = ['السعودية', 'الإمارات', 'قطر', 'مصر', 'الكويت'];
  const colors = ['#2e7d67', '#e7fffb', '#c3e8e7', '#9ed7d5', '#5aa69f'];
  // Plugin to draw center text
  const centerText = {
    id: 'centerText',
    afterDraw(chart) {
      const { ctx } = chart;
      const { top, bottom, left, right } = chart.chartArea;
      const x = (left + right) / 2;
      const y = (top + bottom) / 2;
      ctx.save();
      ctx.fillStyle = '#0f172a';
      ctx.font = '600 14px Tajawal, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('20–25%', x, y);
      ctx.restore();
    },
  };

  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels,
      datasets: [
        {
          data,
          backgroundColor: colors,
          borderWidth: 0,
          hoverOffset: 6,
        },
      ],
    },
    options: {
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: (item) => `${item.label}: ${item.formattedValue}%`,
          },
        },
      },
      cutout: '60%',
      responsive: true,
      maintainAspectRatio: false,
    },
    plugins: [centerText],
  });
}

