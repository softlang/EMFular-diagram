import {Component, Input} from '@angular/core';
import {AbstractControl, FormGroup} from "@angular/forms";
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
    ModelCanvasComponent
  ],
  templateUrl: './simple-playground.component.html',
  styleUrl: './simple-playground.component.scss'
})
export class SimplePlaygroundComponent<TInputs extends{ [K in keyof TInputs]: AbstractControl<any, any>}> {
  @Input() form!: FormGroup<TInputs>;
  @Input() initialValue!: FormValue<TInputs>;
  @Input() codeTemplate!: string;

  reset(): void {
    this.form.reset(this.initialValue);
  }

  copyCode(): void {
    navigator.clipboard.writeText(this.codeTemplate);
  }

}
