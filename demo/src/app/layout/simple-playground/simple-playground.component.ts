import {AfterViewInit, Component, Input} from '@angular/core';
import {AbstractControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {ModelCanvasComponent} from "../../../../../src/lib/components/model-canvas/model-canvas.component";

export enum InputType {
  'number', 'text', 'checkbox'
}

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

  initialValue: any //todo
  inputTypes: Record<string, InputType> = {};


  ngAfterViewInit() {
    this.initialValue = this.form.getRawValue();
    for (const [name, control] of Object.entries(this.form.controls)) {
      this.inputTypes[name] = this.detectInputType(control);
    }
  }

  private detectInputType(control: AbstractControl): InputType {
    const value = control.value;

    switch (typeof value) {
      case 'number':
        return InputType.number;
      case 'boolean':
        return InputType.checkbox;
      default:
        return InputType.text;
    }
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

  protected readonly InputType = InputType;
}
