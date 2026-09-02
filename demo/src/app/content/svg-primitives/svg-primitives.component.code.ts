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

export const styles = `export interface SvgTextStyle {
    'fill'?: string;
    'font-family'?: string;
    'font-size'?: string | number;
    'font-weight'?: string | number;
    'font-style'?: string;
    'text-anchor'?: 'start' | 'middle' | 'end';
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

export const text0 =
    `<g text-area-svg
           [(text)]="form2Text"
           [singleEdit]="form2.controls.singleEdit.value"
           [x]="form2.controls.x.value"
           [y]="form2.controls.y.value"
           [w]="form2.controls.w.value"
           [h]="form2.controls.h.value"
    >
    </g>
    //banana binding of text to form value via:
    get form2Text(){
        return this.form2.value.text
    }
    set form2Text(value){
        this.form2.patchValue({text: value})
    }`

export const textRect = `<svg:g rectangle-with-text
           [id]="'form3rectWithText'"
           [color]="form3.controls.color.value"
           [(text)]="form3Text"
           [position]="{x: form3.value.x, y: form3.value.y, w: form3.value.w, h: form3.value.h}"
           [textStyle]="{
            fill: form3.controls.fill.value,
            'font-family': form3.controls['font-family'].value,
            'font-size': form3.controls['font-size'].value
            }"
        >
        </svg:g>`