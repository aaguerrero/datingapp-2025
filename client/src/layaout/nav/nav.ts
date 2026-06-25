import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../../core/service/account-service';
import { JsonPipe } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ToastService } from '../../core/service/toast-service';



@Component({
  selector: 'app-nav',
  imports: [FormsModule,RouterLink],
  templateUrl: './nav.html',
  styleUrl: './nav.css',
})
export class Nav {
  protected accountService= inject(AccountService)
  private router = inject(Router);
  private toast  = inject(ToastService)
  protected creds : any = {}
  
  login() {
    this.accountService.login(this.creds).subscribe({
      next: () =>{
        this.toast.success('Welcome back!', 3000);
        this.router.navigateByUrl('/members');
        this.creds={};
      } ,
      
      error: error =>
      {
          if (error.status === 400 && error.error.errors) {

          const validationErrors = error.error.errors;

          if (validationErrors.Email) {
              this.toast.error(validationErrors.Email[0]);
             return;
            }
  }

  this.toast.error(error.error);
        
      
      }
      
    });
  }

  logout(){
    this.accountService.logout();
    this.router.navigateByUrl('/');
  }

}
