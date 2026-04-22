export type SectionMetadata = {
  category: string;
  tags: string[];
  summary: string;
};

const DEFAULT_SECTION_METADATA: SectionMetadata = {
  category: 'Reference',
  tags: [],
  summary: '',
};

const SECTION_METADATA: Record<string, SectionMetadata> = {
  'Select Elements': {
    category: 'Querying',
    tags: ['selectors', 'querySelector', 'querySelectorAll'],
    summary: 'Start with direct selectors when you need one match or a static list of matches.',
  },
  'Select First Element': {
    category: 'Querying',
    tags: ['first match', 'single node', 'collections'],
    summary: 'Reach for one node when the chain only needs the first matching element.',
  },
  'Find Elements': {
    category: 'Querying',
    tags: ['descendants', 'nested selectors', 'scoped lookup'],
    summary: 'Search inside an existing element when you want a narrower selector scope.',
  },
  'Select Children': {
    category: 'Traversal',
    tags: ['children', 'direct descendants', 'iteration'],
    summary: 'Move one level down the DOM when you only want direct children, not every descendant.',
  },
  'Select Parent': {
    category: 'Traversal',
    tags: ['parentNode', 'upward traversal', 'relationships'],
    summary: 'Walk upward from a known node when the parent element controls layout or state.',
  },
  'Select Siblings': {
    category: 'Traversal',
    tags: ['siblings', ':scope', 'shared parent'],
    summary: 'Target peer elements by starting from the current node and scoping the query to its parent.',
  },
  'Select Next Sibling': {
    category: 'Traversal',
    tags: ['nextElementSibling', 'adjacent node', 'navigation'],
    summary: 'Use direct sibling pointers when the next rendered element is the one you need.',
  },
  'Select Previous Sibling': {
    category: 'Traversal',
    tags: ['previousElementSibling', 'adjacent node', 'navigation'],
    summary: 'Use the previous sibling pointer for one-step DOM traversal without another selector query.',
  },
  'Add Class': {
    category: 'Classes',
    tags: ['classList', 'state', 'styling'],
    summary: 'Use classList.add() when you are applying a known state or utility class.',
  },
  'Remove Class': {
    category: 'Classes',
    tags: ['classList', 'cleanup', 'state'],
    summary: 'Remove stale or temporary classes explicitly before applying the next visual state.',
  },
  'Toggle Class': {
    category: 'Classes',
    tags: ['classList', 'toggle', 'interactive state'],
    summary: 'Toggle a class when the UI changes between two predictable states.',
  },
  'Has Class': {
    category: 'Classes',
    tags: ['contains', 'classList', 'state checks'],
    summary: 'Check class membership before branching so the DOM state drives the interaction logic.',
  },
  'Get Attribute': {
    category: 'Attributes',
    tags: ['getAttribute', 'href', 'data attributes'],
    summary: 'Read raw attribute values when the browser API does not already expose a richer property.',
  },
  'Set Attribute': {
    category: 'Attributes',
    tags: ['setAttribute', 'links', 'data attributes'],
    summary: 'Write explicit attributes when markup or accessibility state needs to stay in sync.',
  },
  'Remove Attribute': {
    category: 'Attributes',
    tags: ['removeAttribute', 'cleanup', 'accessibility'],
    summary: 'Clear attributes completely when the absence of the attribute is part of the behavior.',
  },
  'Append Content': {
    category: 'Content',
    tags: ['appendChild', 'createElement', 'DOM insertion'],
    summary: 'Append new nodes when you want the new content to appear after the existing children.',
  },
  'Prepend Content': {
    category: 'Content',
    tags: ['insertBefore', 'firstChild', 'DOM insertion'],
    summary: 'Prepend content when new UI belongs at the top of a list or container.',
  },
  'Get or Set HTML': {
    category: 'Content',
    tags: ['innerHTML', 'markup', 'templating'],
    summary: 'Use innerHTML deliberately when you need markup, not just plain text.',
  },
  'Read or Write Inline Styles': {
    category: 'Styling',
    tags: ['style', 'CSSOM', 'inline styles'],
    summary: 'Change inline styles when the value is truly dynamic and does not belong in a class.',
  },
  'Get or Set Text Content': {
    category: 'Content',
    tags: ['textContent', 'plain text', 'escaping'],
    summary: 'Use textContent when you want readable text without parsing or injecting HTML.',
  },
  'Get or Set Input Values': {
    category: 'Forms',
    tags: ['value', 'forms', 'inputs'],
    summary: 'Read and write form values through the input element itself, not through a wrapper API.',
  },
  'Hide Element': {
    category: 'Visibility',
    tags: ['display', 'visibility', 'state'],
    summary: 'Hide an element by setting an explicit display value or by toggling a dedicated class.',
  },
  'Show Element': {
    category: 'Visibility',
    tags: ['display', 'layout', 'state'],
    summary: 'Restore visibility with the right display mode for the component, not just a generic reset.',
  },
  'Add Event Listener': {
    category: 'Events',
    tags: ['addEventListener', 'handlers', 'interaction'],
    summary: 'Bind events directly to the element or container that owns the interaction.',
  },
  'Remove Event Listener': {
    category: 'Events',
    tags: ['removeEventListener', 'cleanup', 'lifecycle'],
    summary: 'Keep a stable handler reference so cleanup is predictable when components unmount or reset.',
  },
  'Inventory selectors before you refactor': {
    category: 'Planning',
    tags: ['audit', 'selectors', 'risk reduction'],
    summary: 'Map the selectors, events, and DOM writes first so you do not lose behavior during cleanup.',
  },
  'Replace chained selections with explicit steps': {
    category: 'DOM queries',
    tags: ['chains', 'NodeList', 'array helpers'],
    summary: 'Break long chains into named collections so each filter or mutation stays readable.',
  },
  'Move repeated DOM work into named helpers': {
    category: 'State',
    tags: ['helpers', 'classList', 'aria'],
    summary: 'Small helpers make repeated DOM mutations easier to test and easier to reuse.',
  },
  'Convert delegated events with closest()': {
    category: 'Events',
    tags: ['delegation', 'closest', 'dynamic UI'],
    summary: 'Use closest() inside one container listener to preserve delegated event behavior.',
  },
  'Swap $.ajax for fetch with explicit errors': {
    category: 'Network',
    tags: ['fetch', 'async/await', 'error handling'],
    summary: 'Fetch gives you native promises, but you need to check response.ok and parse deliberately.',
  },
  'Use small adapters during incremental rewrites': {
    category: 'Workflow',
    tags: ['adapter', 'incremental', 'helpers'],
    summary: 'Temporary wrappers let you remove repeated jQuery patterns without rewriting every file at once.',
  },
  'Ship each refactor with a migration checklist': {
    category: 'Workflow',
    tags: ['QA', 'checklist', 'regression testing'],
    summary: 'Treat every replacement as a small release with checks for behavior, accessibility, and cleanup.',
  },
};

export function resolveSectionMetadata(label: string): SectionMetadata {
  return SECTION_METADATA[label] ?? DEFAULT_SECTION_METADATA;
}