import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Observable } from "rxjs";
import { MatDialog } from '@angular/material/dialog';
import {ServiceService} from '../serviceCity/service.service';

@Component({
  selector: 'app-add-city',
  templateUrl: './add-city.component.html',
  styleUrls: ['./add-city.component.css']
})
export class AddCityComponent implements OnInit {
  public formGroup: any;
  titleAlert: string = "This field is required";
  post: any = "";

  constructor(private formBuilder: FormBuilder, private serviceService: ServiceService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.createForm();
  }
  createForm(){
    this.formGroup = this.formBuilder.group({
      name: [null, Validators.required],
      validate: ""
    });
  }
  onSubmit(post: any) {
    this.serviceService.createCity({"cityId": post.cityId, "cityName": post.cityName})
  }
  close(){
    this.dialog.closeAll();
  }
}
