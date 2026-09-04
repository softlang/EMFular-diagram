import { Component } from '@angular/core';
import {SvgReactivePlaygroundComponent} from "../../../layout/svg-reactive-playground/svg-reactive-playground.component";
import {
    ArrowBetweenPointsComponent,
    ArrowBetweenBoxesComponent,
    RectangleComponent,
    TriangleComponent,
    ArrowBetweenElemsComponent, SVGAccessService
} from "ngx-emfular-diagram";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {
    arrowBetweenBoxesCode,
    arrowBetweenElemsCode,
    arrowBetweenPointsCode, arrowBoxesDrag, arrowDrag,
    arrowStyleConfig, markerStyleConfig, textAndStyles, textAndStylesCode
} from "./arrows.component.code";
import {HighlightedCodeComponent} from "../../../layout/highlighted-code/highlighted-code.component";
import {MyPositionable} from "../../drag-drop/rect-draggable/rect-draggable.component";
import {DblclickRectComponent} from "../../drag-drop/dblclick-rect/dblclick-rect.component";
import {RadioOptions} from "../../../layout/form-helpers";

@Component({
  selector: 'demo-arrows',
    imports: [
        SvgReactivePlaygroundComponent,
        ArrowBetweenPointsComponent,
        ArrowBetweenBoxesComponent,
        ArrowBetweenElemsComponent,
        RectangleComponent,
        TriangleComponent,
        HighlightedCodeComponent,
        DblclickRectComponent,
    ],
  templateUrl: './arrows.component.html',
  styleUrl: './arrows.component.css'
})
export class ArrowsComponent {

    constructor(public svgAccessService: SVGAccessService) {
    }

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
        dashed: new FormControl('1 2 1'),
        strokeWidth: new FormControl(1),
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
        textStyle: new FormGroup({
            color: new FormControl("red"),
            fontSize: new FormControl("12pt"),
            fontWeight: new FormControl("bold"),
            textAnchor: new FormControl("start")
        }),
        textPathStyle: new FormGroup({
            method: new FormControl("stretch"),
            spacing: new FormControl("auto"),
            side: new FormControl("right"),
            lengthAdjust: new FormControl("spacing"),
        })
    })

    form4_radioOptions = {
        method: [
            { value: 'align', label: 'align' },
            { value: 'stretch', label: 'stretch' },
        ],
        spacing: [
            { value: 'auto', label: 'auto' },
            { value: 'exact', label: 'exact' },
        ],
        side: [
            { value: 'left', label: 'left' },
            { value: 'right', label: 'right' },
        ],
        lengthAdjust: [
            { value: 'spacing', label: 'spacing' },
            { value: 'spacingAndGlyphs', label: 'spacingAndGlyphs' },
        ]
    }

    dragID0="dragArrow0"
    dragID1="dragArrow1"
    drag0: MyPositionable = {
        $gId: this.dragID0,
        color: "blue",
        position: {x:0, y: 0, w: 15, h: 10}
    }
    drag1: MyPositionable = {
        $gId: this.dragID1,
        color: "red",
        position: {x:50, y: 50, w: 15, h: 10}
    }

    form5 = new FormGroup({
        notifyAutomatically: new FormControl(false),
    })

    onDoubleClick(id: string) {
        if(this.form5.value.notifyAutomatically) {
            this.svgAccessService.notifyPositionChange(id)
        }
    }

    dragBlueId="dragArrow0"
    dragBlue: MyPositionable = {
        $gId: this.dragBlueId,
        color: "blue",
        position: {x:0, y: 0, w: 15, h: 10}
    }
    dragRedId="dragArrow1"
    dragRed: MyPositionable = {
        $gId: this.dragRedId,
        color: "red",
        position: {x:50, y: 50, w: 15, h: 10}
    }

    form6 = new FormGroup({
        notifyRed: new FormControl(false, { nonNullable: true }),
        notifyBlue: new FormControl(false, { nonNullable: true }),
    })

    onPosChangeArBetwBoxes(elem: MyPositionable, isActive: boolean) {
        if(isActive) {
            elem.position = {
                ...elem.position
            };
        }
    }

  protected readonly arrowBetweenPointsCode = arrowBetweenPointsCode;
  protected readonly arrowBetweenBoxesCode = arrowBetweenBoxesCode;
  protected readonly arrowBetweenElemsCode = arrowBetweenElemsCode;
  protected readonly arrowStyleConfig = arrowStyleConfig;
    protected readonly markerStyleConfig = markerStyleConfig;
    protected readonly textAndStyles = textAndStyles;
    protected readonly arrowDrag = arrowDrag;
    protected readonly arrowBoxesDrag = arrowBoxesDrag;
    protected readonly textAndStylesCode = textAndStylesCode;
}
