import { Component } from '@angular/core';
import {SimplePlaygroundComponent} from "../../../layout/simple-playground/simple-playground.component";
import {
    ArrowBetweenPointsComponent,
    ArrowBetweenBoxesComponent,
    RectangleComponent,
    TriangleComponent,
    ArrowBetweenElemsComponent
} from "ngx-emfular-diagram";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {arrowBetweenBoxesCode, arrowBetweenElemsCode, arrowBetweenPointsCode} from "./arrows.component.code";

@Component({
  selector: 'demo-arrows',
    imports: [
        SimplePlaygroundComponent,
        ArrowBetweenPointsComponent,
        ArrowBetweenBoxesComponent,
        ArrowBetweenElemsComponent,
        RectangleComponent,
        TriangleComponent,
    ],
  templateUrl: './arrows.component.html',
  styleUrl: './arrows.component.css'
})
export class ArrowsComponent {

  form0: FormGroup<{
      startX: FormControl<number>;
      startY: FormControl<number>;
      endX: FormControl<number>;
      endY: FormControl<number>
    }> = new FormGroup({
        startX: new FormControl(10, {
          nonNullable: true,
          validators: [
            Validators.min(0),
            Validators.max(200)
          ]
        }),
        startY: new FormControl(10, { nonNullable: true }),
        endX: new FormControl(180, { nonNullable: true }),
        endY: new FormControl(180, { nonNullable: true })
  });

  form1 = new FormGroup({
      box1X: new FormControl(0, { nonNullable: true }),
      box1Y: new FormControl(0, { nonNullable: true }),
      box1W: new FormControl(10, { nonNullable: true }),
      box1H: new FormControl(5, { nonNullable: true }),
      box2X: new FormControl(150, { nonNullable: true }),
      box2Y: new FormControl(100, { nonNullable: true }),
      box2W: new FormControl(12, { nonNullable: true }),
      box2H: new FormControl(7, { nonNullable: true }),
  })

    form2 = new FormGroup({
        startID: new FormControl("rectangle_0"),
        endID: new FormControl("triangle_0"),
    })

  protected readonly arrowBetweenPointsCode = arrowBetweenPointsCode;
  protected readonly arrowBetweenBoxesCode = arrowBetweenBoxesCode;
  protected readonly arrowBetweenElemsCode = arrowBetweenElemsCode;
}
