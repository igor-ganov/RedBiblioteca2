import { Component } from '@angular/core';

@Component({
  selector: 'app-top-banner',
  templateUrl: './top-banner.component.html',
  styleUrl: './top-banner.component.css'
})
export class TopBannerComponent {
  description: string = `Institute
                  for the Study of
                  International
                  Working-Class Movement`;
  title: string = `Sergio Motosi`;
  quote: string = `for "the in-depth study of the history of the working-class movement throughout the world, with particular reference to the forms of political and trade union organisations from their inception to the present day"`;
}
