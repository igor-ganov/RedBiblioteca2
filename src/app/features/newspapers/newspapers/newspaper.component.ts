import { Component, inject, OnInit } from '@angular/core';
import { Newspaper } from '../models/Newspaper';
import { ActivatedRoute } from '@angular/router';
import { NewspaperRepository } from '../services/NewspaperRepository';
import { Observable, finalize } from 'rxjs';
import { errorThrow } from '@common/help/help-fuctions';
import { Result } from "@common/help/services/Result";

@Component({
    selector: 'app-newspaper',
    templateUrl: './newspaper.component.html',
    styleUrl: './newspaper.component.css',
    standalone: false
})
export class NewspaperComponent implements OnInit {

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
