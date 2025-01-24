import {Component, OnInit} from '@angular/core';
import {LoginText} from '../login/locale/LoginText';
import {Observable} from 'rxjs';

@Component({
    selector: 'app-test',
    templateUrl: './test.component.html',
    styleUrl: './test.component.css',
    standalone: false
})
export class TestComponent implements OnInit {


  constructor() {
  }

  public opened = true;

  public onClick() {
  }

  public translation?: Observable<LoginText>;

  ngOnInit() {

  }
}
