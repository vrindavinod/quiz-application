
  import { Component, OnInit,  NgZone } from '@angular/core';
import { DataService } from '../data.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {


  constructor(private dataService: DataService,private route:Router,public ngZone: NgZone) { }

  public quiz:any;
  public totalScore=0;
  private radioButtonValues : Array<any> = [];
  public showAnswer : boolean = false;
  public currentQuestion=0;
  public answerSelected =false;
  public correctAns = 0;
  public incorrectAns = 0;
  public showSubmit = false;
  public didTake = false;
  public data:any;
  public questionText:any;

  ngOnInit(): void {
    this.fetchData()
    
  }

  fetchData(){
    this.dataService.didTakeTest().subscribe(data => {
      this.data = data
      this.didTake = this.data["didTake"]
      console.log(this.didTake);
      if (this.didTake==false) {
        this.dataService.getTest().subscribe(data => {
          this.ngZone.run(() => {
            this.quiz = data
            this.questionText=this.quiz.questions[this.currentQuestion].questionVal;
            console.log(this.questionText);
          });
        },
        err =>console.log(err)
        
        );
      }
    },
    err =>console.log(err)
    );

    
    
  }


  completeTest(){
    console.log(this.radioButtonValues);
    if(this.radioButtonValues.length == this.quiz["questions"].length){
      console.log("We are Okay");
      this.calculateScore();
      this.dataService.sendScore({score:this.totalScore,total:this.quiz.questions.length}).subscribe(data => {
        console.log(data);
        
      },
      err =>console.log(err),
      ()=>console.log('Done Loding Data')
      
      );
    
    }
    else{
      alert("Answer all the questions");
      
    }
  }

  onAnswer(data:boolean){
    this.radioButtonValues[this.currentQuestion]=data;
        
  }
  next(){
    if(this.currentQuestion<this.quiz.questions.length-1){
    setTimeout(()=>{
      this.currentQuestion++;
      this.questionText=this.quiz.questions[this.currentQuestion].questionVal;
      console.log(this.questionText);
    });
    
    
    if(this.currentQuestion==this.quiz.questions.length-2){
      this.showSubmit = true;
    }
  }
  }

  previous(){
    if(this.currentQuestion>0){
    setTimeout(()=>{
      this.currentQuestion--;
      this.questionText=this.quiz.questions[this.currentQuestion].questionVal;
      console.log(this.questionText);
    });
    

  }
  }

  calculateScore(){
    for (let index = 0; index < this.radioButtonValues.length; index++) {
       if(this.radioButtonValues[index]){
       this.totalScore++;
       }
    }
    this.showAnswer = true;
    console.log("Score is",this.totalScore);
  }
  
  
}
