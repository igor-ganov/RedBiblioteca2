import {Component} from '@angular/core';

import {Article} from "@app/features/home/article/article";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    standalone: false
})
export class HomeComponent {

  public readonly about: Article = {
    id: 'about',
    title: 'What is about?',
    content: 'ISMOI - Istituto Sergio Motosi per lo Studio del Movimento Operaio Internazionale. L’Istituto è un think tank scientifico per la classe operaia internazionale e si impegna a fornire al movimento operaio strumenti, conoscenze e piattaforme per i compiti del suo sviluppo e organizzazione. La letteratura pubblicata, sebbene abbia carattere di ricerca scientifica, è pubblicata esclusivamente per i compiti pratici della moderna lotta di classe'
  };
  public readonly hotToUse: Article = {
    id: 'how-to-use',
    title: 'How to use the website?',
    content: "Sul sito vengono regolarmente pubblicate le novità della casa editrice: i nostri giornali e libri, le cui descrizioni si trovano nelle apposite sezioni. La casa editrice dell'istituto pubblica libri in diverse lingue che, oltre alle informazioni sui contatti delle filiali, si trovano nelle rispettive rubriche linguistiche"
  };
  public readonly sergioMotosi: Article = {
    id: 'sergio-motosi',
    title: 'Sergio Motosi',
    content: "Suddenly, on 12th October 2002, we lost our comrade, Sergio Motosi. The following passages are taken from his funeral service. Nature can be harsh and cruel to her finest sons. In Sergio Motosi, we lost one of the most impressive representatives of that generation of revolutionaries who came to Marxist science at the end of the 1960s. These were the children of “Leninist tactics for the educational crisis”, a work of Cervetto’s that in the history of our party’s development represents a milestone, a «practical step» on the long road that has led us to the present day."
  };
  public items = [this.about, this.hotToUse, this.sergioMotosi];
}

export class ArticleRepository {

}
