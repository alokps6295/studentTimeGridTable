import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { JwtService, FormValidatorService, HelperService, ToastNotificationService } from './../shared/services';
import { GlobalEvent } from 'global-event-service';
import { FormBuilder, FormGroup, Validators,FormArray } from '@angular/forms';
import {StudentService} from './studentService'
import { Ng2SmartTableModule,LocalDataSource } from 'ng2-smart-table';
import * as moment from 'moment';

@Component({
  selector: 'student-entry',
  templateUrl:'studentEntry.component.html',
  styleUrls: ['./studentEntry.component.scss'],
})
export class StudentEntryComponent implements OnInit{
  settings;
  settingsTime;
  source: LocalDataSource;
  sourceTime:LocalDataSource;
  studentsData=[];
  constructor(
    private router: Router,
    private jwt: JwtService,
    private global: GlobalEvent,
    private _fb: FormBuilder,
    public validate: FormValidatorService,
    private studentService:StudentService,
    public helper: HelperService,
    public notify: ToastNotificationService
  ) {
    this.initializeForm();
    this.source = new LocalDataSource([]);
    this.sourceTime=new LocalDataSource([]);
    //localStorage.setItem('studentRecord',JSON.stringify([]))
   /*  const year_18 = moment(new Date());
      this.maxDate = {
        year: year_18.year(),
        month: year_18.month() + 1,
        day: year_18.date(),
      }
      this.minDate = {
        year: 1900,
        month: 1,
        day: 1,
      }
    
  } */}
  
  ngOnInit() {
    
    this.studentsData=JSON.parse(localStorage.getItem('studentRecord'));
    if(this.studentsData){
    this.source.load(JSON.parse(JSON.stringify(this.studentsData)));
    this.sourceTime.load(JSON.parse(JSON.stringify(this.studentsData)));
    console.log("this.source......",this.source,this.studentsData);
    }
}

  initializeForm() {
   this.settings = {
    add: {
      addButtonContent: '<i  class="ion-ios-plus-outline">Add</i>',
      createButtonContent: '<i class="ion-checkmark">Create </i>',
      cancelButtonContent: '<i class="ion-close">Cancel</i>',
      confirmCreate: true,

    },
    edit: {
      editButtonContent: '<i class="ion-edit">Edit</i>',
      saveButtonContent: '<i class="ion-checkmark">Save</i>',
      cancelButtonContent: '<i class="ion-close">Cancel</i>',
      confirmSave: true
    },
    delete: {
      deleteButtonContent: '<i class="ion-trash-a">Delete</i>',
      confirmDelete: true
    }, 
    columns: {
      id: {
        title: 'ID'
      },
      name: {
        title: 'Full Name'
      },
      Date: {
        title: 'Date'
      }
    }
  };
  this.settingsTime={
    add: {
      addButtonContent: '<i  class="ion-ios-plus-outline">Add</i>',
      createButtonContent: '<i class="ion-checkmark">Create </i>',
      cancelButtonContent: '<i class="ion-close">Cancel</i>',
      confirmCreate: true,

    },
    edit: {
      editButtonContent: '<i class="ion-edit">Edit</i>',
      saveButtonContent: '<i class="ion-checkmark">Save</i>',
      cancelButtonContent: '<i class="ion-close">Cancel</i>',
          confirmSave: true
    },
    columns: {
        name_time:{title:'Name'},
        inTime: {
          title: 'In Time'
        },
        outTime: {
          title: 'out Time'
        }
      }
  }
  }
 /* saveAllStudent(){
    this.source.getAll().then(res =>{
    console.log(res); 
  });
 } */
 addRecord(event){
  let data=event.newData;
  event.confirm.resolve(event.newData);
  this.studentsData.push(data);
  localStorage.setItem('studentRecord',JSON.stringify(this.studentsData))
  // this.source.refresh();
  // event.confirm.resolve(undefined);
 }
 addRecordTime(event){
   console.log(event);
   let data=event.newData;
   event.confirm.resolve(event.newData);
   this.searchStudent(data)
 }

