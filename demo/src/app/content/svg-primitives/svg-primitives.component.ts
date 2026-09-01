import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive} from "@angular/router";
import {HighlightedCodeComponent} from "../../layout/highlighted-code/highlighted-code.component";
import {pointAndBB, rotate0} from "./svg-primitives.component.code";
import {SvgReactivePlaygroundComponent} from "../../layout/svg-reactive-playground/svg-reactive-playground.component";
import {BoundingBox, RectangleComponent} from "ngx-emfular-diagram";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'demo-svg-primitives',
    imports: [
        RouterLink,
        RouterLinkActive,
        HighlightedCodeComponent,
        SvgReactivePlaygroundComponent,
        RectangleComponent
    ],
  templateUrl: './svg-primitives.component.html',
  styleUrl: './svg-primitives.component.css'
})
export class SvgPrimitivesComponent {

    rect0: BoundingBox = {
        x: 50,
        y: 50,
        w: 40,
        h:20
    }

    form0= new FormGroup({
        color: new FormControl("#000000",),
        rotate: new FormControl(0, {nonNullable: true}),
    })

    protected readonly boundingBox = pointAndBB;
    protected readonly rotate0 = rotate0;
}
