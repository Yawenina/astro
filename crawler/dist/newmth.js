"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewmthArticle = void 0;
const article_1 = require("./article");
const jsdom_1 = require("jsdom");
const axios_1 = __importDefault(require("axios"));
const iconv_lite_1 = __importDefault(require("iconv-lite"));
class NewmthArticle extends article_1.Article {
    fetchArticle() {
        return axios_1.default.get(this.href, {
            responseType: 'arraybuffer'
        })
            .then(res => {
            return iconv_lite_1.default.decode(res.data, 'gbk');
        });
    }
    parseHtml(html) {
        var _a, _b, _c, _d, _e;
        const dom = new jsdom_1.JSDOM(html, {
            url: "https://www.newsmth.net/",
        });
        let title = this.title;
        const result = this.title.match(/.*(?<index>\d+)\)(?<title>.*)/);
        if (result) {
            title = ((_a = result.groups) === null || _a === void 0 ? void 0 : _a.title) || this.title;
        }
        const article = (_c = (_b = dom.window.document.querySelector('.article')) === null || _b === void 0 ? void 0 : _b.textContent) === null || _c === void 0 ? void 0 : _c.split('\n');
        const stationIndex = (article === null || article === void 0 ? void 0 : article.findIndex(text => text.match(/发信站/))) || 0;
        const originIndex = (article === null || article === void 0 ? void 0 : article.findIndex(text => text.match(/出处.*(?<url>http.*)/))) || -1;
        const endIndex = (article === null || article === void 0 ? void 0 : article.findIndex(text => /^-/.test(text))) || (article === null || article === void 0 ? void 0 : article.length);
        const origin = (_d = article === null || article === void 0 ? void 0 : article[originIndex]) === null || _d === void 0 ? void 0 : _d.match(/出处.*(?<url>http.*)/);
        let startIndex = stationIndex;
        if (originIndex) {
            startIndex = originIndex;
        }
        const sentences = (article === null || article === void 0 ? void 0 : article.slice(startIndex + 1, endIndex)) || [''];
        return {
            seriesNo: this.seriesNo,
            title: `${this.seriesNo}-${title}`,
            sentences,
            origin: (origin && ((_e = origin.groups) === null || _e === void 0 ? void 0 : _e.url)) || this.href
        };
    }
}
exports.NewmthArticle = NewmthArticle;
