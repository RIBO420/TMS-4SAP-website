/**
 * Navigation behaviours:
 * - Scroll effect: transparent -> solid background after 50px
 * - Mobile hamburger toggle
 * - Mega-menu open/close for desktop hover and mobile click
 */
export function initNav() {
  const nav = document.getElementById('nav');
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const megaTriggers = document.querySelectorAll('[data-mega-trigger]');
  const megaPanels = document.querySelectorAll('[data-mega-panel]');

  /* --- Scroll: transparent -> solid --- */
  if (nav) {
    window.addEventListener(
      'scroll',
      () => {
        nav.classList.toggle('scrolled', window.scrollY > 50);
      },
      { passive: true }
    );
  }

  /* --- Mobile toggle --- */
  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = mobileToggle.getAttribute('aria-expanded') === 'true';
      mobileToggle.setAttribute('aria-expanded', String(!isOpen));
      mobileToggle.classList.toggle('open', !isOpen);
      mobileMenu.classList.toggle('mobile-open', !isOpen);

      if (isOpen) {
        // Close all open mobile sub-menus
        mobileMenu.querySelectorAll('.mega-section.open').forEach((s) => {
          s.classList.remove('open');
        });
      }
    });

    // Close mobile menu when a terminal link is clicked
    mobileMenu.querySelectorAll('a:not([data-mega-trigger])').forEach((link) => {
      link.addEventListener('click', () => {
        mobileToggle.setAttribute('aria-expanded', 'false');
        mobileToggle.classList.remove('open');
        mobileMenu.classList.remove('mobile-open');
      });
    });
  }

  /* --- Desktop mega-menu: show on hover --- */
  megaTriggers.forEach((trigger) => {
    const panelId = trigger.getAttribute('data-mega-trigger');
    const panel = document.querySelector(`[data-mega-panel="${panelId}"]`);
    if (!panel) return;

    let hideTimeout;

    const show = () => {
      clearTimeout(hideTimeout);
      // Close other panels
      megaPanels.forEach((p) => {
        if (p !== panel) p.classList.remove('open');
      });
      megaTriggers.forEach((t) => {
        if (t !== trigger) t.classList.remove('active');
      });
      panel.classList.add('open');
      trigger.classList.add('active');
    };

    const hide = () => {
      hideTimeout = setTimeout(() => {
        panel.classList.remove('open');
        trigger.classList.remove('active');
      }, 200);
    };

    // Desktop: hover
    trigger.addEventListener('mouseenter', show);
    trigger.addEventListener('mouseleave', hide);
    panel.addEventListener('mouseenter', () => clearTimeout(hideTimeout));
    panel.addEventListener('mouseleave', hide);

    // Keyboard: Enter/Space to toggle
    trigger.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        panel.classList.toggle('open');
        trigger.classList.toggle('active');
      }
    });
  });

  /* --- Mobile mega-menu: toggle sub-sections --- */
  document.querySelectorAll('[data-mobile-mega]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const section = btn.closest('.mega-section');
      if (section) section.classList.toggle('open');
    });
  });

  /* --- Close mega-menu on outside click --- */
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-mega') && !e.target.closest('[data-mega-trigger]')) {
      megaPanels.forEach((p) => p.classList.remove('open'));
      megaTriggers.forEach((t) => t.classList.remove('active'));
    }
  });

  /* --- Close mega-menu on Escape --- */
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      megaPanels.forEach((p) => p.classList.remove('open'));
      megaTriggers.forEach((t) => t.classList.remove('active'));
      if (mobileToggle && mobileMenu) {
        mobileToggle.setAttribute('aria-expanded', 'false');
        mobileToggle.classList.remove('open');
        mobileMenu.classList.remove('mobile-open');
      }
    }
  });
}
