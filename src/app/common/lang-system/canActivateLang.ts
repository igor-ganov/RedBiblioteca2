import {ActivatedRouteSnapshot, CanActivateFn} from "@angular/router";
import {TextHost} from "@common/lang-system/TextHost";

export const canActivateLang: CanActivateFn = (
  route: ActivatedRouteSnapshot,
) => {
  const lang = route.paramMap.get('lang');
  return lang != null && TextHost.SupportedLanguages.findIndex(item => lang.toLowerCase() === item) >= 0
};
