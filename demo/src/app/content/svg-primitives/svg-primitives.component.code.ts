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

export const triangle0 =
`<svg:g triangleG
      [A]="{x:5, y:50}"
      [B]="{x:20, y:80}"
      [C]="{x: form0.controls.Cx.value, y: form0.controls.Cy.value}"
      [color]="form0.value.color"
>
</svg:g>
`

export const rotate0=
`<svg:g rectangleG
     [position]="{x: 50,y: 50,w: 40,h:20}"
     [color]="form0.value.color"
     [attr.transform]="'rotate('+form0.value.rotate+',70,60)'"
>
</svg:g>`
