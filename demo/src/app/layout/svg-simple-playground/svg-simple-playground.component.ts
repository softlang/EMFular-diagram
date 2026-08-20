import {AfterContentInit, Component, Input} from '@angular/core';
import {InputType, RadioOptions } from '../svg-reactive-playground/svg-reactive-playground.component';
import {HighlightedCodeComponent} from "../highlighted-code/highlighted-code.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SvgCanvasComponent} from "ngx-emfular-diagram";

@Component({
  selector: 'demo-svg-simple-playground',
  imports: [
    HighlightedCodeComponent,
    ReactiveFormsModule,
    SvgCanvasComponent,
    FormsModule
  ],
  templateUrl: './svg-simple-playground.component.html',
  styleUrl: './svg-simple-playground.component.scss'
})
export class SvgSimplePlaygroundComponent<T extends Record<string, any>>
    implements AfterContentInit {

  @Input() value!: T;
  @Input() codeTemplate!: string;
  @Input() radioOptions: RadioOptions = {};

  idPrefix = `playground-${crypto.randomUUID()}`;

  initialValue!: T;
  inputTypes: Record<string, InputType> = {};

  ngAfterContentInit() {
    // Keep a snapshot for reset.
    this.initialValue = structuredClone(this.value);

    for (const [name, value] of Object.entries(this.value)) {
      if (Object.hasOwn(this.radioOptions, name)) {
        this.inputTypes[name] = InputType.radio;
      } else {
        this.inputTypes[name] = this.detectInputType(value);
      }
    }
  }

  private detectInputType(value: unknown): InputType {
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
    Object.assign(this.value, structuredClone(this.initialValue));
  }

  copyCode(): void {
    navigator.clipboard.writeText(this.codeTemplate);
  }

  get values() {
    return Object.entries(this.value);
  }

  protected readonly InputType = InputType;
}
