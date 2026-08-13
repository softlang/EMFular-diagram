import {Component, Input, OnChanges} from '@angular/core';
import {NgIf} from "@angular/common";
import {ArrowStyleConfigurationService} from "../../../services/arrow-style-configuration.service";
import {ArrowStyleConfiguration} from "../../../models/arrow-style-configuration";
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
  @Input() lineStyle?: ArrowStyleConfiguration;
  /**
   * @deprecated: use own enum to ArrowStyleConfiguration mapping
   */
  @Input() arrowType?: string;

  @Input() text?: string;
  @Input() textStyle: string | Record<string, string>  = '';
  @Input() textPathStyle: string | Record<string, string>  = '';

  arrowStyleConfiguration: ArrowStyleConfiguration;
  id = uuidv4();

  constructor(
      private arrowStyleConfigService: ArrowStyleConfigurationService,
  ) {
    this.arrowStyleConfiguration = this.arrowStyleConfigService.styleArrow()
  }

  ngOnChanges() {
    if(this.lineStyle) {
      this.arrowStyleConfiguration = this.lineStyle
    } else {
      this.arrowStyleConfiguration = this.arrowStyleConfigService.styleArrow(this.arrowType)
    }
  }

}
