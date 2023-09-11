import { Component, Input, Output } from '@angular/core';
import { NewTestService } from './new-test.service';

@Component({
  selector: 'app-new-test',
  templateUrl: './new-test.component.html',
  styleUrls: ['./new-test.component.css']
})
export class NewTestComponent {
  constructor(
    newTestService:NewTestService
  ){}

  @Input() sandwich:number = 10;
  @Output() hello = "";
  
  guy = 0

  counter(num:number):number{
    return num + 1;
  }

  link = "https://google.com"
  array = ['apple', 'orange', 'banana', ]

  output():void{
    console.log(this.sandwich)
  }
}
