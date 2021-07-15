import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import {Router} from '@angular/router';
import { DataService } from '../data.service';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

declare var CKEDITOR: any;
@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css']
})
export class FormsComponent implements OnInit {

  public questionsForm: FormGroup = new FormGroup({});
  ckeditorContent: string = '<p>Some html</p>';
  currentuser:any;
  content:any;
  
  constructor(private loginService: LoginService,private formBuilder: FormBuilder,private route:Router, private dataService: DataService) {
    this.questionsForm = this.formBuilder.group({
      questionPaperTitle: ['My title', [Validators.required]],
      questions: this.formBuilder.array([
        this.initQuestions()
      ])
    });
   }


  ngOnInit(): void {
    
    this.dataService.currentUser.subscribe(message =>{
      this.currentuser = message;
      if(!message){
        this.route.navigate(['/']);}
      
    },error=>{
      console.error(error);
      

    });
  }

  //here

  initQuestions(): FormGroup {
    return this.formBuilder.group({
      questionVal: '',
      options: this.formBuilder.array([
        this.initOptions(),
        this.initOptions(),
        this.initOptions(),
        this.initOptions(),
      ])
    });
  }

  initOptions(): FormGroup {
    return this.formBuilder.group({
      optionVal: '',
      abilities: this.formBuilder.array([]),
      is_correct: new FormControl(false, [Validators.required])
    });
  }

  initAbilities(): FormGroup {
    return this.formBuilder.group({
      abilityVal: '',
    });
  }

  getQuestions(): FormArray {
    return this.questionsForm.get('questions') as FormArray;
  }

  getOptions(questionIndex: number): FormArray {
    return this.getQuestions().at(questionIndex).get('options') as FormArray;
  }

  getAbilities(questionIndex: number, optionIndex: number): FormArray {
    const opt = this.getQuestions().at(questionIndex).get('options') as FormArray;
    return opt.at(optionIndex).get('abilities') as FormArray;
  }

  addQuestion(): void {
    /* tslint:disable:no-string-literal */
    const control = this.questionsForm.get('questions') as FormArray;
    control.push(this.initQuestions());
  }

  addOption(questionIndex: number): void {
    const control = this.getOptions(questionIndex);
    control.push(this.initOptions());
  }

  addAbility(questionIndex: number, optionIndex: number): void {
    const control = this.getAbilities(questionIndex, optionIndex);
    control.push(this.initAbilities());
  }

  removeQuestion(i: number): void {
    const control = this.getQuestions();
    control.removeAt(i);
  }

  removeOption(questionIndex: number, optionIndex: number): void {
    const control = this.getOptions(questionIndex);
    control.removeAt(optionIndex);
  }

  removeAbility(questionIndex: number, optionIndex: number, abilityIndex: number): void {
    const control = this.getAbilities(questionIndex, optionIndex);
    control.removeAt(abilityIndex);
  }

  submitAllQuestions(): void {
    let okay: boolean = true;
    let qpaper = this.questionsForm.value;
    for (let i = 0; i < qpaper['questions'].length; i++) {
      let questions = qpaper['questions'];
      let q = questions[i]
      let answer =0;
      for (let j = 0; j < q['options'].length; j++) {
        let option =q['options'];
        let o = option[j]  
        if(o["is_correct"]==true){
          answer++;
        }
      }
      if(answer==0){
        okay=false;
      }
      
    }

    if(okay){
      this.dataService.setTest(this.questionsForm.value)
      .subscribe(
        data => {
          this.content = data;
          
          alert("Test has Started");
            },
        error =>{ 
            if(error){
              alert("Something Wrong");
            }
        });
    }
    else{
      alert("Mark the correct Options Too.")
    }
  
   }
}
