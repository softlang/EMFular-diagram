import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import {TextDistributor} from "../../utils/text-distributor";

@Component({
    selector: '[text-area-svg]',
    templateUrl: './text-area-svg.component.svg',
    styleUrl: './text-area-svg.component.css',
    imports: [NgFor, NgIf, FormsModule]
})
export class TextAreaSvgComponent implements OnChanges {
  /*
  a fixed size svg. If the text exceeds the possible size, we will do a ... for now
   */

  @Input() text!: string
  @Input() x!: number
  @Input() y!: number
  @Input() w!: number
  @Input() h!: number
  @Input() singleEdit: boolean = false
  @Output() textChange = new EventEmitter<string>();
  //only with singleEdit since that opens an overlay where one can change the text in place

  distributedText: string[] = []
  isActive: boolean = false;


  ngOnChanges() {
    this.distributeText();
  }

  handleClick() {
    if(this.singleEdit) {
      this.isActive = true
    }
  }

  leaveTextInput() {
    this.textChange.emit(this.text)
    this.isActive = false;
  }

  distributeText(){
    this.distributedText = TextDistributor.distributeText(
      this.text, this.w, this.h
    )
  }

}
