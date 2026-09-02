import { Component } from '@angular/core';
import {SvgReactivePlaygroundComponent} from "../../layout/svg-reactive-playground/svg-reactive-playground.component";
import {MyPositionable, RectDraggableComponent} from "../drag-drop/rect-draggable/rect-draggable.component";
import {FormControl, FormGroup} from "@angular/forms";
import {NgIf} from "@angular/common";
import {canvas0} from "./home.component.code";

@Component({
  selector: 'demo-home',
    imports: [
        SvgReactivePlaygroundComponent,
        RectDraggableComponent,
        NgIf,
    ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

    form0 = new FormGroup({
        displayRed: new FormControl(true, {nonNullable: true} ),
        displayBlue: new FormControl(true, {nonNullable: true} ),
    })

    rectRed0: MyPositionable = {
        $gId: "rectRed0",
        color: "red",
        position: {x: 5, y: 5, w: 50, h: 40}
    }
    rectBlue0: MyPositionable = {
        $gId: "rectBlue0",
        color: "blue",
        position: {x: 50, y: 50, w: 50, h: 40}
    }
    protected readonly canvas0 = canvas0;
}
