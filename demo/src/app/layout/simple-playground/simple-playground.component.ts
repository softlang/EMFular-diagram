import {AfterViewInit, Component, Input} from '@angular/core';
import {AbstractControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {SvgCanvasComponent} from "../../../../../src/lib/components/svg-canvas/svg-canvas.component";

export enum InputType {
  'number', 'text', 'checkbox'
}

@Component({
  selector: 'demo-simple-playground',
  imports: [
    SvgCanvasComponent,
    ReactiveFormsModule
  ],
  templateUrl: './simple-playground.component.html',
  styleUrl: './simple-playground.component.scss'
})
export class SimplePlaygroundComponent<TInputs extends{ [K in keyof TInputs]: AbstractControl<any, any>}> implements AfterViewInit {
  @Input() form!: FormGroup<TInputs>;
  @Input() codeTemplate!: string;

  idPrefix = `playground-${crypto.randomUUID()}`;

  initialValue!: ReturnType<FormGroup<TInputs>['getRawValue']>
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
      case 'number': return InputType.number;
      case 'boolean': return InputType.checkbox;
      default: return InputType.text;
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
