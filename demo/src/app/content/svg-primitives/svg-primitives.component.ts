import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive} from "@angular/router";
import {HighlightedCodeComponent} from "../../layout/highlighted-code/highlighted-code.component";
import {pointAndBB, rotate0, styles, text0, triangle0} from "./svg-primitives.component.code";
import {SvgReactivePlaygroundComponent} from "../../layout/svg-reactive-playground/svg-reactive-playground.component";
import {
    RectangleComponent,
    RectangleWithTextComponent,
    TextAreaSvgComponent,
    TriangleComponent
} from "ngx-emfular-diagram";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'demo-svg-primitives',
    imports: [
        RouterLink,
        RouterLinkActive,
        HighlightedCodeComponent,
        SvgReactivePlaygroundComponent,
        RectangleComponent,
        TriangleComponent,
        TextAreaSvgComponent,
        RectangleWithTextComponent
    ],
  templateUrl: './svg-primitives.component.html',
  styleUrl: './svg-primitives.component.css'
})
export class SvgPrimitivesComponent {

    form0= new FormGroup({
        color: new FormControl("#000000",),
        Cx: new FormControl(50, {nonNullable: true}),
        Cy: new FormControl(0, {nonNullable: true}),
    })

    form1= new FormGroup({
        color: new FormControl("#000000",),
        rotate: new FormControl(0, {nonNullable: true}),
    })

    get form2Text(){
        return this.form2.value.text
    }
    set form2Text(value){
        this.form2.patchValue({text: value})
    }

    form2 = new FormGroup({
        text: new FormControl("Example text, very long text, try to expand"),
        singleEdit: new FormControl(true, {nonNullable: true}),
        x: new FormControl(5, {nonNullable: true}),
        y: new FormControl(5, {nonNullable: true}),
        w: new FormControl(200, {nonNullable: true}),
        h: new FormControl(50, {nonNullable: true}),
        'font-family': new FormControl('sans-serif', { nonNullable: true }),
        'font-size': new FormControl('16px', { nonNullable: true }),
        fill: new FormControl('#999999', { nonNullable: true }),
    })

    form3 = new FormGroup({
        color: new FormControl("#000000",),
        text: new FormControl("Example text, very long text, try to expand"),
        x: new FormControl(5, {nonNullable: true}),
        y: new FormControl(5, {nonNullable: true}),
        w: new FormControl(200, {nonNullable: true}),
        h: new FormControl(50, {nonNullable: true}),
        'font-family': new FormControl('sans-serif', { nonNullable: true }),
        'font-size': new FormControl('16px', { nonNullable: true }),
        fill: new FormControl('#999999', { nonNullable: true }),
    })

    get form3Text(){
        return this.form3.value.text
    }
    set form3Text(value){
        this.form3.patchValue({text: value})
    }


    protected readonly boundingBox = pointAndBB;
    protected readonly rotate0 = rotate0;
    protected readonly triangle0 = triangle0;
    protected readonly text0 = text0;
    protected readonly styles = styles;
}
