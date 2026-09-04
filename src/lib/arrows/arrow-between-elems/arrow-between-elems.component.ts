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
import {SVGAccessService} from "../../shared/svg-access.service";
import {ArrowStyle, DEFAULT_ARROW_STYLE} from "../arrow-style";
import {SvgTextStyle, DEFAULT_TEXT_STYLE} from "../../shared/style-configs/svg-text-style";
import {SvgTextPathStyle} from "../../shared/style-configs/svg-text-path-style";


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

  start?: BoundingBox;
  end?: BoundingBox;

  @ViewChild('arrow') node!: ElementRef<SVGGraphicsElement>;

  changeSubscription: Subscription;

  //idea: compute the two input positions as relative to the current elem
  constructor(
    private svgAccessService: SVGAccessService,
    private cdr: ChangeDetectorRef) {
    this.changeSubscription = this.svgAccessService.listenToPositionChange().subscribe(nextString => {
      if (nextString == this.startGID || nextString == this.endGID) {
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
    if (this.node?.nativeElement){
      let rel = this.node.nativeElement as SVGGraphicsElement
      let startOpt = this.svgAccessService.getRelativePosition(this.startGID, rel)
      if (startOpt) {
        this.start = startOpt
      }
      let endOpt = this.svgAccessService.getRelativePosition(this.endGID, rel)
      if (endOpt) {
        this.end = endOpt
      }
    }
  }

  ngOnDestroy() {
    this.changeSubscription.unsubscribe();
  }

}
