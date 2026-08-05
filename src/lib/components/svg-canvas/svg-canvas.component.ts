import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';

@Component({
  selector: 'demo-svg-canvas',
  imports: [],
  templateUrl: './svg-canvas.component.html',
  styleUrl: './svg-canvas.component.css'
})
export class SvgCanvasComponent implements OnInit {

  @Input() viewBox = '0 0 200 200';

  @Output() svgReady: EventEmitter<SVGSVGElement> = new EventEmitter<SVGSVGElement>();
  @ViewChild('svg', { static: true })
  svg!: ElementRef<SVGSVGElement>;

  ngOnInit() {
    // Safe because ViewChild svg has static: true
    this.svgReady.emit(this.svg.nativeElement);
  }

}
