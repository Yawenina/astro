import axios from "axios";
import * as fsa from "fs-extra";
import path from "path";
import {IArticleItem, IMarkdownData} from "./types";
import dayjs from "dayjs";

export class MarkdownData {
  constructor(
    public seriesNo: number,
    public title: string,
    public origin: string,
    public sentences: Array<string>,
    // public metaData: IArticleItem
  ) {
  }
}
export abstract class Article {
  constructor(public title: string, public href: string, public seriesNo: number) {
  }

  abstract parseHtml(html: string): MarkdownData;

  fetchArticle() {
    return axios.get(this.href)
      .then(res => res.data)
  }


  generateMd(data: MarkdownData) {
    const { seriesNo, title, origin, sentences } = data;
    const date = dayjs('2008-06-13 23:59:59').subtract(seriesNo, 'minute').format();
    const formatted = sentences?.map(text => /^\(\d+/.test(text) ? `### ${text}` : text)
    const md = `---
title: ${title}
slug: ${seriesNo}
authors: soilAstro
date: ${date}
---
# ${title}

${origin && `> 转载自：${origin}`}

${formatted?.join('\n')}
  `;
    fsa.outputFile(path.join(__dirname, `../../planets-in-12-houses/${seriesNo}.md`), md, (err) => {
      if (err) {
        console.log('write markdown failed', err)
      }
    })
  }

  async workflow() {
    console.log(`🤖 开始下载 ${this.title}...`)
    const html = await this.fetchArticle();
    const markdown = this.parseHtml(html);
    this.generateMd(markdown);
    console.log(`🎉 ${this.title} 下载成功！`)
  }
}
