import {Component, Input} from '@angular/core';
import {NgIf} from "@angular/common";
import {ArrowStyle, DEFAULT_ARROW_STYLE} from "../arrow-style";
import {v4 as uuidv4} from "uuid";
import {SvgTextStyle, DEFAULT_TEXT_STYLE} from "../../shared/style-configs/svg-text-style";
import {SvgTextPathStyle} from "../../shared/style-configs/svg-text-path-style";
import {TextStyleDirective} from "../../shared/style-configs/svg-text-style.directive";
import {SvgTextPathStyleDirective} from "../../shared/style-configs/svg-text-path-style.directive";
import {ArrowStyleDirective} from "../arrow-style.directive";

@Component({
  selector: '[arrow-points]',
  imports: [NgIf, TextStyleDirective, ArrowStyleDirective, SvgTextPathStyleDirective],
  templateUrl: './arrow-between-points.component.svg',
})
export class ArrowBetweenPointsComponent {
  @Input() id = uuidv4();
  @Input() startX!: number;
  @Input() startY!: number;
  @Input() endX!: number;
  @Input() endY!: number;

  @Input() arrowStyle: ArrowStyle = DEFAULT_ARROW_STYLE;

  @Input() text?: string;
  @Input() textStyle: SvgTextStyle = DEFAULT_TEXT_STYLE;
  @Input() textPathStyle: SvgTextPathStyle = {};
}
