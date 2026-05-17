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

import { SVGAccessService } from "../../../services/svg-access.service";
import {
  OrthogonalArrowBetweenBoxesComponent,
  OrthogonalArrowGeometry,
} from "../orthogonal-arrow-between-boxes/orthogonal-arrow-between-boxes.component";
import { BoxAnchor } from "../shared/arrow-geometry";
import { ArrowBetweenElemsBase } from "../shared/arrow-between-elems-base";

@Component({
  selector: "[orthogonalArrowElems]",
  standalone: true,
  imports: [NgIf, OrthogonalArrowBetweenBoxesComponent],
  templateUrl: "./orthogonal-arrow-between-elems.component.svg",
  styleUrl: "./orthogonal-arrow-between-elems.component.css",
})
export class OrthogonalArrowBetweenElemsComponent extends ArrowBetweenElemsBase {
  @Input() controlPoints: Point[] = [];
  @Input() startAnchor?: BoxAnchor;
  @Input() endAnchor?: BoxAnchor;

  @Input() arrowType?: string;
  @Input() text?: string;
  @Input() style?: string;
  @Input() editable = true;

  @Output() geometryChange = new EventEmitter<OrthogonalArrowGeometry>();
  @Output() controlPointsChange = new EventEmitter<Point[]>();
  @Output() startAnchorChange = new EventEmitter<BoxAnchor>();
  @Output() endAnchorChange = new EventEmitter<BoxAnchor>();

  @ViewChild("arrow") node!: ElementRef<SVGGraphicsElement>;

  constructor(
    svgAccessService: SVGAccessService,
    cdr: ChangeDetectorRef,
  ) {
    super(svgAccessService, cdr);
  }

  protected override get arrowNode(): ElementRef<SVGGraphicsElement> | undefined {
    return this.node;
  }

  onGeometryChange(geometry: OrthogonalArrowGeometry): void {
    this.controlPoints = geometry.controlPoints;
    this.startAnchor = geometry.startAnchor;
    this.endAnchor = geometry.endAnchor;
    this.geometryChange.emit(geometry);
  }

  onControlPointsChange(controlPoints: Point[]): void {
    this.controlPoints = controlPoints;
    this.controlPointsChange.emit(controlPoints);
  }

  onStartAnchorChange(anchor: BoxAnchor): void {
    this.startAnchor = anchor;
    this.startAnchorChange.emit(anchor);
  }

  onEndAnchorChange(anchor: BoxAnchor): void {
    this.endAnchor = anchor;
    this.endAnchorChange.emit(anchor);
  }
}
