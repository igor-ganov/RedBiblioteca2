import {Component, OnInit} from '@angular/core';
import {LoginText} from '../login/locale/LoginText';
import {Observable} from 'rxjs';
import { MatButton } from '@angular/material/button';
import { SliderComponent } from '../../common/components/slider/slider.component';
import { AsyncPipe } from '@angular/common';

@Component({
    selector: 'app-test',
    templateUrl: './test.component.html',
    styleUrl: './test.component.css',
    imports: [MatButton, SliderComponent, AsyncPipe]
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
