export const canvas0 =
    `<svg-canvas
        [viewBox]="'0 0 200 200'"
>
    <svg:g canvas>
        <g demo-rect *ngIf="form0.value.displayRed"
           [elem]="rectRed0"
        >
        </g>
        <g demo-rect *ngIf="form0.value.displayBlue"
           [elem]="rectBlue0"
        >
        </g>
    </svg:g>
</svg-canvas>`