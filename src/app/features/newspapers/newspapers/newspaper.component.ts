import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Newspaper } from '../models/Newspaper';
import { ActivatedRoute } from '@angular/router';
import { NewspaperRepository } from '../services/NewspaperRepository';
import { Observable, delay, finalize, map, tap } from 'rxjs';
import { errorThrow, toBase64 } from '../../../common/help/help-fuctions';
import { UserService } from '../../../common/permission-system/UserService';
import { Result } from "@common/help/services/Result";

@Component({
  selector: 'app-newspaper',
  templateUrl: './newspaper.component.html',
  styleUrl: './newspaper.component.css'
})
export class NewspaperComponent {
  
  public isUpdating = false;
  onPublish(value: Newspaper) {
    this.isUpdating = true;
    this.repository.update(value).pipe(finalize(() => this.isUpdating = false)).subscribe();//todo update view;
  }

  private readonly newspaperId = inject(ActivatedRoute).snapshot.paramMap.get('newspaperId') ?? errorThrow("Newspaper's Id can't be empty")!;
  private repository = inject(NewspaperRepository);
  public newspaper$?: Observable<Result<Newspaper>>;
  ngOnInit(): void {
    this.newspaper$ = this.repository.findByPid(this.newspaperId);
  }
}
