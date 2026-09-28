export function getByIdOnSameSvg(
    element: SVGGraphicsElement,
    id: string
): SVGGraphicsElement {
    const elem = document.getElementById(id)
    return elem as unknown as SVGGraphicsElement
}