import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from '../serviceCity/service.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  cities: any;
  constructor(private service: ServiceService, private router: Router) {
  }
  ngOnInit() {
    this.service.getCity().subscribe(data => {
      this.cities = data;
    });
  }

  /*cities: any;
  constructor(private service:ServiceService, private router:Router) { }

  ngOnInit(): void {
    this.service.getCity().subscribe(data =>{
      this.cities=data;
    })
  }
*/

  ListCities(){
    this.router.navigate(["list"]);
  }

  NewCities(){
    this.router.navigate(["add-city"]);
  }

}

