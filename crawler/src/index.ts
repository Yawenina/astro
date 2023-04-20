import LIST from "./constants";
import {SinaArticle} from "./sina";
import {NewmthArticle} from "./newmth";

function start(start = 0, end = LIST.length - 1) {
  for (let i = start; i <= end; i++) {
    const { title, href } = LIST[i];
    const isSina = href.match(/.*sina.*/);
    const instance = isSina ? new SinaArticle(title, href, i) : new NewmthArticle(title, href, i);
    instance.workflow();
  }
}

start()
