document.addEventListener('DOMContentLoaded', () => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const footerDisclaimer = document.querySelector('.footer-disclaimer');
  const scrollTopButton = document.getElementById('scrollTopButton');
  const progressBar = document.getElementById('progressBar');
  const mobileNav = document.getElementById('mobileNav');
  const mobileToggle = document.getElementById('dropdownToggle');
  const expandAllButton = document.getElementById('expandSectionsBtn');
  const navLists = Array.from(document.querySelectorAll('.toc-list'));
  const sections = Array.from(document.querySelectorAll('.documentation-body .section'));
  const liveRegion = createLiveRegion();
  const sectionRegistry = new Map();
  let activeSectionId = null;

  if (footerDisclaimer) {
    const currentYear = new Date().getFullYear();
    footerDisclaimer.textContent = `© 2020 - ${currentYear} Vanilla JS vs jQuery Documentation. All rights reserved.`;
  }

  initCopyButtons();
  buildNavigation();
  initCollapsibles();
  initSectionObserver();
  initScrollProgress();
  initScrollTopButton();
  initMobileMenu();
  initSearchInputs();
  initStats();
  announceConsoleMessage();


  /** Utilities */
  function createLiveRegion() {
    const region = document.createElement('div');
    region.className = 'sr-only';
    region.setAttribute('aria-live', 'polite');
    document.body.append(region);
    return region;
  }

  function slugify(text, fallback) {
    const slug = text
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .trim()
      .replace(/\s+/g, '-');
    return slug || fallback;
  }

  function focusScroll(target) {
    const offset = 110;
    const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
    window.scrollTo({
      top,
      behavior: prefersReducedMotion.matches ? 'auto' : 'smooth',
    });
  }

  function closeMobileMenu() {
    if (!mobileNav) return;
    mobileNav.classList.remove('is-open');
    document.body.classList.remove('no-scroll');
    mobileToggle?.setAttribute('aria-expanded', 'false');
  }

  /** Copy buttons */
  function initCopyButtons() {
    const copyBlocks = document.querySelectorAll('.copy-to-clipboard');
    copyBlocks.forEach((block) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'copy-button';
      button.innerHTML = '<i class="fa-solid fa-copy" aria-hidden="true"></i><span>Copy code</span>';
      button.addEventListener('click', async () => {
        const codeElement = block.parentElement?.querySelector('code');
        if (!codeElement) return;
        const text = codeElement.innerText;

        try {
          if (navigator.clipboard && window.isSecureContext) {
            await navigator.clipboard.writeText(text);
          } else {
            const textarea = document.createElement('textarea');
            textarea.value = text;
            textarea.setAttribute('readonly', '');
            textarea.style.position = 'absolute';
            textarea.style.left = '-9999px';
            document.body.append(textarea);
            textarea.select();
            document.execCommand('copy');
            textarea.remove();
          }

          liveRegion.textContent = 'Code snippet copied to clipboard';
          button.dataset.state = 'copied';
          button.innerHTML = '<i class="fa-solid fa-check" aria-hidden="true"></i><span>Copied!</span>';

          setTimeout(() => {
            button.dataset.state = '';
            button.innerHTML = '<i class="fa-solid fa-copy" aria-hidden="true"></i><span>Copy code</span>';
          }, 1600);
        } catch (error) {
          console.error('Copy failed', error);
          liveRegion.textContent = 'Copy not available in this browser';
        }
      });

      block.append(button);
    });
  }

  /** Navigation */
  function buildNavigation() {
    sections.forEach((section, index) => {
      const heading = section.querySelector('h3, h2');
      const label = heading?.textContent?.trim() || `Section ${index + 1}`;
      const sectionId = slugify(label, `section-${index + 1}`);
      section.id = sectionId;
      section.dataset.collapsed = 'false';

      const entry = sectionRegistry.get(sectionId) || { section, navLinks: [] };

      navLists.forEach((list) => {
        const listItem = document.createElement('li');
        const link = document.createElement('a');
        link.className = 'nav-link';
        link.href = `#${sectionId}`;
        link.dataset.sectionId = sectionId;
        link.dataset.title = label.toLowerCase();
        link.textContent = label;
        link.addEventListener('click', (event) => {
          event.preventDefault();
          section.dataset.collapsed = 'false';
          focusScroll(section);
          setActiveSection(sectionId);
          closeMobileMenu();
        });

        listItem.append(link);
        list.append(listItem);
        entry.navLinks.push(link);
      });

      sectionRegistry.set(sectionId, entry);

      const headingEl = heading;
      if (headingEl) {
        headingEl.setAttribute('role', 'button');
        headingEl.setAttribute('tabindex', '0');
        headingEl.addEventListener('click', () => toggleSection(section));
        headingEl.addEventListener('keydown', (event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            toggleSection(section);
          }
        });
      }
    });

    updateToggleAllButton();

    if (sections[0]) {
      setActiveSection(sections[0].id);
    }
  }

  function setActiveSection(sectionId) {
    if (activeSectionId === sectionId) return;
    if (activeSectionId) {
      const prev = sectionRegistry.get(activeSectionId);
      prev?.navLinks.forEach((link) => link.classList.remove('active-link'));
    }

    const current = sectionRegistry.get(sectionId);
    current?.navLinks.forEach((link) => link.classList.add('active-link'));
    activeSectionId = sectionId;
  }

  /** Collapsibles */
  function toggleSection(section) {
    const isCollapsed = section.dataset.collapsed === 'true';
    section.dataset.collapsed = isCollapsed ? 'false' : 'true';
    updateToggleAllButton();
  }

  function initCollapsibles() {
    expandAllButton?.addEventListener('click', () => {
      const shouldCollapse = sections.every((section) => section.dataset.collapsed === 'false');
      sections.forEach((section) => {
        section.dataset.collapsed = shouldCollapse ? 'true' : 'false';
      });
      updateToggleAllButton();
    });
  }

  function updateToggleAllButton() {
    if (!expandAllButton) return;
    const collapsedCount = sections.filter((section) => section.dataset.collapsed === 'true').length;
    if (collapsedCount === sections.length) {
      expandAllButton.textContent = 'Expand all sections';
    } else if (collapsedCount === 0) {
      expandAllButton.textContent = 'Collapse all sections';
    } else {
      expandAllButton.textContent = 'Expand remaining sections';
    }
  }

  /** Intersection observer */
  function initSectionObserver() {
    if (!sections.length || typeof window.IntersectionObserver !== 'function') {
      if (sections[0]) {
        setActiveSection(sections[0].id);
      }
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        threshold: 0.35,
        rootMargin: '-120px 0px -120px 0px',
      }
    );

    sections.forEach((section) => observer.observe(section));
  }

  /** Scroll progress */
  function initScrollProgress() {
    const handleScroll = () => {
      updateProgressBar();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  function initScrollTopButton() {
    if (!scrollTopButton) return;

    const toggleButton = () => {
      const { scrollTop } = getScrollMetrics();
      scrollTopButton.classList.toggle('is-visible', scrollTop > 240);
    };

    window.addEventListener('scroll', toggleButton, { passive: true });
    toggleButton();

    scrollTopButton.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: prefersReducedMotion.matches ? 'auto' : 'smooth',
      });
    });
  }

  function getScrollMetrics() {
    const doc = document.documentElement;
    const scrollTop = window.pageYOffset || doc.scrollTop || 0;
    const scrollHeight = doc.scrollHeight || document.body.scrollHeight || 0;
    const clientHeight = doc.clientHeight || window.innerHeight || 0;
    const distance = Math.max(scrollHeight - clientHeight, 0);

    return { scrollTop, distance };
  }

  function updateProgressBar() {
    if (!progressBar) return;
    const { scrollTop, distance } = getScrollMetrics();
    const percent = distance > 0 ? (scrollTop / distance) * 100 : 0;
    progressBar.style.width = `${percent}%`;
  }


  /** Mobile navigation */
  function initMobileMenu() {
    if (!mobileNav || !mobileToggle) return;

    mobileToggle.addEventListener('click', (event) => {
      event.preventDefault();
      const isOpen = mobileNav.classList.toggle('is-open');
      document.body.classList.toggle('no-scroll', isOpen);
      mobileToggle.setAttribute('aria-expanded', String(isOpen));
    });

    document.addEventListener('click', (event) => {
      if (!mobileNav.classList.contains('is-open')) return;
      if (mobileNav.contains(event.target) || mobileToggle.contains(event.target)) {
        return;
      }
      closeMobileMenu();
    });

    window.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        closeMobileMenu();
      }
    });
  }

  /** TOC search */
  function initSearchInputs() {
    const inputs = document.querySelectorAll('.toc-search input');
    inputs.forEach((input) => {
      const context = input.closest('.sidebar-inner, .navigation-bar-header-menu-items');
      const list = context?.querySelector('.toc-list');
      const emptyState = context?.querySelector('.toc-empty');
      if (!list) return;

      input.addEventListener('input', () => {
        const query = input.value.trim().toLowerCase();
        const links = list.querySelectorAll('.nav-link');
        let visibleCount = 0;

        links.forEach((link) => {
          const matches = query.length === 0 || link.dataset.title?.includes(query);
          link.parentElement.style.display = matches ? '' : 'none';
          if (matches) visibleCount += 1;
        });

        if (emptyState) {
          emptyState.classList.toggle('is-visible', visibleCount === 0);
        }
      });
    });
  }

  /** Document stats */
  function initStats() {
    const statsContainer = document.getElementById('doc-stats');
    if (!statsContainer) return;

    const snippetCount = document.querySelectorAll('.documentation-body code').length;
    const linkCount = document.querySelectorAll('.documentation-body a').length;
    const totalWords = document
      .querySelector('.documentation-body')
      ?.innerText.trim()
      .split(/\s+/).length || 0;
    const readingMinutes = Math.max(2, Math.round(totalWords / 220));

    const stats = [
      { label: 'Sections', value: sections.length },
      { label: 'Code snippets', value: snippetCount },
      { label: 'Read time', value: `${readingMinutes} min` },
      { label: 'Reference links', value: linkCount },
    ];

    statsContainer.innerHTML = '';
    stats.forEach((stat) => {
      const card = document.createElement('article');
      card.className = 'stat-card';
      card.innerHTML = `
        <p class="stat-label">${stat.label}</p>
        <p class="stat-value">${stat.value}</p>
      `;
      statsContainer.append(card);
    });
  }

  /** Console message */
  function announceConsoleMessage() {
    const message = 'Welcome to Vanilla JS vs jQuery Documentation!';
    const styles = [
      'background: linear-gradient(120deg, #22d3ee 0%, #2563eb 50%, #a855f7 100%)',
      'color: #fff',
      'padding: 8px 16px',
      'border-radius: 999px',
      'font-size: 14px',
      'font-weight: 600',
      'font-family: "Roboto", sans-serif',
      'text-transform: uppercase',
      'letter-spacing: 0.08em',
    ].join(';');

    console.log(`%c${message}`, styles);
  }
});