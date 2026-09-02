import {Identifiable} from './identifiable';
import {Point2D} from "./point2d";

export interface Positionable {
  position: Point2D
}

export type Draggable = Positionable & Identifiable;
