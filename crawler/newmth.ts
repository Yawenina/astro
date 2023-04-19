import axios from "axios";
import { JSDOM } from 'jsdom';
import * as path from "path";
import * as fs from "fs";
import * as fsa from 'fs-extra';
import LIST from './articles/list';
import {MOCK_HTML} from "./mock";

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
    // console.error('fetchArticleListByPage', e)
  })
}
async function fetchArticleUrlList() {
  let list: Array<{ title: string, href: string }> = [];
  let i = 3;
  while (i > 0) {
    const pageList = await fetchArticleListByPage(i);
    list = list.concat(pageList || []);
    i--;
  }
  fsa.outputJSON(path.join(__dirname, '../articles/list.ts'), list, (err) => {
    if (err) {
      return console.error('write list file error', err)
    }
    console.log('fetch url list succeed!')
  })
}

interface IArticleItem {
  title: string;
  href: string;
  done?: boolean;
}
async function fetchSinaArticle(item: IArticleItem) {
  if (!item.href.match(/.*sina.*/)) return;
  return axios.get(item.href)
    .then(res => res.data)
    .then(html => {
      return parseHTML(html, item)
    })
}

function parseHTML(html: string, item: any) {
  const dom = new JSDOM(html, {
    url: "https://blog.sina.com.cn",
  })
  const title = dom.window.document.querySelector('.titName')?.innerHTML;
  let seriesNo = 1;
  let seriesTitle = title;
  const result = title?.match(/.*\((?<seq>\d+)\)(?<title>.*)/)
  if (result && result.groups) {
    seriesNo = +result.groups?.seq;
    seriesTitle = result.groups?.title;
  }
  const article = dom.window.document.querySelectorAll('#sina_keyword_ad_area2 p');
  const sentences = Array.from(article).map((p: any) => {
    return p?.textContent?.replace('<br>', '\n').split(/\n/).filter((text: string) => !!text)?.join('\n')
  })
  return {
    item,
    seriesNo,
    seriesTitle,
    title: `${seriesNo}-${seriesTitle}`,
    sentences,
  }
}

function generateMd(data = {} as any) {
  const { seriesNo, seriesTitle, title, sentences, item } = data;
  const md = `---
title: ${title}
slug: ${seriesNo}
authors: soilAstro
---

# ${title}
${sentences?.join('\n\n')}
  `;
  fsa.outputFile(path.join(__dirname, `../../planets-in-12-houses/${seriesNo}.md`), md, (err) => {
    if (err) {
      console.log('write markdown failed', err)
    }
    if (item) {
      item.done = true;
    }
  })
}

(async function run() {
  let i = 121;
  // for (let i = 50; i >= 0; i--) {
    console.log(`⏰ 开始下载 【${i}】`)
    const data = await fetchSinaArticle(LIST[0]);
    generateMd(data);
    console.log(`🎉 ${data?.title} 下载完成！`)
  // }
})()


