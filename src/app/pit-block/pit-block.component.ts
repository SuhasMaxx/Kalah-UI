import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pit-block',
  templateUrl: './pit-block.component.html',
  styleUrls: ['./pit-block.component.scss']
})
export class PitBlockComponent implements OnInit {
  stones = 0;

  constructor() { }

  ngOnInit(): void {
    this.stones = Math.floor(Math.random() * Math.floor(15));
  }


  totalStones(): any[]{
    return Array(this.stones)
  }

}
