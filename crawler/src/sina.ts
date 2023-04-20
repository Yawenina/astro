import axios from "axios";
import { JSDOM } from 'jsdom';
import * as path from "path";
import * as fsa from 'fs-extra';
import {Article, MarkdownData} from "./article";

export class SinaArticle extends Article {
  parseHtml(html: string): MarkdownData {
    const dom = new JSDOM(html, {
      url: "https://blog.sina.com.cn",
    })
    const title = dom.window.document.querySelector('.titName')?.innerHTML;
    let seriesTitle = title;
    const result = title?.match(/.*\((?<seq>\d+)\)(?<title>.*)/)
    if (result && result.groups) {
      seriesTitle = result.groups?.title;
    }
    const article = dom.window.document.querySelectorAll('#sina_keyword_ad_area2 p');
    let sentences: Array<string> = [];
    Array.from(article).map((p: any) => {
      const paras = p?.textContent?.replace('<br>', '\n').split(/\n/).filter((text: string) => !!text);
      sentences = sentences.concat([...paras, '\n']);
    })
    return {
      seriesNo: this.seriesNo,
      title: `${this.seriesNo}-${seriesTitle}`,
      sentences,
      origin: `http:${this.href}`
    }
  }
}

function fetchArticleListByPage(pageNum: number) {
  return axios.get(`
    https://blog.sina.com.cn/s/articlelist_1347374793_5_${pageNum}.html 
  `).then(res => {
    try {
      const dom = new JSDOM(res.data)
      return [...dom.window.document.querySelectorAll('.atc_title a')].reverse().map((item) => {
        return ({
          title: (item as HTMLAnchorElement).innerHTML,
          href: (item as HTMLAnchorElement).href
        })
      })
    } catch(e) {}
  }).catch(e => {
    console.error('fetchArticleListByPage', e)
  })
}
export async function fetchArticleUrlList() {
  let list: Array<{ title: string, href: string }> = [];
  let i = 3;
  while (i > 0) {
    const pageList = await fetchArticleListByPage(i);
    list = list.concat(pageList || []);
    i--;
  }
  fsa.outputJSON(path.join(__dirname, '../articles/constants.ts'), list, (err) => {
    if (err) {
      return console.error('write list file error', err)
    }
    console.log('fetch url list succeed!')
  })
}
