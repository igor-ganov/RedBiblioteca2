import {Component} from '@angular/core';


@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrl: './footer.component.css'
})
export class FooterComponent {
  public name = 'Istituto per Io Studio del Movimento Operaio Internazionale';
  public contacts = {
    address: 'Via De Cavero, 4H - 16152 Genova ITALIA',
    phone: '0106533276',
    email: 'istituto.motosi@ismoi.it'
  }
  public copyright = 'Copyright 2010 ismoi - Istituto Sergio Motosi'
}
