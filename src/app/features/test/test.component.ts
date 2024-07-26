import { Component, inject } from '@angular/core';
import { NewspaperRepository } from '../newspapers/services/NewspaperRepository';
import { ActivatedRoute } from '@angular/router';
import { LoginText } from '../login/locale/LoginText';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrl: './test.component.css'
})
export class TestComponent {


  constructor(private activatedRoute: ActivatedRoute){}
  private repository = inject(NewspaperRepository);
  public opened = true;
  public onClick(){
  }

  public translation?: Observable<LoginText>;

  ngOnInit() {
    this.activatedRoute.data.subscribe(({context}) => {
      // this.translation = (context.text() as TextHostFactory<LoginText>).getText();
    });
  }
}
