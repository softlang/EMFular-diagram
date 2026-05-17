import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from "@angular/core";
import { NgIf } from "@angular/common";
import { Point } from "@angular/cdk/drag-drop";

import { BoundingBox } from "../../../models/bounding-box";
import { SVGAccessService } from "../../../services/svg-access.service";
import {
  ArrowBetweenBoxesComponent,
  BentArrowGeometry,
} from "../arrow-between-boxes/arrow-between-boxes.component";
import { BoxAnchor } from "../shared/arrow-geometry";
import { ArrowBetweenElemsBase } from "../shared/arrow-between-elems-base";

@Component({
  selector: "[arrowElems]",
  standalone: true,
  templateUrl: "./arrow-between-elems.component.svg",
  styleUrl: "./arrow-between-elems.component.css",
  imports: [NgIf, ArrowBetweenBoxesComponent],
})
export class ArrowBetweenElemsComponent extends ArrowBetweenElemsBase {
  @Input() arrowType?: string;

  @Input() breaks: BoundingBox[] = [];
  @Input() text?: string;
  @Input() style?: string;

  @Input() bent = false;

  /** Nur für bent=true relevant. */
  @Input() controlPoints: Point[] = [];
  @Input() startAnchor?: BoxAnchor;
  @Input() endAnchor?: BoxAnchor;
  @Input() editable = true;

  @Output() geometryChange = new EventEmitter<BentArrowGeometry>();
  @Output() controlPointsChange = new EventEmitter<Point[]>();
  @Output() startAnchorChange = new EventEmitter<BoxAnchor>();
  @Output() endAnchorChange = new EventEmitter<BoxAnchor>();

  @ViewChild("arrow") node!: ElementRef<SVGGraphicsElement>;

  constructor(svgAccessService: SVGAccessService, cdr: ChangeDetectorRef) {
    super(svgAccessService, cdr);
  }

  protected override get arrowNode():
    | ElementRef<SVGGraphicsElement>
    | undefined {
    return this.node;
  }

}
