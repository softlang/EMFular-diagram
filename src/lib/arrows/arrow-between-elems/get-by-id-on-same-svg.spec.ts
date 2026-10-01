import {getByIdOnSameSvg} from "./get-by-id-on-same-svg";

describe('getByIdOnSameSvg', () => {

    it('finds the element only within the arrow SVG', () => {
        const firstSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        const secondSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');

        const firstTarget = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        firstTarget.id = 'target';

        const secondTarget = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        secondTarget.id = 'target';

        const arrow = document.createElementNS('http://www.w3.org/2000/svg', 'g');

        firstSvg.append(firstTarget);
        firstSvg.append(arrow);
        secondSvg.append(secondTarget);
        document.body.append(secondSvg, firstSvg);

        expect(getByIdOnSameSvg(arrow, 'target')).toBe(firstTarget);
    });

    it('returns undefined when the element is not in the same SVG', () => {
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        const otherSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');

        const target = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        target.id = 'target';

        const arrow = document.createElementNS('http://www.w3.org/2000/svg', 'g');

        svg.append(arrow);
        otherSvg.append(target);
        document.body.append(svg, otherSvg);

        expect(getByIdOnSameSvg(arrow, 'target')).toBeUndefined();
    });


})