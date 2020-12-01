import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})
export class ListarComponent implements OnInit {
  title = "Ejemplo";

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  Listar(){
    this.router.navigate(["listar"]);
  }

  Nuevo(){
    this.router.navigate(["add"]);
  }

}
