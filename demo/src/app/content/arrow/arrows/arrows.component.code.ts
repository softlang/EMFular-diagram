export const arrowBetweenPointsCode = `
<svg:g
   arrow-between-points
   [startX]="form0.value.startX"
   [startY]="form0.value.startY"
   [endX]="form0.value.endX"
   [endY]="form0.value.endY"
   [id]="'abp01'">
</svg:g>
`;

export const arrowBetweenBoxesCode = `<svg:g>
        <g rectangleG
           [position]="{
                x: form1.value.box1X,
                y: form1.value.box1Y,
                w: form1.value.box1W,
                h: form1.value.box1H
            }"
           color="red">
        </g>
        <g arrow-between-boxes
           [start]="{
                x: form1.value.box1X,
                y: form1.value.box1Y,
                w: form1.value.box1W,
                h: form1.value.box1H
            }"
           [end]="{
                x: form1.value.box2X,
                y: form1.value.box2Y,
                w: form1.value.box2W,
                h: form1.value.box2H
           }">
        </g>
        <g rectangleG
           [position]="{
                x: form1.value.box2X,
                y: form1.value.box2Y,
                w: form1.value.box2W,
                h: form1.value.box2H
            }"
           color="blue">
        </g>
    </svg:g>`