import {FormControl, FormGroup} from "@angular/forms";
import {numberAttribute} from "@angular/core";

export interface ArrowBetweenPointsInputs {
    startX: number
    startY: number
    endX: number
    endY: number
}

export const arrowBetweenPointsFormGroup: FormGroup<ArrowBetweenPointsInputs> =
    new FormGroup({
        startX: new FormControl(numberAttribute(0, 0)),
        startY: new FormControl(numberAttribute(0, 0)),
        endX: new FormControl(numberAttribute(10, 10)),
        endY: new FormControl(numberAttribute(10, 10))
    })