import { TestBed, ComponentFixture } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';
import {TextAreaSvgComponent} from "./text-area-svg.component";


describe('import TestBed', () => {
    it('1', () => {
        expect(TestBed).toBeDefined();
    });

    it('2', () => {
        TestBed.configureTestingModule({
            imports: [],
        });
        expect(TestBed).toBeDefined();
    })
/*
    it('can import component', () => {
        expect(TextAreaSvgComponent).toBeDefined();
    });
    
 */
});