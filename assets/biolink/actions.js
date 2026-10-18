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
