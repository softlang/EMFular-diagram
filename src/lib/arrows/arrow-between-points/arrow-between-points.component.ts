import {Component, Input, OnChanges} from '@angular/core';
import {NgIf} from "@angular/common";
import {ArrowStyleConfigurationService} from "../arrow-style-configuration.service";
import {ArrowStyleConfiguration, ArrowStyle} from "../arrow-style-configuration";
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
   * @deprecated: use arrowStyle.style
   */
  @Input() style?: string;
  @Input() arrowStyle?: ArrowStyle;
  /**
   * @deprecated: use own enum to ArrowStyle mapping
   */
  @Input() arrowType?: string;

  @Input() text?: string;
  @Input() textStyle: string | Record<string, string>  = '';
  @Input() textPathStyle: string | Record<string, string>  = '';

  arrowStyleConfiguration: ArrowStyle;
  id = uuidv4();

  constructor(
      private arrowStyleConfigService: ArrowStyleConfigurationService,
  ) {
    this.arrowStyleConfiguration = this.oldArrowConfig2new(this.arrowStyleConfigService.styleArrow())
  }

  ngOnChanges() {
    if(this.arrowStyle) {
      this.arrowStyleConfiguration = this.arrowStyle
    } else {
      this.arrowStyleConfiguration = this.oldArrowConfig2new(this.arrowStyleConfigService.styleArrow(this.arrowType))
    }
  }

  private oldArrowConfig2new(arrowStyle: ArrowStyleConfiguration): ArrowStyle {
    return {...arrowStyle, ...{dashed: arrowStyle.dashed.join(' ') }}
  }

}
