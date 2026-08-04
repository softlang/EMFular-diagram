import { Component } from '@angular/core';
import {SimplePlaygroundComponent} from "../../../layout/simple-playground/simple-playground.component";
import {ArrowBetweenPointsComponent} from "ngx-emfular-diagram";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'demo-arrows',
  imports: [
    SimplePlaygroundComponent,
    ArrowBetweenPointsComponent,
  ],
  templateUrl: './arrows.component.html',
  styleUrl: './arrows.component.css'
})
export class ArrowsComponent {

  form0 = new FormGroup({
    startX: new FormControl(10,
        {
          nonNullable: true,
          validators: [
            Validators.min(0),
            Validators.max(200)
          ]
        }),
    startY: new FormControl(100, { nonNullable: true }),
    endX: new FormControl(80, { nonNullable: true }),
    endY: new FormControl(180, { nonNullable: true })
  });

}
