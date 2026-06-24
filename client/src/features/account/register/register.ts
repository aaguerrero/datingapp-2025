import { Component,inject,input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RegisterCreds } from '../../../types/register-creds';
import { User } from '../../../types/user';
import { output } from '@angular/core';
import { AccountService } from '../../../core/service/account-service';


@Component({
  selector: 'app-register',
  standalone: true,

  imports: [FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  private accountService = inject(AccountService);
  cancelRegister = output<boolean>();
  protected creds = {} as RegisterCreds;

  register() {
    this.accountService.Register(this.creds).subscribe({
      next: response => {
        console.log(response);
        this.cancel();
      },
      error: error => console.log
    })
  }

  cancel(){
    this.cancelRegister.emit(false);
  }

}
