import { Component, Input } from '@angular/core';
import { MeterSummery } from '@model/meter.model';

@Component({
  selector: 'app-meter-card',
  templateUrl: './meter-card.component.html',
  styleUrls: ['./meter-card.component.scss']
})
export class MeterCardComponent {

  @Input() currentMeter!:MeterSummery;





  getIcons(type:string) :string {
    if(type === 'ELECTRICITY') return 'fa fa-bolt';
    else if(type === 'GAS') return 'fas fa-fire';
    else if(type === 'WATER') return 'fas fa-tint';
    else  return '';
  }

}
