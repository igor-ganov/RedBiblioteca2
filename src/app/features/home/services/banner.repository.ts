import {inject, Injectable} from "@angular/core";
import {SingleContentService} from "@common/help/services/single-content.service";

@Injectable({providedIn: 'root'})
export class HomeBannerRepository {
  private readonly contentName = 'home-banner';
  private readonly singleContentService: SingleContentService<HomeBanner> = inject(SingleContentService);

  public get(lang: string) {
    return this.singleContentService.get(lang, this.contentName);
  }

  public update(lang: string, value: HomeBanner) {
    return this.singleContentService.update(lang, value, this.contentName);
  }

  public add(lang: string, value: HomeBanner) {
    return this.singleContentService.add(lang, value, this.contentName);
  }

  public delete(lang: string) {
    return this.singleContentService.delete(lang, this.contentName);
  }
}


export interface HomeBanner {
  title: string;
  subtitle: string;
  content: string;
}
