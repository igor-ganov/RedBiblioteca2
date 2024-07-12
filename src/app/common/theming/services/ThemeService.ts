import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, Renderer2, RendererFactory2, afterNextRender, afterRender } from '@angular/core';
import { Theme } from '../models/Theme';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private style?: HTMLLinkElement;
  private cssFile?: string;
  // private readonly themeCSSID: string = 'themeCSS';
  private readonly renderer2;
  constructor(
    @Inject(DOCUMENT) private readonly document: Document,
    rendererFactory: RendererFactory2,
  ) {
    console.log('render craeted');
    this.renderer2 = rendererFactory.createRenderer(null, null);
    this.insertThemeLink('light');
    this.insertThemeLink('dark');
  }

  private _theme: Theme = 'light';
  public set theme(theme: Theme) {
    if(theme) {
      // this.insertThemeLink(theme);
      const currentTheme = this.document.getElementById(this._theme!);
      const newTheme = this.document.getElementById(theme);
      this.renderer2.insertBefore(this.document.head, currentTheme, newTheme, true);
    }
    // if(this._theme) this.removeExistingThemeStyle(this.renderer2, this._theme);
    this._theme = theme;
  }
  private insertThemeLink(theme: Theme) {
    const renderClass = "ng-star-inserted";
    {
      const element = this.document.getElementById(theme);
      if(element) {
        if(!element.classList?.contains(renderClass)){
          // element.classList.add(renderClass);
        }
        return;
      }
    }
    

    this.cssFile = `${theme}.css`;

    // Create a link element via Angular's renderer to avoid SSR troubles
    this.style = this.renderer2.createElement('link') as HTMLLinkElement;

    // Set type of the link item and path to the css file
    this.renderer2.setProperty(this.style, 'rel', 'stylesheet');
    this.renderer2.setProperty(this.style, 'href', this.cssFile);
    this.renderer2.setProperty(this.style, 'id', theme);
    // this.renderer2.addClass(this.style, renderClass);

    // Add the style to the head section
    // const firstLink = this._theme ? this.document.head.childNodes[1] : this.document.head.childNodes[0];
    const firstLink = this.document.head.childNodes[0];
    this.renderer2.insertBefore(this.document.head, this.style, firstLink, true);
  }

  public get theme(){ return this._theme; }

  private removeExistingThemeStyle(renderer2: Renderer2, themeCSSID: string) {
    const themeIDHTMlElem = this.document.getElementById(themeCSSID);
    if (themeIDHTMlElem) {
      renderer2.removeChild(this.document.head, themeIDHTMlElem);
    }
  }
}