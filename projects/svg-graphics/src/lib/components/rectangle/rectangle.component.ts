import {Component, Input} from '@angular/core';
import {BoundingBox} from "../../models/bounding-box";

@Component({
  selector: '[rectangleG]',
  imports: [],
  templateUrl: './rectangle.component.svg',
  styleUrl: './rectangle.component.css'
})
export class RectangleComponent {
  @Input() position!: BoundingBox
  @Input() color?: string = '#ccffff';

}
