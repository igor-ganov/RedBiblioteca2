import {ChangeDetectionStrategy, Component} from '@angular/core';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  public readonly name = 'Istituto per Io Studio del Movimento Operaio Internazionale';
  public readonly contacts = {
    address: 'Via De Cavero, 4H - 16152 Genova ITALIA',
    phone: '0106533276',
    email: 'istituto.motosi@ismoi.it'
  }
  public readonly copyright = 'Copyright 2010 ismoi - Istituto Sergio Motosi'
}
