import {UrlSegment} from "@angular/router";
import {TextHost} from "./TextHost";

export function checkLang(url: UrlSegment[]) {
  if (url.length == 0) return null;
  const lang = url[0].path;
  return TextHost.SupportedLanguages.findIndex(item => lang.toLowerCase() === item) >= 0 ?
    ({consumed: url.slice(0, 1), posParams: {lang: new UrlSegment(lang, {})}}) : null;
}
