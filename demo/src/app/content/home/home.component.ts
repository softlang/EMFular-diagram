import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive} from "@angular/router";
import {SvgReactivePlaygroundComponent} from "../../layout/svg-reactive-playground/svg-reactive-playground.component";

@Component({
  selector: 'demo-home',
    imports: [
        RouterLink,
        RouterLinkActive,
        SvgReactivePlaygroundComponent
    ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
