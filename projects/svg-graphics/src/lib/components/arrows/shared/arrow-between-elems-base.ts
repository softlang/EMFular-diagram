import {
  AfterViewInit,
  ChangeDetectorRef,
  Directive,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
} from "@angular/core";
import { Subscription } from "rxjs";

import { BoundingBox } from "../../../models/bounding-box";
import { SVGAccessService } from "../../../services/svg-access.service";

@Directive()
export abstract class ArrowBetweenElemsBase
  implements OnInit, AfterViewInit, OnChanges, OnDestroy
{
  @Input() startGID = "";
  @Input() startSuffix = "";
  @Input() endGID = "";
  @Input() endSuffix = "";

  startId = "";
  endId = "";

  start?: BoundingBox;
  end?: BoundingBox;

  positioned = false;

  private readonly changeSubscription: Subscription;

  protected constructor(
    protected readonly svgAccessService: SVGAccessService,
    protected readonly cdr: ChangeDetectorRef,
  ) {
    this.changeSubscription = this.svgAccessService
      .listenToPositionChange()
      .subscribe((changedId) => {
        if (changedId === this.startGID || changedId === this.endGID) {
          setTimeout(() => {
            this.computePositionsByIds();
            this.cdr.detectChanges();
          }, 0);
        }
      });
  }

  ngOnInit(): void {
    this.updateIds();
  }

  ngOnChanges(): void {
    this.updateIds();
    this.computePositionsByIds();
    this.cdr.detectChanges();
  }

  ngAfterViewInit(): void {
    this.positioned = true;
    this.computePositionsByIds();
    this.cdr.detectChanges();
  }

  ngOnDestroy(): void {
    this.changeSubscription.unsubscribe();
  }

  protected updateIds(): void {
    this.startId = this.startGID + this.startSuffix;
    this.endId = this.endGID + this.endSuffix;
  }

  protected computePositionsByIds(): void {
    const relativeTo = this.arrowNode?.nativeElement;

    if (!relativeTo) {
      return;
    }

    const startBox = this.svgAccessService.getRelativePosition(
      this.startId,
      relativeTo,
    );
    const endBox = this.svgAccessService.getRelativePosition(
      this.endId,
      relativeTo,
    );

    if (startBox) {
      this.start = startBox;
    }

    if (endBox) {
      this.end = endBox;
    }
  }

  protected abstract get arrowNode(): ElementRef<SVGGraphicsElement> | undefined;
}
