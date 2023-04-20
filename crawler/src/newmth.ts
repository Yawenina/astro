import {Article, MarkdownData} from "./article";
import {JSDOM} from "jsdom";
import axios from "axios";
import iconv from 'iconv-lite';

export class NewmthArticle extends Article {
  fetchArticle() {
    return axios.get(this.href,{
      responseType: 'arraybuffer'
    })
      .then(res => {
        return iconv.decode(res.data, 'gbk')
      })
  }
  parseHtml(html: string): MarkdownData {
    const dom = new JSDOM(html, {
      url: "https://www.newsmth.net/",
    })
    let title = this.title;
    const result = this.title.match(/.*(?<index>\d+)\)(?<title>.*)/);
    if (result) {
      title = result.groups?.title || this.title;
    }
    const article = dom.window.document.querySelector('.article')?.textContent?.split('\n');

    const stationIndex = article?.findIndex(text => text.match(/发信站/)) || 0;
    const originIndex = article?.findIndex(text => text.match(/出处.*(?<url>http.*)/)) || -1;
    const endIndex = article?.findIndex(text => /^-/.test(text)) || article?.length;

    const origin = article?.[originIndex]?.match(/出处.*(?<url>http.*)/)
    let startIndex = stationIndex;
    if (originIndex) {
      startIndex = originIndex;
    }

    const sentences = article?.slice(startIndex + 1, endIndex) || [''];

    return {
      seriesNo: this.seriesNo,
      title: `${this.seriesNo}-${title}`,
      sentences,
      origin: (origin && origin.groups?.url) || this.href
    }
  }
}
