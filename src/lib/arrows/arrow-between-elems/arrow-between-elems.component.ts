import {
  AfterViewInit,
  ChangeDetectorRef,
  Component, ElementRef,
  Input, OnChanges, OnDestroy,
  OnInit, SimpleChanges,
  ViewChild
} from '@angular/core';
import {Observable, Subscription} from "rxjs";
import { NgIf } from '@angular/common';
import {BoundingBox} from "../../shared/models/bounding-box";
import {ArrowBetweenBoxesComponent} from "../arrow-between-boxes/arrow-between-boxes.component";
import {SVGAccessService} from "../../shared/svg-access.service";
import {ArrowStyle, DEFAULT_ARROW_STYLE} from "../arrow-style-configuration";
import {SvgTextPathStyle} from "../../shared/style-configs/svg-text-path-style";
import {DEFAULT_TEXT_STYLE} from "../../shared/style-configs/svg-text-style";

@Component({
    selector: '[arrowElems]',
    templateUrl: './arrow-between-elems.component.svg',
    imports: [NgIf, ArrowBetweenBoxesComponent]
})
export class ArrowBetweenElemsComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {

  @Input() startGID!: string;
  @Input() startSuffix!: string;
  @Input() endGID!: string;
  @Input() endSuffix!: string;

  @Input() arrowStyle: ArrowStyle = DEFAULT_ARROW_STYLE;

  @Input() text?: string;
  @Input() textStyle: SvgTextPathStyle = DEFAULT_TEXT_STYLE;

  startId!: string;
  endId!: string;

  start?: BoundingBox;
  end?: BoundingBox;

  positioned= false;
  @ViewChild('arrow') node!: ElementRef<SVGGraphicsElement>;

  changeNotifier: Observable<string>;
  changeSubscription: Subscription;

  //idea: compute the two input positions as relative to the current elem
  constructor(
    private svgAccessService: SVGAccessService,
    private cdr: ChangeDetectorRef) {
    this.changeNotifier = this.svgAccessService.listenToPositionChange()
    this.changeSubscription = this.changeNotifier.subscribe(nextString => {
      if (nextString == this.startGID || nextString == this.endGID) {
        setTimeout(() => {
          this.computePositionsByIds()
          this.cdr.detectChanges()
        }, 0)
      }
    })
  }

  ngOnInit() {
    this.startId = this.startGID+this.startSuffix;
    this.endId = this.endGID+this.endSuffix;
  }

  ngOnChanges(_: SimpleChanges) {
    this.startId = this.startGID+this.startSuffix;
    this.endId = this.endGID+this.endSuffix;
    this.computePositionsByIds()
    this.cdr.detectChanges()
  }

  ngAfterViewInit() {
    this.positioned = true;
    this.computePositionsByIds()
    this.cdr.detectChanges()
  }

  private computePositionsByIds() {
    if (this.node?.nativeElement){
      let rel = this.node.nativeElement as SVGGraphicsElement
      let startOpt = this.svgAccessService.getRelativePosition(this.startId, rel)
      if (startOpt) {
        this.start = startOpt
      }
      let endOpt = this.svgAccessService.getRelativePosition(this.endId, rel)
      if (endOpt) {
        this.end = endOpt
      }
    }
  }

  ngOnDestroy() {
    this.changeSubscription.unsubscribe();
  }

}
