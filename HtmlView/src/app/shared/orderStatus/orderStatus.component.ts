import {Component, Input, OnInit, OnChanges, SimpleChange, SimpleChanges} from '@angular/core';
import { load } from '@angular/core/src/render3';
import { destroyView } from '@angular/core/src/view/view';

@Component({
  selector: 'DM-orderstatus',
  templateUrl: './orderStatus.component.html',
  styleUrls: ['./orderStatus.component.scss']
})
export class  OrderStatusComponent implements OnInit, OnChanges {

  @Input() status;

  ngOnInit() {

  }

  ngOnChanges(changes: SimpleChanges) {

    if (changes.status.currentValue !== changes.status.previousValue) {
      console.log(this.status);
    }
    
}
}
