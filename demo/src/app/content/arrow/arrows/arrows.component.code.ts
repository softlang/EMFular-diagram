export const arrowBetweenPointsCode = `<svg:g
   arrow-between-points
   [startX]="form0.value.startX"
   [startY]="form0.value.startY"
   [endX]="form0.value.endX"
   [endY]="form0.value.endY"
   [id]="'abp01'">
</svg:g>`;

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

export const arrowBetweenElemsCode = `<svg:g>
<g triangleG
           id="triangle_0"
           [A]="{x: 50, y:150}"
           [B]="{x: 10, y:150}"
           [C]="{x: 50, y:110}"
           color="green"
        >
        </g>
        <g triangleG
           id="triangle_1"
           [A]="{x: 20, y:20}"
           [B]="{x: 10, y:20}"
           [C]="{x: 20, y:10}"
           color="black"
        >
        </g>
        <g rectangleG
           id="rectangle_0"
           [position]="{x: 80,y: 80,w: 20,h: 20}"
           color="blue"
        >
        </g>
        <g rectangleG
           id="rectangle_1"
           [position]="{x: 140,y: 100,w: 20,h: 20}"
           color="red">
        </g>
        <g arrowElems
           [startGID]="form2.value.startID"
           startSuffix=""
           [endGID]="form2.value.endID"
           endSuffix=""
        >
        </g>
    </svg:g>`