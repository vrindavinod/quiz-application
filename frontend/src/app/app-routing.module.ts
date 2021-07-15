import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { FormsComponent } from './forms/forms.component';
import { TestComponent } from './test/test.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { 
    path: '',
    component: LoginComponent,   
    
  },
  { 
    path: 'forms',
    component: FormsComponent,   
    canActivate: [AuthGuard]
  },
  { 
    path: 'test',
    component: TestComponent,   
    canActivate: [AuthGuard]
    
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
