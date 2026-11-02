(function () {
  var coarse = window.matchMedia && window.matchMedia('(pointer: coarse)').matches;
  var config = { responsive: true, displaylogo: false, showSendToCloud: false, showEditInChartStudio: false, displayModeBar: coarse ? false : 'hover',
                 modeBarButtonsToRemove: ['select2d', 'lasso2d', 'autoScale2d', 'zoomIn2d', 'zoomOut2d', 'sendDataToCloud', 'sendChartToCloud'], toImageButtonOptions: { format: 'png', scale: 2 } };

  function render(fig) {
    if (fig.dataset.done) return;
    fig.dataset.done = '1';
    var specs = JSON.parse(fig.querySelector('.fig-spec').textContent);
    fig.querySelectorAll('.chart').forEach(function (el, i) {
      var spec = specs[i];
      if (coarse) spec.layout.dragmode = false;
      var ax = spec.layout.xaxis;
      if (el.clientWidth < 480 && ax.tickvals && ax.tickvals.length > 5 && ax.type === 'log') {   // fewer ticks on narrow screens
        var keep = function (_, k, all) { return k % 2 === (all.length - 1) % 2; };
        ax.tickvals = ax.tickvals.filter(keep);
        ax.ticktext = ax.ticktext.filter(keep);
      }
      Plotly.newPlot(el, spec.data, spec.layout, config);
    });
    fig.querySelectorAll('button.legend-item').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var on = btn.getAttribute('aria-pressed') !== 'true';
        btn.setAttribute('aria-pressed', String(on));
        fig.querySelectorAll('.chart').forEach(function (el) {
          var idx = [];
          el.data.forEach(function (t, k) { if (t.name === btn.dataset.series) idx.push(k); });
          if (idx.length) Plotly.restyle(el, { visible: on ? true : 'legendonly' }, idx);
        });
      });
    });
  }

  var figs = document.querySelectorAll('.viz');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { render(e.target); io.unobserve(e.target); } });
    }, { rootMargin: '600px 0px' });
    figs.forEach(function (f) { io.observe(f); });
  } else {
    figs.forEach(render);
  }

  // Tables: show ten rows, scroll for the rest, keep the header in view.
  function fitTables() {
    document.querySelectorAll('.table-block .table-scroll').forEach(function (box) {
      var table = box.querySelector('table');
      if (!table) return;
      var head = table.querySelector('thead');
      var top = 0;
      if (head) head.querySelectorAll('tr').forEach(function (tr) {
        tr.querySelectorAll('th').forEach(function (th) { th.style.top = top + 'px'; });
        top += tr.getBoundingClientRect().height;
      });
      var rows = table.querySelectorAll('tbody tr');
      var hint = box.parentNode.querySelector('.table-hint');
      if (rows.length > 10) {
        var last = rows[9].getBoundingClientRect();
        var first = table.getBoundingClientRect();
        box.style.maxHeight = Math.ceil(last.bottom - first.top + 1) + 'px';
        if (!hint) {
          hint = document.createElement('p');
          hint.className = 'table-hint';
          box.parentNode.appendChild(hint);
        }
        hint.textContent = 'Showing 10 of ' + rows.length + ' rows. Scroll inside the table to see the rest.';
      } else {
        box.style.maxHeight = 'none';
      }
    });
  }
  fitTables();
  window.addEventListener('resize', fitTables);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(fitTables);

  // Copy button for each code block
  document.querySelectorAll('.code-fold pre').forEach(function (pre) {
    if (!navigator.clipboard) return;
    var head = document.createElement('div');
    head.className = 'code-head';
    head.innerHTML = '<span class="code-lang">python</span><button type="button" class="code-copy">Copy</button>';
    var btn = head.lastChild;
    btn.addEventListener('click', function () {
      navigator.clipboard.writeText(pre.innerText).then(function () {
        btn.textContent = 'Copied';
        setTimeout(function () { btn.textContent = 'Copy'; }, 1600);
      });
    });
    pre.parentNode.insertBefore(head, pre);
  });
})();
