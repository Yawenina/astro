"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const list_1 = __importDefault(require("../articles/list"));
const sina_1 = require("./sina");
const newmth_1 = require("./newmth");
function start(start = 0, end = list_1.default.length - 1) {
    for (let i = start; i <= end; i++) {
        const { title, href } = list_1.default[i];
        const isSina = href.match(/.*sina.*/);
        const instance = isSina ? new sina_1.SinaArticle(title, href) : new newmth_1.NewmthArticle(title, href);
        instance.workflow();
    }
}
start(0, 1);
