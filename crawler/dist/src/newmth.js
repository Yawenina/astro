"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewmthArticle = void 0;
const article_1 = require("./article");
const jsdom_1 = require("jsdom");
class NewmthArticle extends article_1.Article {
    parseHtml(html) {
        var _a, _b, _c, _d, _e;
        const dom = new jsdom_1.JSDOM(html, {
            url: "https://www.newsmth.net/",
        });
        let seriesNo = 1000;
        let title = this.title;
        const result = this.title.match(/.*(?<index>\d+)\)(?<title>.*)/);
        if (result) {
            seriesNo = Number((_a = result.groups) === null || _a === void 0 ? void 0 : _a.index);
            title = ((_b = result.groups) === null || _b === void 0 ? void 0 : _b.title) || this.title;
        }
        const article = (_d = (_c = dom.window.document.querySelector('.article')) === null || _c === void 0 ? void 0 : _c.textContent) === null || _d === void 0 ? void 0 : _d.split('\n');
        const originText = article === null || article === void 0 ? void 0 : article.find(text => text.match(/出处.*(?<url>http.*)/));
        const origin = originText === null || originText === void 0 ? void 0 : originText.match(/出处.*(?<url>http.*)/);
        const sentences = (article === null || article === void 0 ? void 0 : article.filter((text) => !!text)) || [''];
        return {
            seriesNo,
            title: `${seriesNo}-${title}`,
            sentences,
            origin: (origin && ((_e = origin.groups) === null || _e === void 0 ? void 0 : _e.url)) || this.href
        };
    }
}
exports.NewmthArticle = NewmthArticle;
