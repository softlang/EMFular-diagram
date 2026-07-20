import {BoundingBox} from './bounding-box';
import {Identifiable} from './identifiable';

export interface Positionable {
  position: BoundingBox
}

export type Draggable = Positionable & Identifiable;
