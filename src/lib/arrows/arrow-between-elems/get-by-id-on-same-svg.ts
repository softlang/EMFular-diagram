export function getByIdOnSameSvg(
    element: SVGGraphicsElement,
    id: string
): SVGGraphicsElement|undefined {
    const res = element.ownerSVGElement?.getElementById(id)??undefined
    return res as SVGGraphicsElement;
}