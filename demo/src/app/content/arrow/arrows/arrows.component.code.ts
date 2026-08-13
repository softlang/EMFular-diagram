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

export const arrowStyleConfig = `export interface ArrowStyleConfiguration {
    color: string;
    dashed: number[];
    startPointer?: string;
    endPointer?: string;
}`

export const markerStyleConfig =
`<svg:g>
  <svg:defs>
   <marker id='A' orient="auto" markerWidth='10' markerHeight='10' refX='10' refY='5'>
     <path d='M0,0 L10,5 L0,10 L2,5 Z' stroke="black" fill="black"></path>
   </marker>
   <marker id='B' orient="auto" markerWidth='10' markerHeight='10' refX='10' refY='5'>
     <circle cx="5" cy="5" r="5" stroke="black" fill="white"></circle>
   </marker>
   <marker id='C' orient="auto" markerWidth='10' markerHeight='10' refX='10' refY='5'>
      <path d='M0,0 L10,10 L5,5 L0,10 L10,0' stroke="red" fill="none"></path>
   </marker>
   <marker id='D' orient="auto" markerWidth='10' markerHeight='10' refX='10' refY='5'>
      <path d="M0,5 L10,0 Z L10,5 Z L10,10 Z" stroke="green" fill="none"></path>
   </marker>
 </svg:defs>
 <g arrow-between-points
  [startX]="10"
  [startY]="10"
  [endX]="190"
  [endY]="100"
  [id]="'arrowstyle0'"
  [lineStyle]="{color: form3.value.color,
   dashed: form3.value.dashed,
    startPointer: form3.value.startMarker,
     endPointer: form3.value.endMarker}"
 ></g>
</svg:g>`
