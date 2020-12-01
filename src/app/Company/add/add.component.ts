import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  title = "Ejemplo";

  constructor(private reouter:Router) { }

  ngOnInit(): void {
  }

  Listar(){
    this.reouter.navigate(["listar"]);
  }

  Nuevo(){
    this.reouter.navigate(["add"]);
  }

}
