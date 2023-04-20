"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchArticleUrlList = exports.SinaArticle = void 0;
const axios_1 = __importDefault(require("axios"));
const jsdom_1 = require("jsdom");
const path = __importStar(require("path"));
const fsa = __importStar(require("fs-extra"));
const article_1 = require("./article");
class SinaArticle extends article_1.Article {
    parseHtml(html) {
        var _a, _b, _c;
        const dom = new jsdom_1.JSDOM(html, {
            url: "https://blog.sina.com.cn",
        });
        const title = (_a = dom.window.document.querySelector('.titName')) === null || _a === void 0 ? void 0 : _a.innerHTML;
        let seriesNo = 1;
        let seriesTitle = title;
        const result = title === null || title === void 0 ? void 0 : title.match(/.*\((?<seq>\d+)\)(?<title>.*)/);
        if (result && result.groups) {
            seriesNo = +((_b = result.groups) === null || _b === void 0 ? void 0 : _b.seq);
            seriesTitle = (_c = result.groups) === null || _c === void 0 ? void 0 : _c.title;
        }
        const article = dom.window.document.querySelectorAll('#sina_keyword_ad_area2 p');
        const sentences = Array.from(article).map((p) => {
            var _a, _b;
            return (_b = (_a = p === null || p === void 0 ? void 0 : p.textContent) === null || _a === void 0 ? void 0 : _a.replace('<br>', '\n').split(/\n/).filter((text) => !!text)) === null || _b === void 0 ? void 0 : _b.join('\n');
        });
        return {
            seriesNo,
            title: `${seriesNo}-${seriesTitle}`,
            sentences,
            origin: this.href
        };
    }
}
exports.SinaArticle = SinaArticle;
function fetchArticleListByPage(pageNum) {
    return axios_1.default.get(`
    https://blog.sina.com.cn/s/articlelist_1347374793_5_${pageNum}.html 
  `).then(res => {
        try {
            const dom = new jsdom_1.JSDOM(res.data);
            return [...dom.window.document.querySelectorAll('.atc_title a')].reverse().map((item) => {
                return ({
                    title: item.innerHTML,
                    href: item.href
                });
            });
        }
        catch (e) { }
    }).catch(e => {
        console.error('fetchArticleListByPage', e);
    });
}
function fetchArticleUrlList() {
    return __awaiter(this, void 0, void 0, function* () {
        let list = [];
        let i = 3;
        while (i > 0) {
            const pageList = yield fetchArticleListByPage(i);
            list = list.concat(pageList || []);
            i--;
        }
        fsa.outputJSON(path.join(__dirname, '../articles/constants.ts'), list, (err) => {
            if (err) {
                return console.error('write list file error', err);
            }
            console.log('fetch url list succeed!');
        });
    });
}
exports.fetchArticleUrlList = fetchArticleUrlList;
// function parseSinaHTML(html: string, item: any) {
//   const dom = new JSDOM(html, {
//     url: "https://blog.sina.com.cn",
//   })
//   const title = dom.window.document.querySelector('.titName')?.innerHTML;
//   let seriesNo = 1;
//   let seriesTitle = title;
//   const result = title?.match(/.*\((?<seq>\d+)\)(?<title>.*)/)
//   if (result && result.groups) {
//     seriesNo = +result.groups?.seq;
//     seriesTitle = result.groups?.title;
//   }
//   const article = dom.window.document.querySelectorAll('#sina_keyword_ad_area2 p');
//   const sentences = Array.from(article).map((p: any) => {
//     return p?.textContent?.replace('<br>', '\n').split(/\n/).filter((text: string) => !!text)?.join('\n')
//   })
//   return {
//     item,
//     seriesNo,
//     seriesTitle,
//     title: `${seriesNo}-${seriesTitle}`,
//     sentences,
//   }
// }
//
// function generateMd(data = {} as any) {
//   const { seriesNo, title, sentences, item } = data;
//   const md = `---
// title: ${title}
// slug: ${seriesNo}
// authors: soilAstro
// ---
//
// # ${title}
// ${sentences?.join('\n\n')}
//   `;
//   fsa.outputFile(path.join(__dirname, `../../planets-in-12-houses-1/${seriesNo}.md`), md, (err) => {
//     if (err) {
//       console.log('write markdown failed', err)
//     }
//     if (item) {
//       item.done = true;
//     }
//   })
// }
//
// (async function run() {
//   let i = 121;
//   // for (let i = 50; i >= 0; i--) {
//   console.log(`⏰ 开始下载 【${i}】`)
//   const data = await fetchSinaArticle(LIST[0]);
//   generateMd(data);
//   console.log(`🎉 ${data?.title} 下载完成！`)
//   // }
// })()
//
//
