import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {rootRoute} from '@common/routes/root-route';
import {scrollOffset} from '@app/Configuration';

@NgModule({
  imports: [RouterModule.forRoot(rootRoute, {
    anchorScrolling: 'enabled',
    scrollOffset: [0, scrollOffset],
    scrollPositionRestoration: 'enabled',
    bindToComponentInputs: true,
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
