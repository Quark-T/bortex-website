/**
 * Cloudflare Pages bridge for the BORTEX marketing site.
 * Keeps the frontend static on the marketing origin while routing platform requests to the VPS.
 */
(function () {
  var PLATFORM_ORIGIN = "https://bortex.site";
  var MARKETING_ORIGIN = "https://www.bortex.site";

  window.BORTEX_PLATFORM_ORIGIN = PLATFORM_ORIGIN;
  window.BORTEX_MARKETING_ORIGIN = MARKETING_ORIGIN;

  function shouldRouteToPlatform(pathname) {
    return pathname === '/register'
      || pathname === '/register/'
      || pathname === '/login'
      || pathname === '/login.html'
      || pathname === '/en/login'
      || pathname === '/en/login.html'
      || pathname.startsWith('/api/');
  }

  function rewriteUrl(input) {
    try {
      var url = new URL(String(input), window.location.origin);
      if (!shouldRouteToPlatform(url.pathname)) {
        return null;
      }
      return PLATFORM_ORIGIN + url.pathname + url.search + url.hash;
    } catch (_) {
      return null;
    }
  }

  var originalFetch = window.fetch ? window.fetch.bind(window) : null;
  if (originalFetch) {
    window.fetch = function (input, init) {
      var rawUrl = null;
      if (typeof input === 'string' || input instanceof URL) {
        rawUrl = String(input);
      } else if (input && typeof input.url === 'string') {
        rawUrl = input.url;
      }

      var rewritten = rawUrl ? rewriteUrl(rawUrl) : null;
      if (!rewritten) {
        return originalFetch(input, init);
      }

      var nextInit = init ? Object.assign({}, init) : {};
      if (typeof nextInit.credentials === 'undefined') {
        nextInit.credentials = 'include';
      }

      if (typeof input === 'string' || input instanceof URL) {
        return originalFetch(rewritten, nextInit);
      }

      try {
        var nextRequest = new Request(rewritten, input);
        return originalFetch(nextRequest, nextInit);
      } catch (_) {
        return originalFetch(rewritten, nextInit);
      }
    };
  }

  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('a[href]').forEach(function (anchor) {
      var href = anchor.getAttribute('href');
      if (!href) return;

      if (href === '/login' || href === '/login.html') {
        anchor.setAttribute('href', PLATFORM_ORIGIN + '/login');
        return;
      }

      if (href === '/en/login' || href === '/en/login.html') {
        anchor.setAttribute('href', PLATFORM_ORIGIN + '/en/login');
      }
    });

    document.querySelectorAll('form[action]').forEach(function (form) {
      var action = form.getAttribute('action');
      if (!action) return;
      var rewritten = rewriteUrl(action);
      if (rewritten) {
        form.setAttribute('action', rewritten);
      }
    });
  });
})();
