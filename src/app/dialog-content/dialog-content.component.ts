import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-dialog-content',
  templateUrl: './dialog-content.component.html',
  styleUrls: ['./dialog-content.component.css']
})
export class DialogContentComponent implements OnInit {
  name: string;
  age: number;
  email: string;
  address: string;
  phone: string;
  company: string;

  nameHint: string = "Enter the name";
  ageHint: string;
  emailHint: string;
  addressHint: string;
  phoneHint: string;
  companyHint: string;


  constructor() { }

  ngOnInit() {
  }
  checkValidate = function(name) {
    if(this.name.length < 6){
        this.nameHint = "Name too short";
        console.log(name)
    }
    console.log(this.nameHint);
  }

  onSubmit(form:NgForm){
    console.log(form);
  }

}
