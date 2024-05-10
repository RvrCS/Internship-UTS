import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-check-box-lateral',
  templateUrl: './check-box-lateral.component.html',
  styleUrls: ['./check-box-lateral.component.scss']
})
export class CheckBoxLateralComponent implements OnInit {

  constructor(private router: Router) { }

  redireccion(route: string){ 

    this.router.navigate(['/precios'])

  }

  ngOnInit(): void {
  }
  
  selectedOption: string | null = null;

  toggleAnimation(option: string) {
    this.selectedOption = option;
  }
}
