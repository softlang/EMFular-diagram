import {Component, Input} from '@angular/core';
import {Point2D} from "../../models/point2d";

@Component({
  selector: '[triangleG]',
  imports: [],
  templateUrl: './triangle.component.svg',
  styleUrl: './triangle.component.css'
})
export class TriangleComponent {
  @Input() A!: Point2D;
  @Input() B!: Point2D;
  @Input() C!: Point2D;
  @Input() color?: string = '#ccffff';

}
