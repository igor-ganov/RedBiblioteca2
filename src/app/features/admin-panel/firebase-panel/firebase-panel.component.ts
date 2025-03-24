import {ChangeDetectionStrategy, Component, inject, signal} from '@angular/core';
import {CloneService, StoreRoot} from './CloneService';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatSelect} from '@angular/material/select';
import {MatOption} from '@angular/material/core';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-firebase-panel',
  template: `
    <div class="container">
      <mat-form-field>
        <mat-label>From</mat-label>
        <mat-select [(value)]="langFrom">
          @for (lang of langList; track lang) {
            <mat-option [value]="lang">
              {{ lang }}
            </mat-option>
          }
        </mat-select>
      </mat-form-field>
      <mat-form-field>
        <mat-label>To</mat-label>
        <mat-select [(value)]="langTo">
          @for (lang of langList; track lang) {
            <mat-option [value]="lang">
              {{ lang }}
            </mat-option>
          }
        </mat-select>
      </mat-form-field>
      <div>
        <button class="clone-button" mat-raised-button (click)="cloneData()">
          Clone
        </button>
      </div>
    </div>
  `,
  styleUrl: './firebase-panel.component.css',
  imports: [MatFormField, MatLabel, MatSelect, MatOption, MatButton],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FirebasePanelComponent {
  private readonly cloneService = inject(CloneService);

  public readonly langFrom = signal('it');
  public readonly langTo = signal('en');
  public readonly langList = ['it', 'en', 'ru', 'fr', 'de'];


  public async cloneData() {
    const result = await this.cloneService.export(`content/${this.langFrom()}`, StoreRoot);
    await this.cloneService.import(result, `content/${this.langTo()}`)
  }
}

