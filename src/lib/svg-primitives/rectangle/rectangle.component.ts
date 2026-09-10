import {Component, Input} from '@angular/core';
import {BoundingBox} from "../../shared/models/bounding-box";

@Component({
  selector: '[rectangleG]',
  imports: [],
  templateUrl: './rectangle.component.svg',
})
export class RectangleComponent {
  @Input() position!: BoundingBox
  @Input() color?: string = '#ccffff';

}
