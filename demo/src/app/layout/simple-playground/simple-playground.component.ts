import {AfterContentInit, Component, Input} from '@angular/core';
import {AbstractControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {SvgCanvasComponent} from "ngx-emfular-diagram";
import {CodeHighlighterService} from "../code-highlighter.service";
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";

export enum InputType {
  'number', 'text', 'checkbox', 'radio'
}

export interface RadioOption {
  value: string;
  label: string;
}

export type RadioOptions = Record<string, RadioOption[]>;


@Component({
  selector: 'demo-simple-playground',
  imports: [
    SvgCanvasComponent,
    ReactiveFormsModule
  ],
  templateUrl: './simple-playground.component.html',
  styleUrl: './simple-playground.component.scss'
})
export class SimplePlaygroundComponent<TInputs extends{ [K in keyof TInputs]: AbstractControl<any, any>}> implements AfterContentInit {
  @Input() form!: FormGroup<TInputs>;
  @Input() codeTemplate!: string;
  @Input() radioOptions: RadioOptions = {};

  idPrefix = `playground-${crypto.randomUUID()}`;

  initialValue!: ReturnType<FormGroup<TInputs>['getRawValue']>
  inputTypes: Record<string, InputType> = {};

  highlightedCode: SafeHtml = '';

  constructor(
      private readonly highlighter: CodeHighlighterService,
      private readonly sanitizer: DomSanitizer
  ) {}


  async ngAfterContentInit() {
    this.initialValue = this.form.getRawValue();
    for (const [name, control] of Object.entries(this.form.controls)) {
      if(Object.hasOwn(this.radioOptions, name)) {
        this.inputTypes[name] = InputType.radio
      } else {
        this.inputTypes[name] = this.detectInputType(control);
      }
    }
    this.highlightedCode = this.sanitizer.bypassSecurityTrustHtml(
        await this.highlighter.highlight(this.codeTemplate)
    );
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
