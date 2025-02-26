import {ChangeDetectionStrategy, Component, input} from '@angular/core';
import {RouterLink} from "@angular/router";
import {RouteBarLink} from "@app/layout/route-bar/route-bar.component";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-route-bar-link',
  imports: [
    RouterLink,
    NgClass
  ],
  template: `
    <a class="route-link"
       [ngClass]="[isFirst() ? 'pentagon-arrow-first' : 'pentagon-arrow', isLast() ? 'disabled' : '']"
       [routerLink]="value().path()">{{ value().text() }}</a>
  `,
  styles: `
    .route-link {
      text-wrap-mode: nowrap;

      text-decoration: none;

      display: block;
      transition: scale 0.05s ease-in;

      background-color: var(--primary-default);
      color: var(--primary-default-contrast);

      &.disabled {
        background: var(--current-link);
        pointer-events: none;
      }

      &:hover {
        filter: brightness(110%);
      }

      &:active {
        scale: 98%;
      }
    }

    .pentagon-arrow-first {
      clip-path: polygon(0% 0%, calc(100% - 1em) 0%, 100% 50%, calc(100% - 1em) 100%, 0% 100%);
      padding: 0.2em 1.2em 0.5em 0.7em;
    }

    .pentagon-arrow {
      clip-path: polygon(0% 0%, calc(100% - 1em) 0%, 100% 50%, calc(100% - 1em) 100%, 0% 100%, 1em 50%);
      padding: 0.2em 1.2em 0.5em 1.7em;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RouteBarLinkComponent {
  public readonly value = input.required<RouteBarLink>();
  public readonly isFirst = input.required<boolean>();
  public readonly isLast = input.required<boolean>();
}
