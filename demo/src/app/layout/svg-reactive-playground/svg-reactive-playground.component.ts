import {AfterContentInit, Component, Input, OnInit} from '@angular/core';
import {AbstractControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {SvgCanvasComponent} from "ngx-emfular-diagram";
import {HighlightedCodeComponent} from "../highlighted-code/highlighted-code.component";
import {FormGroupRendererComponent} from "../form-group-renderer/form-group-renderer.component";
import {RadioOptions} from "../form-helpers";


@Component({
  selector: 'demo-simple-playground',
  imports: [
    SvgCanvasComponent,
    ReactiveFormsModule,
    HighlightedCodeComponent,
    FormGroupRendererComponent
  ],
  templateUrl: './svg-reactive-playground.component.html',
  styleUrl: './svg-reactive-playground.component.scss'
})
export class SvgReactivePlaygroundComponent<TInputs extends{ [K in keyof TInputs]: AbstractControl<any, any>}> implements OnInit {
  @Input() form!: FormGroup<TInputs>;
  @Input() codeTemplate!: string;
  @Input() radioOptions: RadioOptions = {};

  initialValue!: ReturnType<FormGroup<TInputs>['getRawValue']>

  async ngOnInit() {
    this.initialValue = this.form.getRawValue();
  }

  reset(): void {
    this.form.reset(this.initialValue);
  }

  copyCode(): void {
    navigator.clipboard.writeText(this.codeTemplate);
  }

}
