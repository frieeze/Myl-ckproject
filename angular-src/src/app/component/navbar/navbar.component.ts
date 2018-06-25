import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  dateValue = new Date();

  constructor() {
    setInterval(()=>{
      this.dateValue = new Date()
    }, 500);
  }

  ngOnInit() {
  }

}
