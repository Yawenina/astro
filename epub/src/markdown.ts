import frontMatter from 'front-matter';

interface MarkdownOpts {
  content: string;
}

export class Markdown {
  #opts: MarkdownOpts;
  constructor(opts: MarkdownOpts) {
    this.#opts = opts;
  }

  parseFrontMatter() {
    const {
      attributes,
      body,
    } = frontMatter(this.#opts.content);
    return {
      attributes,
      body,
    };
  }

  async parseMarkdown(body: string) {
    const MarkdownIt = require('markdown-it');
    const md = new MarkdownIt({
      html: true,
      breaks: true,
      linkify: true,
      typographer: true
    });
    let html = md.render(body);
    return html;
  }
}