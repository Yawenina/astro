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
exports.Article = exports.MarkdownData = void 0;
const axios_1 = __importDefault(require("axios"));
const fsa = __importStar(require("fs-extra"));
const path_1 = __importDefault(require("path"));
const dayjs_1 = __importDefault(require("dayjs"));
class MarkdownData {
    constructor(seriesNo, title, origin, sentences) {
        this.seriesNo = seriesNo;
        this.title = title;
        this.origin = origin;
        this.sentences = sentences;
    }
}
exports.MarkdownData = MarkdownData;
class Article {
    constructor(title, href) {
        this.title = title;
        this.href = href;
    }
    fetchArticle() {
        return axios_1.default.get(this.href)
            .then(res => res.data);
    }
    generateMd(data) {
        const { seriesNo, title, origin, sentences } = data;
        const date = (0, dayjs_1.default)('2023-04-20 20:00:00').subtract(seriesNo, 'minute').format();
        const md = `---
title: ${title}
slug: ${seriesNo}
authors: soilAstro
date: ${date}
---
# ${title}

${origin && `> 转载自：${origin}`}

${sentences === null || sentences === void 0 ? void 0 : sentences.join('\n\n')}
  `;
        const outputPath = path_1.default.join(__dirname, `../../planets-in-12-houses/${seriesNo}.md`);
        console.log('🚀### outputPath =', outputPath);
        fsa.outputFile(path_1.default.join(__dirname, `../../planets-in-12-houses/${seriesNo}.md`), md, (err) => {
            if (err) {
                console.log('write markdown failed', err);
            }
        });
    }
    workflow() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`🤖 开始下载 ${this.title}...`);
            const html = yield this.fetchArticle();
            const markdown = this.parseHtml(html);
            this.generateMd(markdown);
            console.log(`🎉 ${this.title} 下载成功！`);
        });
    }
}
exports.Article = Article;
