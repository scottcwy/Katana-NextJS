"use client";

import "highlight.js/styles/atom-one-dark.min.css";
import "./markdown.css";

import MarkdownIt from "markdown-it";
import React from "react";
import hljs from "highlight.js";

export default function Markdown({ content }: { content: string }) {
  const md: MarkdownIt = new MarkdownIt({
    highlight: function (str: string, lang: string) {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return `<pre class="hljs"><code>${
            hljs.highlight(str, { language: lang, ignoreIllegals: true }).value
          }</code></pre>`;
        } catch (_) {}
      }

      return `<pre class="hljs"><code>${md.utils.escapeHtml(str)}</code></pre>`;
    },
  });

  const renderedMarkdown = md.render(content);

  return (
    <div
      className="max-w-full overflow-x-auto markdown"
      dangerouslySetInnerHTML={{ __html: renderedMarkdown }}
    />
  );
}
