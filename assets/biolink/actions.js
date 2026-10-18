// Botões "Compartilhar" e "QR code"
(function () {
  var toastTimer;

  function toast(message) {
    var el = document.getElementById('toast');
    if (!el) return;
    el.textContent = message;
    el.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { el.classList.remove('is-visible'); }, 2200);
  }

  async function share(button) {
    var data = { title: button.dataset.title, url: button.dataset.url };
    if (navigator.share) {
      try {
        await navigator.share(data);
      } catch (err) {
        // Cancelar o menu de compartilhar não é erro
      }
      return;
    }
    try {
      await navigator.clipboard.writeText(data.url);
      toast('Link copiado');
    } catch (err) {
      window.prompt('Copie o link:', data.url);
    }
  }

  function setThemeColor(dark) {
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', dark ? '#1C2442' : '#F8F8F9');
  }

  // Alternar tema: segue a mesma lógica do blog (localStorage "theme")
  var themeToggle = document.getElementById('homeThemeToggle');
  if (themeToggle) {
    var isDarkNow = document.documentElement.dataset.theme === 'dark' ||
      (document.documentElement.dataset.theme !== 'light' &&
        window.matchMedia('(prefers-color-scheme: dark)').matches);
    themeToggle.setAttribute('aria-pressed', String(isDarkNow));

    themeToggle.addEventListener('click', function () {
      var current = document.documentElement.dataset.theme ||
        (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
      var next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.dataset.theme = next;
      try { localStorage.setItem('theme', next); } catch (e) {}
      themeToggle.setAttribute('aria-pressed', String(next === 'dark'));
      setThemeColor(next === 'dark');
    });
  }

  document.addEventListener('click', function (event) {
    var dialog = document.getElementById('qr-dialog');
    var target = event.target;

    if (target.closest('[data-share]')) {
      share(target.closest('[data-share]'));
    } else if (target.closest('[data-qr-open]') && dialog) {
      dialog.showModal();
    } else if (target.closest('[data-qr-close]') && dialog) {
      dialog.close();
    } else if (target === dialog) {
      // Clique fora do cartão fecha o QR code
      dialog.close();
    }
  });
})();
