import {Component, Input, OnChanges} from '@angular/core';
import {NgIf} from "@angular/common";
import {ArrowStyleConfigurationService} from "../../../services/arrow-style-configuration.service";
import {ArrowStyleConfiguration, LineStyleConfiguration} from "../../../models/arrow-style-configuration";
import {v4 as uuidv4} from "uuid";

@Component({
  selector: '[arrow-between-points]',
  imports: [
    NgIf
  ],
  templateUrl: './arrow-between-points.component.svg',
  styleUrl: './arrow-between-points.component.css'
})
export class ArrowBetweenPointsComponent implements OnChanges {

  @Input() startX!: number;
  @Input() startY!: number;
  @Input() endX!: number;
  @Input() endY!: number;

  /**
   * @deprecated: use lineStyle.style
   */
  @Input() style?: string;
  @Input() lineStyle?: LineStyleConfiguration;
  /**
   * @deprecated: use own enum to ArrowStyleConfiguration mapping
   */
  @Input() arrowType?: string;

  @Input() text?: string;
  @Input() textStyle: string | Record<string, string>  = '';
  @Input() textPathStyle: string | Record<string, string>  = '';

  lineStyleConfiguration: LineStyleConfiguration;
  id = uuidv4();

  constructor(
      private arrowStyleConfigService: ArrowStyleConfigurationService,
  ) {
    this.lineStyleConfiguration = this.arrow2line(this.arrowStyleConfigService.styleArrow())
  }

  ngOnChanges() {
    if(this.lineStyle) {
      this.lineStyleConfiguration = this.lineStyle
    } else {
      this.lineStyleConfiguration = this.arrow2line(this.arrowStyleConfigService.styleArrow(this.arrowType))
    }
  }

  private arrow2line(arrowStyle: ArrowStyleConfiguration): LineStyleConfiguration {
    return {...arrowStyle, ...{dashed: arrowStyle.dashed.join(' ') }}
  }

}
