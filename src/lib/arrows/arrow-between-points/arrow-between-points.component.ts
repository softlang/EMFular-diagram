import {Component, Input} from '@angular/core';
import {NgIf} from "@angular/common";
import {ArrowStyle, DEFAULT_ARROW_STYLE} from "../arrow-style-configuration";
import {v4 as uuidv4} from "uuid";
import {SvgTextPathStyle, DEFAULT_TEXTPATH_STYLE} from "../../shared/style-configs/svg-text-style";
import {TextStyleDirective} from "../../shared/style-configs/svg-text-style.directive";

@Component({
  selector: '[arrow-between-points]',
  imports: [NgIf, TextStyleDirective],
  templateUrl: './arrow-between-points.component.svg',
})
export class ArrowBetweenPointsComponent {

  @Input() startX!: number;
  @Input() startY!: number;
  @Input() endX!: number;
  @Input() endY!: number;

  @Input() arrowStyle: ArrowStyle = DEFAULT_ARROW_STYLE;

  @Input() text?: string;
  @Input() textStyle: SvgTextPathStyle = DEFAULT_TEXTPATH_STYLE;

  id = uuidv4();
}
