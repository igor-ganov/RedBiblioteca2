import {ChangeDetectionStrategy, Component, inject, input, output} from '@angular/core';
import {Newspaper} from '../models/Newspaper';
import {map} from 'rxjs';
import {UserService} from '@common/permission-system/UserService';
import {toBase64} from '@common/help/help-fuctions';
import {TextEditorComponent} from '@common/components/text-editor/text-editor.component';
import {MatButton} from '@angular/material/button';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {AsyncPipe} from '@angular/common';
import {Base64ToImage} from '@common/help/pipelines/Base64ToImage';
import {ClickOrEnterDirective} from "@common/directives/click-or-enter.directive";

@Component({
  selector: 'app-newspaper-view',
  template: `
    <div class="container">
      @if (newspaper(); as newspaper) {
        <div class="card">
          @if (readonly$ | async) {
            <div class="title"><h1 class="title-text">{{ newspaper.title }}</h1></div>
            <div class="subtitle"><h2>{{ newspaper.month }}, {{ newspaper.year }}</h2></div>
            <div class="image"><img [src]="newspaper.cover | base64toImage" alt="cover"></div>
            <div class="description"><span>{{ newspaper.description }}</span></div>
          } @else {
            <div class="title">
              <h1 class="title-text">
                <app-text-editor [(value)]="newspaper.title"/>
              </h1>
            </div>
            <div class="subtitle">
              <h2>
                <app-text-editor [inline]="true" [(value)]="newspaper.month"/>
                <span>, </span>
                <app-text-editor [inline]="true" [(value)]="newspaper.year"/>
              </h2>
            </div>
            <div class="image">
              <input #importImage hidden type="file" onclick="this.value=null"
                     (change)="onImageUploaded($event, newspaper)" [accept]="'image/*'"/>
              <img tabindex="0" class="editable-image" (clickOrEnter)="importImage.click()"
                   [src]="newspaper.cover | base64toImage" alt="cover">
            </div>
            <div class="description">
              <app-text-editor [buttonPositions]="'top'" [(value)]="newspaper.description"/>
            </div>
            <div class="buttons">
              <button [disabled]="isUpdating()" color="primary" mat-stroked-button (click)="onPublish(newspaper)">
                @if (!isUpdating()) {
                  <span>Publish</span>
                } @else {
                  <mat-spinner [diameter]="20"/>
                }
              </button>
            </div>
          }
        </div>
      }
    </div>

  `,
  styleUrl: './newspaper-view.component.css',
  imports: [TextEditorComponent, MatButton, MatProgressSpinner, AsyncPipe, Base64ToImage, ClickOrEnterDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewspaperViewComponent {
  public readonly isUpdating = input.required<boolean>();
  public readonly published = output<Newspaper>();
  public readonly newspaper = input.required<Newspaper>();

  public readonly readonly$ = inject(UserService).currentUser$.pipe(map(u => u === undefined));

  public onImageUploaded(event: Event, newspaper: Newspaper) {
    const element = event.currentTarget as HTMLInputElement;
    const fileList: FileList | null = element.files;
    const image = fileList?.[0];
    if (image) toBase64(image, v => newspaper.cover = v);
  }

  public onPublish(newspaper: Newspaper) {
    this.published.emit(newspaper);
  }
}
