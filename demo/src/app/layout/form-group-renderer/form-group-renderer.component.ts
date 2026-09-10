import {AfterContentInit, Component, Input} from '@angular/core';
import {AbstractControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {InputType, RadioOptions} from "../form-helpers";


@Component({
  selector: 'demo-form-group-renderer',
  imports: [    ReactiveFormsModule],
  templateUrl: './form-group-renderer.component.html',
  styleUrl: './form-group-renderer.component.scss'
})
export class FormGroupRendererComponent<TInputs extends{ [K in keyof TInputs]: AbstractControl<any, any>}> implements AfterContentInit {
  @Input() idPrefix=`playground-${crypto.randomUUID()}`
  @Input() form!: FormGroup<TInputs>;
  @Input() radioOptions: RadioOptions = {};


  inputTypes: Record<string, InputType> = {};

  async ngAfterContentInit() {
    for (const [name, control] of Object.entries(this.form.controls)) {
      if(Object.hasOwn(this.radioOptions, name)) {
        this.inputTypes[name] = InputType.radio
      } else {
        this.inputTypes[name] = this.detectInputType(control);
      }
    }
  }

  private detectInputType(control: AbstractControl): InputType {
    if (control instanceof FormGroup) {
      return InputType.group;
    }
    const value = control.value;
    switch (typeof value) {
      case 'number': return InputType.number;
      case 'boolean': return InputType.checkbox;
      default: return InputType.text;
    }
  }

  get formControls() {
    return Object.entries(this.form.controls);
  }

  getFormGroup(control: AbstractControl): FormGroup {
    return control as FormGroup;
  }

  protected readonly InputType = InputType;

}
