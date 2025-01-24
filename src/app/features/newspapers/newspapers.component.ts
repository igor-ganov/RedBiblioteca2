import { Component, inject, OnInit } from '@angular/core';
import { NewspaperRepository } from './services/NewspaperRepository';
import { Observable, map } from 'rxjs';
import { Newspaper } from './models/Newspaper';
import { UserService } from '@common/permission-system/UserService';
import { MatIconAnchor } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { NewspaperPreviewComponent } from './newspaper-preview/newspaper-preview.component';
import { LoadingComponent } from '../../common/components/loading/loading.component';
import { AsyncPipe } from '@angular/common';

@Component({
    selector: 'app-newspapers',
    templateUrl: './newspapers.component.html',
    styleUrl: './newspapers.component.css',
    imports: [MatIconAnchor, RouterLink, MatIcon, NewspaperPreviewComponent, LoadingComponent, AsyncPipe]
})
export class NewspapersComponent implements OnInit {
  public readonly readonly$ = inject(UserService).currentUser$.pipe(map(u => u === undefined));
  public readonly newspapersRepository = inject(NewspaperRepository);
  public newspapers$?: Observable<Newspaper[]>;
  ngOnInit(): void {
    setTimeout(() => {
      this.newspapers$ = this.newspapersRepository.getAll();
    })
  }
  public onClick() {
    this.newspapersRepository.getAll().subscribe();
  }
}
