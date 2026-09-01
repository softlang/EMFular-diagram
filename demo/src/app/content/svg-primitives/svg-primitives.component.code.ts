export const pointAndBB =
`export interface Point2D {
    x: number;
    y: number;
}
export interface BoundingBox {
  x: number;
  y: number;
  w: number;
  h: number;
}`

export const rotate0=
`<svg:g rectangleG
     [position]="{x: 50,y: 50,w: 40,h:20}"
     [color]="form0.value.color"
     [attr.transform]="'rotate('+form0.value.rotate+',70,60)'"
>
</svg:g>`