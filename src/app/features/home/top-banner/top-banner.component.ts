import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'app-top-banner',
  template: `
<div class="container">
    <div class="banner">
        <div class="title-panel">
            <div class="title">{{title}}</div>
            <div class="description">{{description}}</div>
        </div>
        <div class="quote">{{quote}}</div>
    </div>
</div>
`,
  styleUrl: './top-banner.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopBannerComponent {
  public readonly description = `Institute
                  for the Study of
                  International
                  Working-Class Movement`;
  public readonly title = `Sergio Motosi`;
  public readonly quote = `for "the in-depth study of the history of the working-class movement throughout the world, with particular reference to the forms of political and trade union organisations from their inception to the present day"`;
}
