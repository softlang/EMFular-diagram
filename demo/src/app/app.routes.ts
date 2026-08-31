import { Routes } from '@angular/router';
import {ArrowsComponent} from "./content/arrow/arrows/arrows.component";
import {DragDropComponent} from "./content/drag-drop/drag-drop.component";
import {HomeComponent} from "./content/home/home.component";
import {SvgPrimitivesComponent} from "./content/svg-primitives/svg-primitives.component";

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'svg-primitives', component: SvgPrimitivesComponent },
    { path: 'arrows', component: ArrowsComponent },
    { path: 'drag-drop', component: DragDropComponent }
];
