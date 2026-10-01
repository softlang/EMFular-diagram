export function getByIdOnSameSvg(
    element: SVGGraphicsElement,
    id: string
): SVGGraphicsElement {
    const svg = element.ownerSVGElement
    return svg?.querySelector(`#${id}`)
        ?? undefined
}