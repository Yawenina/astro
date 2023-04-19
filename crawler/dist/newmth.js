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
const axios_1 = __importDefault(require("axios"));
const jsdom_1 = require("jsdom");
const path = __importStar(require("path"));
const fsa = __importStar(require("fs-extra"));
const list_1 = __importDefault(require("./articles/list"));
function fetchArticleListByPage(pageNum) {
    return axios_1.default.get(`
    https://blog.sina.com.cn/s/articlelist_1347374793_5_${pageNum}.html 
  `).then(res => {
        console.log('🚀### res =', res);
        const dom = new jsdom_1.JSDOM(res.data);
        return [...dom.window.document.querySelectorAll('.atc_title a')].reverse().map((item) => {
            console.log('item', JSON.stringify(item), item.innerHTML);
            return ({
                title: item.innerHTML,
                href: item.href
            });
        });
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
        console.log('=== list', list);
        console.log('🚀### path =', path.join(__dirname, 'articles/list.ts'));
        fsa.outputJSON(path.join(__dirname, '../articles/list.ts'), list, (err) => {
            if (err) {
                return console.error('write list file error', err);
            }
            console.log('fetch url list succeed!');
        });
    });
}
function fetchSinaArticle(item) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!item.href.match(/.*sina.*/))
            return;
        return axios_1.default.get(item.href)
            .then(res => res.data)
            .then(html => {
            return parseHTML(html, item);
        });
    });
}
function parseHTML(html, item) {
    var _a, _b, _c;
    const dom = new jsdom_1.JSDOM(html);
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
        console.log('=== p', JSON.stringify(p), p.textContent);
        return (_b = (_a = p === null || p === void 0 ? void 0 : p.textContent) === null || _a === void 0 ? void 0 : _a.replace('<br>', '\n').split(/\n/).filter((text) => !!text)) === null || _b === void 0 ? void 0 : _b.join('\n');
    });
    console.log('=== data', title, sentences);
    return {
        item,
        seriesNo,
        seriesTitle,
        title: `${seriesNo}-${seriesTitle}`,
        sentences,
    };
}
function generateMd(data = {}) {
    const { seriesNo, seriesTitle, title, sentences, item } = data;
    const md = `---
sidebar_position: ${seriesNo}
---

# ${title}
${sentences === null || sentences === void 0 ? void 0 : sentences.join('\n\n')}
  `;
    console.log('=== md', md);
    fsa.outputFile(path.join(__dirname, `../../docs/${seriesNo}.md`), md, (err) => {
        if (err) {
            console.log('write markdown failed', err);
        }
        if (item) {
            item.done = true;
        }
    });
}
(function run() {
    return __awaiter(this, void 0, void 0, function* () {
        for (let i = 13; i <= 22; i++) {
            console.log(`⏰ 开始下载 【${i}】`);
            const data = yield fetchSinaArticle(list_1.default[i]);
            console.log(`😴 data`, data);
            //const data = parseHTML(MOCK_HTML, LIST[i]);
            generateMd(data);
            console.log(`🎉 ${data === null || data === void 0 ? void 0 : data.title} 下载完成！`);
        }
    });
})();
