import { Component } from '@angular/core';
import {SimplePlaygroundComponent} from "../../../layout/simple-playground/simple-playground.component";
import {ArrowBetweenPointsComponent} from "ngx-emfular-diagram";

@Component({
  selector: 'demo-arrows',
  imports: [
    SimplePlaygroundComponent,
    ArrowBetweenPointsComponent
  ],
  templateUrl: './arrows.component.html',
  styleUrl: './arrows.component.css'
})
export class ArrowsComponent {

}
