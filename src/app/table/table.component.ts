import { Component, OnInit, Inject, Optional } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {NgForm} from '@angular/forms';

export interface PeriodicElement {
  No: string;
  Name: string;
  Age: number;
  Email: string;
  Address: string;
  Phone: string;
  Company: string;
  Delete: string;
}


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  ELEMENT_DATA: PeriodicElement[] = [
    {No: 'a', Name: 'ramesh', Age: 23, Email: 'ramesh@gmail.com', Address: 'silicon city', Phone: '9054684888', Company: 'Onground', Delete: '1'},
    {No: 'a', Name: 'suresh', Age: 30, Email: 'suresh@gmail.com', Address: 'bengaluru', Phone: '9845905599', Company: 'Onground', Delete: '1'},
  ];

  constructor(public dialog: MatDialog, public dialog1: MatDialog) { }
  defaultElevation: number = 2;

  displayedColumns: string[] = ['No', 'Name', 'Age', 'Email', 'Address', 'Phone', 'Company', 'Delete'];
  hover: boolean[] = [false, false, false, false, false, false, false, false, false, false];
  dataSource = new MatTableDataSource(this.ELEMENT_DATA);

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  func = () => {
    console.log('i');
    alert('i');
  }

  onHover = (i:number) => {
      this.hover[i] = true;
  }

  OffHover = (i:number) => {
    this.hover[i] = false;
  }

  openDialog1(ind:number): void {
    const dialogRef = this.dialog1.open(DialogDeleteDialog, {
      width: '350px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if(result === 1){
        this.deleteEntry(ind);
      }
    });
  }

  deleteEntry = (i:number) => {
    // this.ELEMENT_DATA.splice(i, 1);
    let ds = this.dataSource.data;
    ds.splice(i, 1);
    this.dataSource.data = ds;
    console.log(this.dataSource.data);
  }

    openDialog(ind: number, type, button) {
      let myData: PeriodicElement = {No: '1',
       Name: '',
       Age: 0, Email: 
       '', 
       Address: '', Phone: '', Company: '', Delete: '1'};
      if(type === 'edit')
      myData = this.ELEMENT_DATA[ind];

      const dialogRef = this.dialog.open(DialogContentExampleDialog, {
        data:{ 
          data: myData,
          type,
          button
        }
      });

      dialogRef.afterClosed().subscribe(result => {
        if(result !== undefined && result[6]) 
        {
        console.log(`Dialog result: ${result}`);
        let ds = this.dataSource.data;
        if(type === 'add'){
        ds.push(
          {No: 'a', Name: result[0] ,Age: result[1], Email: result[2], Address: result[3], Phone: result[4], Company: result[5], Delete: '1'})
          this.dataSource.data = ds;
        }
        else {
          ds[ind] = {No: 'a', Name: result[0] ,Age: result[1], Email: result[2], Address: result[3], Phone: result[4], Company: result[5], Delete: '1'}
          this.dataSource.data = ds;
        }

      } 
        });
        
     
    }


  ngOnInit() {
  }

}

@Component({
  selector: 'dialog-content-example-dialog',
  templateUrl: '../dialog-content/dialog-content.component.html',
})
export class DialogContentExampleDialog {
  name: string;
  age: number;
  email: string;
  address: string;
  phone: string;
  company: string;
  valid: boolean = false;

  button: string;

  constructor(@Optional() @Inject(MAT_DIALOG_DATA) public data: any) {
    console.log(data.data.Name);
    this.name = data.data.Name;
    this.age = data.data.Age;
    this.email = data.data.Email;
    this.address = data.data.Address;
    this.phone = data.data.Phone;
    this.company = data.data.Company;
    if(data.type === 'edit'){
    this.checkAddress();this.checkName();this.checkAge();this.checkEmail();
    this.checkPhone(); this.checkCompany();
    }
    this.button = data.button;
  }


  nameHint: string = "Enter the name (length >= 5)";
  ageHint: string = "Enter the age (0-100)";
  emailHint: string = "Enter the email";
  addressHint: string = "Enter the address (length > 5)";
  phoneHint: string = "Enter the phone number (10 digits)";
  companyHint: string = "Enter the company name";

  checkName = function() {
    if(this.name.length < 5) this.nameHint = "Name too short";
    else this.nameHint = "Valid";
  }
  checkAge() {
    if(this.age <= 0 || this.age > 100) this.ageHint = "Invalid age";
    else this.ageHint = "Valid";
  }

  checkEmail() {
    if( (/^\w+([\.]?\w)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.email)) ) this.emailHint = "Valid"
    else this.emailHint = "invalid email";
  }
  checkAddress() {
    if(this.address.length < 5) this.addressHint = "Invalid address";
    else this.addressHint = "Valid";
  }
  checkPhone() {
    if(this.phone.length === 10 && (/\d{10}/).test(this.phone)) this.phoneHint = "Valid";
    else this.phoneHint = "Invalid Phone number";
  }
  checkCompany() {
    if(this.company === '' ) this.companyHint = "Enter the valid company name";
    else this.companyHint = "Valid";
  }

  checkAll(){
    if(this.nameHint === "Valid" && this.ageHint === "Valid" && this.addressHint === "Valid"
    && this.phoneHint === "Valid" && this.emailHint === "Valid" && this.companyHint === "Valid")
    return true;
    return false;
  }

  onSubmit(myForm: NgForm){
    if(this.checkAll()){
    // alert("valid");
    this.valid = true;
  }
    else {
      alert("Invalid");
      this.valid = false;
    }
  }

  formChange() {
    console.log("formChanged");
  }

}

@Component({
  selector: 'dialog-delete-dialog',
  templateUrl: './delete.html',
})
export class DialogDeleteDialog {

  constructor() {}

}