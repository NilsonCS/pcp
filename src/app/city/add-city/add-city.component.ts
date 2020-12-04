import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Observable } from "rxjs";
import { MatDialog } from '@angular/material/dialog';
import {ServiceService} from '../serviceCity/service.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-city',
  templateUrl: './add-city.component.html',
  styleUrls: ['./add-city.component.css']
})
export class AddCityComponent implements OnInit {
  public formGroup: any;
  titleAlert: string = "This field is required";
  post: any = "";

  constructor(private formBuilder: FormBuilder, private serviceService: ServiceService, private dialog: MatDialog, private router: Router) { }

  ngOnInit(): void {
    this.createForm();
  }
  createForm(){
    this.formGroup = this.formBuilder.group({
      cityName: [null, Validators.required],
      validate: ""
    });
  }
  onSubmit(post: any) {
    this.serviceService.createCity({"cityName": post.cityName}).subscribe(data => { alert("Ciudad añadida");});
  }
  close(){
    this.dialog.closeAll();
  }
}
