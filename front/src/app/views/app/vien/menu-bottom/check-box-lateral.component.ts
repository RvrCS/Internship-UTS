import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-check-box-lateral',
  templateUrl: './check-box-lateral.component.html',
  styleUrls: ['./check-box-lateral.component.scss']
})
export class CheckBoxLateralComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  
  selectedOption: string | null = null;

  toggleAnimation(option: string) {
    this.selectedOption = option;
  }
}
