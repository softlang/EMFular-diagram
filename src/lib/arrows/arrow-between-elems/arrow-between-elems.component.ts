import {
  AfterViewInit,
  ChangeDetectorRef,
  Component, ElementRef,
  Input, OnChanges, OnDestroy,
  ViewChild
} from '@angular/core';
import {Subscription} from "rxjs";
import { NgIf } from '@angular/common';
import {v4 as uuidv4} from "uuid";

import {BoundingBox} from "../../shared/models/bounding-box";
import {ArrowBetweenBoxesComponent} from "../arrow-between-boxes/arrow-between-boxes.component";
import {SvgPositionChangeService} from "../../shared/svg-position-change.service";
import {ArrowStyle, DEFAULT_ARROW_STYLE} from "../arrow-style";
import {SvgTextStyle, DEFAULT_TEXT_STYLE} from "../../shared/style-configs/svg-text-style";
import {SvgTextPathStyle} from "../../shared/style-configs/svg-text-path-style";
import {BoundingBoxTransformer} from "../utils/bounding-box-transformer";


@Component({
    selector: '[arrow-elements]',
    templateUrl: './arrow-between-elems.component.svg',
    imports: [NgIf, ArrowBetweenBoxesComponent]
})
export class ArrowBetweenElemsComponent implements AfterViewInit, OnChanges, OnDestroy {
  @Input() id = uuidv4();
  @Input() startGID!: string;
  @Input() endGID!: string;

  @Input() arrowStyle: ArrowStyle = DEFAULT_ARROW_STYLE;

  @Input() text?: string;
  @Input() textStyle: SvgTextStyle = DEFAULT_TEXT_STYLE;
  @Input() textPathStyle: SvgTextPathStyle = {};

  startBox?: BoundingBox;
  endBox?: BoundingBox;

  @ViewChild('arrow') arrowSvgElem!: ElementRef<SVGGraphicsElement>;

  changeSubscription: Subscription;

  //idea: compute the two input positions as relative to the current elem
  constructor(
    private svgPositionChangeService: SvgPositionChangeService,
    private cdr: ChangeDetectorRef
  ) {
    this.changeSubscription = this.svgPositionChangeService.positionChange.subscribe(nextString => {
      if (nextString === this.startGID || nextString === this.endGID) {
        setTimeout(() => {
          this.computePositionsByIds()
          this.cdr.detectChanges()
        }, 0)
      }
    })
  }

  ngOnChanges() {
    this.computePositionsByIds()
  }

  ngAfterViewInit() {
    this.computePositionsByIds()
    this.cdr.detectChanges()
  }

  private computePositionsByIds() {
    if (this.arrowSvgElem?.nativeElement) {
      const arrow = this.arrowSvgElem.nativeElement;
      const startElem = this.getElemById(this.startGID);
      if (startElem) {
        this.startBox = BoundingBoxTransformer.getRelativeBBox(startElem, arrow);
      }
      const endElem = this.getElemById(this.endGID);
      if (endElem) {
        this.endBox = BoundingBoxTransformer.getRelativeBBox(endElem, arrow);
      }
    }
  }

  private getElemById(id: string): SVGGraphicsElement | undefined {
    const elem = document.getElementById(id)
    return elem as unknown as SVGGraphicsElement
  }

  ngOnDestroy() {
    this.changeSubscription.unsubscribe();
  }

}
