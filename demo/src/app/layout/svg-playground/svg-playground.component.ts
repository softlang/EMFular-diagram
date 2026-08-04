import { Component } from '@angular/core';
import {SimplePlaygroundComponent} from "../simple-playground/simple-playground.component";
import {AbstractControl} from "@angular/forms";
import {ModelCanvasComponent} from "../../../../../src/lib/components/model-canvas/model-canvas.component";
import {ArrowBetweenPointsComponent} from "ngx-emfular-diagram";

@Component({
  selector: 'demo-svg-playground',
  imports: [
    SimplePlaygroundComponent,
    ModelCanvasComponent,
    ArrowBetweenPointsComponent
  ],
  templateUrl: './svg-playground.component.html',
  styleUrl: './svg-playground.component.css'
})
export class SvgPlaygroundComponent<
    T extends{ [K in keyof T]: AbstractControl<any, any>}
> extends SimplePlaygroundComponent<T> {

}
