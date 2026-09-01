import {Component, EventEmitter, Input, Output} from '@angular/core';
import {BoundingBox} from "../../models/bounding-box";
import {RectangleComponent} from "../rectangle/rectangle.component";
import {TextAreaSvgComponent} from "../text-area-svg/text-area-svg.component";
import {SvgTextStyle} from "../../models/svg-text-style";

@Component({
  selector: '[rectangle-with-text]',
  imports: [
    TextAreaSvgComponent,
    RectangleComponent
  ],
  templateUrl: './rectangle-with-text.component.svg',
  styleUrl: './rectangle-with-text.component.css'
})
export class RectangleWithTextComponent {
  @Input() position!: BoundingBox
  @Input() color?: string;

  @Input() id!: string;
  @Input() text!: string;
  @Output() textChange = new EventEmitter<string>();
  @Input() textStyle: SvgTextStyle = {}
}
