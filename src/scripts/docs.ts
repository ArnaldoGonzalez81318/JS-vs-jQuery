type SectionRegistryEntry = {
  section: HTMLElement;
  navLinks: HTMLAnchorElement[];
};

document.addEventListener('DOMContentLoaded', () => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const footerDisclaimer = document.querySelector<HTMLElement>('.footer-disclaimer');
  const progressBar = document.getElementById('progressBar') as HTMLDivElement | null;
  const mobileNav = document.getElementById('mobileNav') as HTMLDivElement | null;
  const mobileToggle = document.getElementById('dropdownToggle') as HTMLButtonElement | null;
  const expandAllButton = document.getElementById('expandSectionsBtn') as HTMLButtonElement | null;
  const activeSectionLabel = document.getElementById('activeSectionLabel') as HTMLParagraphElement | null;
  const jumpToActiveButton = document.getElementById('jumpToActiveBtn') as HTMLButtonElement | null;
  const copyPageLinkButton = document.getElementById('copyPageLinkBtn') as HTMLButtonElement | null;
  const floatingTopButton = document.getElementById('floatingTopButton') as HTMLButtonElement | null;
  const toolbarSearchSummary = document.getElementById('docSearchSummary') as HTMLParagraphElement | null;
  const navLists = Array.from(document.querySelectorAll<HTMLUListElement>('.toc-list'));
  const searchInputs = Array.from(document.querySelectorAll<HTMLInputElement>('.toc-search input, .doc-search input'));
  const focusSearchButtons = Array.from(document.querySelectorAll<HTMLElement>('[data-focus-search]'));
  const sections = Array.from(document.querySelectorAll<HTMLElement>('.documentation-body .section'));
  const liveRegion = createLiveRegion();
  const sectionRegistry = new Map<string, SectionRegistryEntry>();
  const sectionSearchIndex = new Map<string, string>();
  let activeSectionId: string | null = null;
  let currentSearchQuery = '';

  if (footerDisclaimer) {
    const currentYear = new Date().getFullYear();
    footerDisclaimer.textContent = `© 2020 - ${currentYear} Vanilla JS vs jQuery Documentation. All rights reserved.`;
  }

  initCopyButtons();
  buildNavigation();
  initHeadingPermalinks();
  initCollapsibles();
  initSectionObserver();
  initScrollProgress();
  initMobileMenu();
  initSearchInputs();
  initToolbarActions();
  initStats();
  announceConsoleMessage();


  /** Utilities */
  function createLiveRegion(): HTMLDivElement {
    const region = document.createElement('div');
    region.className = 'sr-only';
    region.setAttribute('aria-live', 'polite');
    document.body.append(region);
    return region;
  }

  function slugify(text: string, fallback: string): string {
    const slug = text
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .trim()
      .replace(/\s+/g, '-');
    return slug || fallback;
  }

  function focusScroll(target: HTMLElement): void {
    const offset = 110;
    const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
    window.scrollTo({
      top,
      behavior: prefersReducedMotion.matches ? 'auto' : 'smooth',
    });
  }

  function updateToggleIcon(isOpen: boolean): void {
    if (!mobileToggle) return;
    const icon = mobileToggle.querySelector('i');
    if (!icon) return;
    mobileToggle.classList.toggle('is-open', isOpen);
    icon.classList.toggle('fa-bars', !isOpen);
    icon.classList.toggle('fa-xmark', isOpen);
  }

  function closeMobileMenu() {
    if (!mobileNav) return;
    mobileNav.classList.remove('is-open');
    document.body.classList.remove('no-scroll');
    mobileToggle?.setAttribute('aria-expanded', 'false');
    updateToggleIcon(false);
  }

  async function copyText(text: string, successMessage: string): Promise<void> {
    if (!navigator.clipboard || !window.isSecureContext) {
      liveRegion.textContent = 'Copy not available in this browser';
      throw new Error('Clipboard API unavailable');
    }

    await navigator.clipboard.writeText(text);
    liveRegion.textContent = successMessage;
  }

  function focusFirstSearchInput(): void {
    const firstInput = searchInputs[0];
    if (!firstInput) return;
    firstInput.focus();
    firstInput.select();
  }

  function isEditableTarget(target: EventTarget | null): boolean {
    if (!(target instanceof HTMLElement)) return false;
    return target.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName);
  }

  function escapeHtml(value: string): string {
    return value
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
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
        const codeElement = block.parentElement?.querySelector<HTMLElement>('code');
        if (!codeElement) return;
        const text = codeElement.innerText;

        try {
          await copyText(text, 'Code snippet copied to clipboard');
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
      const heading = section.querySelector<HTMLElement>('h3, h2');
      const label = heading?.textContent?.trim() || `Section ${index + 1}`;
      const sectionId = slugify(label, `section-${index + 1}`);
      section.id = sectionId;
      section.dataset.collapsed = 'false';
      sectionSearchIndex.set(sectionId, section.innerText.toLowerCase());

      const entry = sectionRegistry.get(sectionId) || { section, navLinks: [] };

      navLists.forEach((list) => {
        const listItem = document.createElement('li');
        const link = document.createElement('a');
        link.className = 'nav-link';
        link.href = `#${sectionId}`;
        link.dataset.sectionId = sectionId;
        link.dataset.title = label.toLowerCase();
        link.textContent = label;
        link.addEventListener('click', (event: MouseEvent) => {
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
        headingEl.addEventListener('keydown', (event: KeyboardEvent) => {
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

  function setActiveSection(sectionId: string): void {
    if (activeSectionId === sectionId) return;
    if (activeSectionId) {
      const prev = sectionRegistry.get(activeSectionId);
      prev?.navLinks.forEach((link) => link.classList.remove('active-link'));
    }

    const current = sectionRegistry.get(sectionId);
    current?.navLinks.forEach((link) => link.classList.add('active-link'));
    const currentLabel = current?.section.querySelector<HTMLElement>('h3, h2')?.textContent?.trim() || 'Overview';
    if (activeSectionLabel) {
      activeSectionLabel.textContent = currentLabel;
    }
    activeSectionId = sectionId;
  }

  function initHeadingPermalinks() {
    sections.forEach((section) => {
      const heading = section.querySelector<HTMLElement>('h3, h2');
      const label = heading?.textContent?.trim();
      if (!heading || !label || heading.querySelector('.heading-link-button')) return;

      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'heading-link-button';
      button.setAttribute('aria-label', `Copy link to ${label}`);
      button.innerHTML = '<i class="fa-solid fa-link" aria-hidden="true"></i>';

      button.addEventListener('click', async (event) => {
        event.stopPropagation();

        try {
          await copyText(`${window.location.origin}${window.location.pathname}#${section.id}`, `Link copied for ${label}`);
        } catch (error) {
          console.error('Copy link failed', error);
        }
      });

      heading.append(button);
    });
  }

  /** Collapsibles */
  function toggleSection(section: HTMLElement): void {
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
      updateToggleIcon(isOpen);
    });

    document.addEventListener('click', (event: MouseEvent) => {
      if (!mobileNav.classList.contains('is-open')) return;
      if (!(event.target instanceof Node)) {
        return;
      }
      if (mobileNav.contains(event.target) || mobileToggle.contains(event.target)) {
        return;
      }
      closeMobileMenu();
    });

    window.addEventListener('keydown', (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeMobileMenu();
      }
    });

    // Ensure icon matches initial state
    updateToggleIcon(mobileNav.classList.contains('is-open'));
  }

  function initToolbarActions() {
    jumpToActiveButton?.addEventListener('click', () => {
      if (!activeSectionId) return;
      const activeEntry = sectionRegistry.get(activeSectionId);
      if (!activeEntry) return;

      activeEntry.section.dataset.collapsed = 'false';
      focusScroll(activeEntry.section);
    });

    copyPageLinkButton?.addEventListener('click', async () => {
      try {
        await copyText(window.location.href.split('#')[0], 'Page link copied to clipboard');
      } catch (error) {
        console.error('Copy page link failed', error);
      }
    });

    floatingTopButton?.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: prefersReducedMotion.matches ? 'auto' : 'smooth',
      });
    });

    focusSearchButtons.forEach((button) => {
      button.addEventListener('click', () => {
        focusFirstSearchInput();
      });
    });

    const handleToolbarShortcuts = (event: KeyboardEvent) => {
      const openSearchShortcut = event.key === '/' || ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k');

      if (openSearchShortcut && !isEditableTarget(event.target)) {
        event.preventDefault();
        focusFirstSearchInput();
        return;
      }

      if (event.key === 'Escape') {
        if (currentSearchQuery) {
          setSearchQuery('', searchInputs[0]);
          return;
        }

        closeMobileMenu();
      }
    };

    window.addEventListener('keydown', handleToolbarShortcuts);
    window.addEventListener('scroll', updateFloatingActionButton, { passive: true });
    updateFloatingActionButton();
  }

  function updateFloatingActionButton() {
    if (!floatingTopButton) return;
    const shouldShow = window.pageYOffset > 640;
    floatingTopButton.classList.toggle('is-visible', shouldShow);
  }

  /** TOC search */
  function initSearchInputs() {
    searchInputs.forEach((input) => {
      input.addEventListener('input', () => {
        setSearchQuery(input.value, input);
      });
    });

    updateSearchSummary(sections.length, '');
  }

  function setSearchQuery(rawQuery: string, sourceInput?: HTMLInputElement) {
    const query = rawQuery.trim().toLowerCase();
    currentSearchQuery = query;

    searchInputs.forEach((input) => {
      if (input !== sourceInput && input.value !== rawQuery) {
        input.value = rawQuery;
      }
    });

    let visibleCount = 0;
    const visibleSections: HTMLElement[] = [];

    sections.forEach((section) => {
      const searchIndex = sectionSearchIndex.get(section.id) ?? section.innerText.toLowerCase();
      const matches = query.length === 0 || searchIndex.includes(query);

      section.hidden = !matches;
      section.classList.toggle('section-match', query.length > 0 && matches);

      if (matches) {
        visibleCount += 1;
        visibleSections.push(section);
        if (query.length > 0 && section.dataset.collapsed === 'true') {
          section.dataset.collapsed = 'false';
        }
      }
    });

    navLists.forEach((list) => {
      const links = list.querySelectorAll<HTMLAnchorElement>('.nav-link');
      let listVisibleCount = 0;

      links.forEach((link) => {
        const linkedSection = link.dataset.sectionId ? sectionRegistry.get(link.dataset.sectionId)?.section : null;
        const matches = query.length === 0 || (!!linkedSection && !linkedSection.hidden);

        if (link.parentElement) {
          link.parentElement.style.display = matches ? '' : 'none';
        }

        if (matches) {
          listVisibleCount += 1;
        }
      });

      const context = list.closest('.sidebar-inner, .navigation-bar-header-menu-items');
      const emptyState = context?.querySelector<HTMLElement>('.toc-empty');
      emptyState?.classList.toggle('is-visible', listVisibleCount === 0);
    });

    updateToggleAllButton();
    updateSearchSummary(visibleCount, query);

    if (query.length > 0) {
      const nextActiveSection = visibleSections.find((section) => section.id === activeSectionId) ?? visibleSections[0];

      if (nextActiveSection) {
        setActiveSection(nextActiveSection.id);
      } else if (activeSectionLabel) {
        activeSectionLabel.textContent = 'No matches';
      }
      return;
    }

    const firstVisibleSection = sections.find((section) => !section.hidden);
    if (firstVisibleSection) {
      setActiveSection(firstVisibleSection.id);
    }
  }

  function updateSearchSummary(visibleCount: number, query: string) {
    if (!toolbarSearchSummary) return;

    if (!query) {
      toolbarSearchSummary.innerHTML = 'Browse every section or press <kbd>/</kbd> to search instantly.';
      return;
    }

    const escapedQuery = escapeHtml(query);
    if (visibleCount === 0) {
      toolbarSearchSummary.innerHTML = `No sections match <span class="search-query-label">${escapedQuery}</span>. Press <kbd>Esc</kbd> to clear.`;
      return;
    }

    const label = visibleCount === 1 ? 'section' : 'sections';
    toolbarSearchSummary.innerHTML = `Showing <strong>${visibleCount}</strong> matching ${label} for <span class="search-query-label">${escapedQuery}</span>.`;
  }

  /** Document stats */
  function initStats() {
    const statsContainer = document.getElementById('doc-stats');
    if (!statsContainer) return;

    const snippetCount = document.querySelectorAll('.documentation-body pre code').length;
    const linkCount = document.querySelectorAll('.documentation-body a').length;
    const totalWords = document
      .querySelector<HTMLElement>('.documentation-body')
      ?.innerText.trim()
      .split(/\s+/)
      .filter(Boolean).length || 0;
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