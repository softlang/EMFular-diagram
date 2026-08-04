import {AfterContentInit, AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {AbstractControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {ModelCanvasComponent} from "../../../../../src/lib/components/model-canvas/model-canvas.component";

type FormValue<TControls extends Record<string, AbstractControl<any, any>>> = {
  [K in keyof TControls]:
  TControls[K] extends AbstractControl<infer TValue, any>
      ? TValue
      : never;
};

@Component({
  selector: 'demo-simple-playground',
  imports: [
    ModelCanvasComponent,
    ReactiveFormsModule
  ],
  templateUrl: './simple-playground.component.html',
  styleUrl: './simple-playground.component.scss'
})
export class SimplePlaygroundComponent<TInputs extends{ [K in keyof TInputs]: AbstractControl<any, any>}> implements AfterViewInit {
  @Input() form!: FormGroup<TInputs>;
  @Input() codeTemplate!: string;

  initialValue: any

  ngAfterViewInit() {
    this.initialValue = this.form.getRawValue();
  }

  reset(): void {
    this.form.reset(this.initialValue);
  }

  copyCode(): void {
    navigator.clipboard.writeText(this.codeTemplate);
  }

  get formControls() {
    return Object.entries(this.form.controls);
  }

}
