export function getByIdOnSameSvg(
    element: SVGGraphicsElement,
    id: string
): SVGGraphicsElement|undefined {
    const svg = element.ownerSVGElement
    return svg?.querySelector(`#${id}`)
        ?? undefined
}