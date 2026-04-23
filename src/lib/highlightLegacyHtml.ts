import { load } from 'cheerio';
import { createHighlighter } from 'shiki';

const highlighterPromise = createHighlighter({
  themes: ['everforest-light', 'everforest-dark'],
  langs: ['javascript', 'typescript', 'html', 'css', 'json', 'bash', 'text'],
});

function normalizeLanguage(className: string | undefined) {
  const matchedLanguage = className?.match(/lang-([a-z0-9-]+)/i)?.[1]?.toLowerCase();

  if (!matchedLanguage) {
    return 'text';
  }

  if (matchedLanguage === 'js') {
    return 'javascript';
  }

  if (matchedLanguage === 'ts') {
    return 'typescript';
  }

  return matchedLanguage;
}

function trimCodeSample(source: string) {
  return source.replace(/^\n+/, '').replace(/\n+\s*$/, '\n');
}

export async function highlightLegacyHtml(html: string) {
  const $ = load(html);
  const highlighter = await highlighterPromise;
  const blocks = $('pre.code').toArray();

  for (const block of blocks) {
    const codeElement = $(block).find('code').first();
    const language = normalizeLanguage(codeElement.attr('class'));
    const source = trimCodeSample(codeElement.text());
    const highlighted = highlighter.codeToHtml(source, {
      lang: language,
      themes: {
        light: 'everforest-light',
        dark: 'everforest-dark',
      },
      defaultColor: false,
    });
    const highlightedMarkup = load(highlighted);
    const pre = highlightedMarkup('pre').first();

    pre.addClass('code');
    pre.attr('data-language', language);

    $(block).replaceWith(highlightedMarkup.root().html() ?? highlighted);
  }

  return $.root().html() ?? html;
}