 deleteRecord(event){
   console.log(event);
   let data=event.data;
   for(let i=0;i<this.studentsData.length;i++){
     if(this.studentsData[i].name==data.name){
       console.log("matched index delete")
      this.studentsData.splice(i,1);
      console.log("matched index delete", this.studentsData)
     }
   }
   localStorage.setItem('studentRecord',JSON.stringify(this.studentsData))
   this.source.load(JSON.parse(JSON.stringify(this.studentsData)));
   this.sourceTime.load(JSON.parse(JSON.stringify(this.studentsData)));
 }
 editRecords(event){
  let data=event.newData;
  let oldData=event.data;
  for(let i of this.studentsData){
    console.log(i);
    if(i.name==oldData.name){
      console.log("Matched",data);
      i['name']=data.name;
      i['Date']=data.Date;
    }
  }
  localStorage.setItem('studentRecord',JSON.stringify(this.studentsData))
  this.source.load(JSON.parse(JSON.stringify(this.studentsData)));
 }
 editRecordsTime(event){
  let data=event.newData;
  let oldData=event.data;
  for(let i of this.studentsData){
    console.log(i);
    if(i.name_time==oldData.name_time){
      console.log("Matched",data);
      i['inTime']=data.inTime;
      i['outTime']=data.outTime;
    }
  }
  localStorage.setItem('studentRecord',JSON.stringify(this.studentsData))
  this.sourceTime.load(JSON.parse(JSON.stringify(this.studentsData)));
 }

 searchStudent(data){
   let studentData=JSON.parse(localStorage.getItem('studentRecord'));
   for(let i of studentData){
     console.log(i);
     if(i.name==data.name_time){
       console.log("Matched",data);
       i['inTime']=data.inTime;
       i['outTime']=data.outTime;
       i['name_time']=data.name_time;
     }
   }
   localStorage.setItem('studentRecord',JSON.stringify(studentData))
 }
 saveAllRecords(){
this.studentService.saveStudent(JSON.parse(localStorage.getItem('studentRecord'))).subscribe((data)=>{
console.log(data);
})
   
 }
  /* createStudent(): FormGroup {
    return this._fb.group({
        Name:[undefined,Validators.required],
        Date:[undefined,Validators.required]
    });
  }
  enterTime():FormGroup{
      return this._fb.group({
          inTime:[undefined,Validators.required],
          outTime:[undefined,Validators.required]
      })
  }
 addTime():void{
      this.studentTimeRecord=this.studentForm.get('time') as FormArray;
      this.studentTimeRecord.push(this.enterTime())
      console.log(this.studentTimeRecord);
      let obj={
        index:this.currentIndex,
        Name:this.studentTimeRecord.controls[this.currentIndex].value.inTime,
        Date:this.studentTimeRecord.controls[this.currentIndex].value.outTime
    }
    let studentArr=[];
    studentArr.push(obj);
    localStorage.setItem('studentArray',JSON.stringify(studentArr))
  }
  addItem(): void {
    this.studentRecord = this.studentForm.get('student') as FormArray;
    this.studentRecord.push(this.createStudent());
    this.disableAdd=true;
    let obj={
        index:this.currentIndex,
        Name:this.studentRecord.controls[this.currentIndex].value.Name,
        Date:this.studentRecord.controls[this.currentIndex].value.Date
    }
    this.currentIndex=this.currentIndex+1;
   
    this.studentArr.push(obj);
  //  localStorage.setItem('studentArray',JSON.stringify(studentArr))


  }
  */
 
  submit(){
   /*  if (this.policyForm.invalid) {
      this.policyNumber.markAsTouched();
      this.dob.markAsTouched();
      return;
    }
    let dobObject=this.policyForm.value['dob']
    let PolicyObj={
      policyNumber:this.policyForm.value['policyNumber'],
      dob:dobObject['month']+"/"+dobObject['day']+"/"+dobObject['year']
    }
    this.policy.getPolicy(PolicyObj).subscribe(res=>{
         console.log("policyDetails::::::::",res);
         localStorage.setItem('policyFetch',JSON.stringify(PolicyObj));
         this.policy.renewPolicyData=res.res.policyToRenew;
         this.policy.newPolicies=res.res.newPolicies;
         console.log( this.policy.renewPolicyData);
         this.router.navigate(['review/policyDetail'])
    },err=>{
          console.log(err);
    }) */

  }


}
