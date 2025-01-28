import {ChangeDetectionStrategy, Component} from '@angular/core';


@Component({
  selector: 'app-footer',
  template: `
<div class="subline"></div>
<div class="container">
  <div class="logo">
    <img class="img-title" [src]="'assets/img/logo.png'" alt="logo">
  </div>
  <div class="container-info">
    <div class="info">
      <span class="name">{{ name }}</span>
      <div class="contacts">
        <span class="address">{{ contacts.address }}</span>
        <span class="phone">tel. {{ contacts.phone }}</span>
        <span class="e-mail">e-mail: {{ contacts.email }}</span>
      </div>
    </div>

    <span class="copyright">{{ copyright }}</span>
  </div>
</div>


`,
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
