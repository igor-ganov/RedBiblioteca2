import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { ErrorResult, Result } from '@common/help/services/Result';
import { ErrorsComponent } from './errors/errors.component';
import { LoadingComponent } from '../loading/loading.component';

@Directive({
  selector: '[ifSuccess]',
})
export class IfSuccess<T> {

  constructor(
    private templateRef: TemplateRef<IfSuccessContext<T>>,
    private viewContainer: ViewContainerRef,
  ) { }

  private _data?: Result<T>;
  private context = new IfSuccessContext<T>();
  private errorContext = new IfSuccessErrorContext();
  @Input()
  public get ifSuccess(): Result<T> | undefined {
    return this._data;
  }
  public set ifSuccess(value: Result<T> | null | undefined) {
    this._data = value ?? undefined;
    if(value === null || value === undefined) {}
    else if(value.successeful){
        this.context.$implicit = this.context.ifSuccess = value.result;
    }
    else{
      this.errorContext.$implicit = this.errorContext.onError = value;
    }
    this.buildView();
  }

  private _ifSuccessOnError?: TemplateRef<IfSuccessErrorContext> | undefined;
  @Input()
  public get ifSuccessOnError(): TemplateRef<IfSuccessErrorContext> | undefined {
    return this._ifSuccessOnError;
  }
  public set ifSuccessOnError(value: TemplateRef<IfSuccessErrorContext> | undefined) {
    this._ifSuccessOnError = value;
    this.buildView();
  }

  private buildView() {
    this.viewContainer.clear();
    if(this._data === undefined){
      this.viewContainer.createComponent(LoadingComponent);
    }
    else if (this._data.successeful) {
      this.viewContainer.createEmbeddedView(this.templateRef, this.context);
    }
    else {
      if(this.ifSuccessOnError){
        this.viewContainer.createEmbeddedView(this.ifSuccessOnError, this.errorContext);
      }
      else {
        const error = this.viewContainer.createComponent(ErrorsComponent);
        error.instance.result = this._data;
      }
    }
  }

  static ngTemplateGuard_ifSuccess: 'binding';
  static ngTemplateContextGuard<T>(
    dir: IfSuccess<T>,
    ctx: any,
  ): ctx is IfSuccessContext<T> {
    return true;
  }
}

export class IfSuccessContext<T>{
  $implicit: T = null!;
  ifSuccess: T = null!;
  ifSuccessOnError: ErrorResult = null!;
}
export class IfSuccessErrorContext{
  $implicit: ErrorResult = null!;
  onError: ErrorResult = null!;
}
