import { Component, inject } from '@angular/core';
import { NewspaperRepository } from './services/NewspaperRepository';
import { Observable, map } from 'rxjs';
import { Newspaper } from './models/Newspaper';
import { UserService } from '@common/permission-system/UserService';

@Component({
  selector: 'app-newspapers',
  templateUrl: './newspapers.component.html',
  styleUrl: './newspapers.component.css'
})
export class NewspapersComponent {
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
