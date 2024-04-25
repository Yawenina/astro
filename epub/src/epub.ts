import { Markdown } from './markdown';
import assert from 'assert';
import fs from 'fs';
import path from 'path';
import os from 'os';

interface EpubOpts {
  title: string;
  author: string;
  root: string;
  pubId: string;
  pubUrl?: string;
  updatedAt?: Date;
}

interface MdInfo {
  attributes: {
    title: string;
    order: number;
  };
  content: string;
  path: string;
  fileName: string;
  html: string;
}

export class Epub {
  #opts: EpubOpts;
  constructor(opts: EpubOpts) {
    this.#opts = opts;
  }

  async generate() {
    const tmpDir = path.join(__dirname, `epub-${randomString(6)}`);
    fs.mkdirSync(tmpDir);
    console.log('tmpDir', tmpDir);
    const mdFiles = await this.#parseMdFiles(tmpDir);

    // prepare dirs
    fs.mkdirSync(path.join(tmpDir, 'META-INF'));
    fs.mkdirSync(path.join(tmpDir, 'OEBPS'));

    // mimetype
    fs.writeFileSync(path.join(tmpDir, 'mimetype'), 'application/epub+zip');

    // META-INF/container.xml
    fs.writeFileSync(path.join(tmpDir, 'META-INF', 'container.xml'), `
<?xml version="1.0" encoding="UTF-8"?>
<container xmlns="urn:oasis:names:tc:opendocument:xmlns:container" version="1.0">
  <rootfiles>
    <rootfile full-path="OEBPS/content.opf" media-type="application/oebps-package+xml"/>
  </rootfiles>
</container>
    `.trimStart());

    // OEBPS/content.opf
    const chapterItems = mdFiles.map((mdFile) => {
      return `<item id="${mdFile.fileName}" href="${mdFile.fileName}.html" media-type="text/html" />`;
    }).join('\n');
    const chapterSpine = mdFiles.map((mdFile, i) => {
      return `<itemref idref="${mdFile.fileName}" />`;
    }).join('\n');
    fs.writeFileSync(path.join(tmpDir, 'OEBPS', 'content.opf'), `
<?xml version="1.0" encoding="UTF-8"?>
<package xmlns="http://www.idpf.org/2007/opf" version="3.0" xml:lang="en" unique-identifier="pub-id" prefix="cc: http://creativecommons.org/ns#">
  <metadata xmlns:dc="http://purl.org/dc/elements/1.1/">
    <dc:title id="title">${this.#opts.title}</dc:title>
    <dc:creator id="creator">${this.#opts.author}</dc:creator>
    <dc:identifier id="pub-id">${this.#opts.pubId}</dc:identifier>
    <dc:language>en-US</dc:language>
    ${this.#opts.pubUrl ? `<dc:relation>${this.#opts.pubUrl}</dc:relation>` : ''}
    <meta property="dcterms:modified">${(this.#opts.updatedAt || new Date()).toISOString()}</meta>
  </metadata>
  <manifest>
    ${chapterItems}
    <item id="ncx" href="toc.ncx" media-type="application/x-dtbncx+xml" />
  </manifest>
  <spine toc="ncx">
    ${chapterSpine}
  </spine>
</package>
    `.trimStart());

    // OEBPS/toc.ncx
    const chapterNavPoints = mdFiles.map((mdFile, i) => {
      return `<navPoint id="${i}" playOrder="${i}"><navLabel><text>${mdFile.attributes.title}</text></navLabel><content src="${mdFile.fileName}.html"/></navPoint>`;
    }).join('\n');
    fs.writeFileSync(path.join(tmpDir, 'OEBPS', 'toc.ncx'), `
<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<ncx xmlns="http://www.daisy.org/z3986/2005/ncx/" version="2005-1">
  <docTitle>
    <text>${this.#opts.title}</text>
  </docTitle>
  <navMap>
    ${chapterNavPoints}
  </navMap>
</ncx>
    `.trimStart());

    // chapters.html
    mdFiles.forEach(mdFile => {
      const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${mdFile.fileName}</title>
</head>
<body>
  ${mdFile.html}
</body>
</html>
      `.trimStart();
      fs.writeFileSync(path.join(tmpDir, 'OEBPS', `${mdFile.fileName}.html`), html, 'utf-8');
    });

    // zip
    this.#zip(tmpDir);
  }

  #zip(dir: string) {
    // zip -X0  ../planets-3.epub  mimetype && zip -rDX9 ../planets-3.epub * -x mimetype
    throw new Error('Not implemented');
  }

  async #parseMdFiles(dir: string): Promise<MdInfo[]> {
    const mdFiles = fs.readdirSync(this.#opts.root).filter((f) => f.endsWith('.md'));
    assert(mdFiles.length, `No markdown files found in ${this.#opts.root}`);
    const parsedMdFiles = await async_map(mdFiles, (f) => this.#parseMdFile(path.join(this.#opts.root, f)));
    const sortedMdFiles = parsedMdFiles
      .sort((a, b) => a.attributes.order - b.attributes.order);
    return sortedMdFiles;
  }

  async #parseMdFile(mdFilePath: string): Promise<MdInfo> {
    const content = fs.readFileSync(mdFilePath, 'utf-8');
    const markdown = new Markdown({
      content,
    });
    const { body, attributes } = markdown.parseFrontMatter();
    console.log("🚀 === Epub === #parseMdFile === attributes:", attributes)
    const html = await markdown.parseMarkdown(body);
    const { slug: order, title } = attributes as { slug: number; title: string };
    console.log("🚀 === Epub === #parseMdFile === order:", order)
    // assert(order, `order is required in front-matter of ${mdFilePath}`);
    assert(title, `title is required in front-matter of ${mdFilePath}`);
    return {
      html,
      attributes: { order, title },
      content: body,
      path: mdFilePath,
      fileName: path.basename(mdFilePath, '.md'),
    } as MdInfo;
  }
}

function randomString(length: number) {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

async function async_map<T, R>(arr: T[], fn: (item: T) => Promise<R>): Promise<R[]> {
  const result: R[] = [];
  for (const item of arr) {
    result.push(await fn(item));
  }
  return result;
}