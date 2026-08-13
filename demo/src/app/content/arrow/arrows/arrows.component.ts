import { Component } from '@angular/core';
import {
    RadioOptions,
    SimplePlaygroundComponent
} from "../../../layout/simple-playground/simple-playground.component";
import {
    ArrowBetweenPointsComponent,
    ArrowBetweenBoxesComponent,
    RectangleComponent,
    TriangleComponent,
    ArrowBetweenElemsComponent
} from "ngx-emfular-diagram";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {
    arrowBetweenBoxesCode,
    arrowBetweenElemsCode,
    arrowBetweenPointsCode,
    arrowStyleConfig, markerStyleConfig
} from "./arrows.component.code";
import {HighlightedCodeComponent} from "../../../layout/highlighted-code/highlighted-code.component";

@Component({
  selector: 'demo-arrows',
    imports: [
        SimplePlaygroundComponent,
        ArrowBetweenPointsComponent,
        ArrowBetweenBoxesComponent,
        ArrowBetweenElemsComponent,
        RectangleComponent,
        TriangleComponent,
        HighlightedCodeComponent,
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
        startID: new FormControl("rectangle_blue"),
        endID: new FormControl("triangle_green"),
    })

    form2_radioOptions: RadioOptions = {
        startID: [
            { value: 'triangle_green', label: 'Green Triangle' },
            { value: 'triangle_black', label: 'Black Triangle' },
            { value: 'rectangle_blue', label: 'Blue Rectangle' },
            { value: 'rectangle_red', label: 'Red Rectangle' }
        ],
        endID: [
            { value: 'triangle_green', label: 'Green Triangle' },
            { value: 'triangle_black', label: 'Black Triangle' },
            { value: 'rectangle_blue', label: 'Blue Rectangle' },
            { value: 'rectangle_red', label: 'Red Rectangle' }
        ]
    };

    form3 = new FormGroup({
        color: new FormControl("red"),
        dashed: new FormControl([1,2,1]),
        startMarker: new FormControl("B"),
        endMarker: new FormControl("A"),
    })

    form3_radioOptions: RadioOptions = {
        startMarker: [
            { value: 'A', label: 'Pointer' },
            { value: 'B', label: 'Circle' },
            { value: 'C', label: 'Red X' },
            { value: 'D', label: 'Green Lines' },
            { value: undefined, label: '-' },
        ],
        endMarker: [
            { value: 'A', label: 'Pointer' },
            { value: 'B', label: 'Circle' },
            { value: 'C', label: 'Red X' },
            { value: 'D', label: 'Green Lines' },
            { value: undefined, label: '-' },
        ]
    };

    form4 = new FormGroup({
        text: new FormControl("This text is far too long. See where it gets truncated"),
        style: new FormControl("fill: blue; font-size: 12px;"),
    })

  protected readonly arrowBetweenPointsCode = arrowBetweenPointsCode;
  protected readonly arrowBetweenBoxesCode = arrowBetweenBoxesCode;
  protected readonly arrowBetweenElemsCode = arrowBetweenElemsCode;
  protected readonly arrowStyleConfig = arrowStyleConfig;
    protected readonly markerStyleConfig = markerStyleConfig;
}
