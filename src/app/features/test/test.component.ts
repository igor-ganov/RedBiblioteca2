import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Firestore, collectionData, collection, FirestoreModule, addDoc, DocumentReference } from '@angular/fire/firestore';
import { FirebaseModule } from '../../modules/firebase.module';
import { MatButtonModule } from '@angular/material/button';
import { UserProfile } from '@angular/fire/auth';
import { NewspaperRepository } from '../newspapers/services/NewspaperRepository';
import { ActivatedRoute } from '@angular/router';
import { TextHostFactory } from '../../common/lang-system/TextHost';
import { LoginText } from '../login/locale/LoginText';
import { Observable } from 'rxjs';
import { routes } from '../../common/routes/routes';

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