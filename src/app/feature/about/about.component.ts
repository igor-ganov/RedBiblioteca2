import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'app-about',
  template: `
<div class="container">
    <div class="text-block">
        <span class="main-text">
            I comunisti sdegnano di nascondere le loro opinioni e le loro intenzioni.
            Dichiarano apertamente che i loro fini possono esser raggiunti soltanto col rovesciamento violento di tutto l'ordinamento sociale finora esistente.
            Le classi dominanti tremino al pensiero d'una rivoluzione comunista.
            I proletari non hanno da perdervi che le loro catene. Hanno un mondo da guadagnare.
        </span>
        <span class="end-text">
            PROLETARI DI TUTTI I PAESI, UNITEVI!
        </span>
    </div>
</div>
`,
  styleUrl: './about.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutComponent {

}
