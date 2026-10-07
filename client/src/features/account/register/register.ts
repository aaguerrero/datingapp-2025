import { Component,inject, signal} from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { RegisterCreds } from '../../../types/register-creds';
import { output } from '@angular/core';
import { AccountService } from '../../../core/service/account-service';
import { JsonPipe } from '@angular/common';
import { TextInput } from "../../../shared/text-input/text-input";
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  standalone: true,

  imports: [ReactiveFormsModule, JsonPipe, TextInput],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  private accountService = inject(AccountService);
  private router = inject(Router);
  private fb = inject(FormBuilder);
  cancelRegister = output<boolean>();
  protected creds = {} as RegisterCreds;

  protected credentialForms : FormGroup;
  protected profileForm: FormGroup ;
  protected currentStep = signal(1);
  protected validationErrors = signal<string[]>([]);

  constructor(){
    this.credentialForms = this.fb.group({
      email : ['',[Validators.required,Validators.email]],
      displayName : ['',Validators.required],
      password: ['',[Validators.required,
      Validators.minLength(4),Validators.maxLength(8)]],
      confirmPassword: ['',[Validators.required, this.matchValues('password')]]
    })

    this.profileForm = this.fb.group({
      gender: ['male',Validators.required],
      dateOfBirth: ['',Validators.required],
      city: ['',Validators.required],
      country:['',Validators.required],
    })
  
    this.credentialForms.controls['password'].valueChanges.subscribe(()=>{
      this.credentialForms.controls['confirmPassword'].updateValueAndValidity();
    })
  }

  matchValues(matchTo: string): ValidatorFn{
    return(control:AbstractControl): ValidationErrors | null => {
      const parent =control.parent;
      if(!parent) return null;
      
      const matchValue = parent.get(matchTo)?.value;
      return control.value === matchValue ? null : {passwordMistmatch: true}
    }
  }

  nextStep(){
    if (this.credentialForms.valid){
      this.currentStep.update(prevStep=> prevStep +1);
    }
  }

  prevStep(){
    this.currentStep.update(prevStep => prevStep -1);
  }

  getMaxDate(){
    const today =new Date();
    today.setFullYear(today.getFullYear() - 18);
    return today.toISOString().split('T')[0];
  }


  register() {
    if (this.profileForm.valid && this.credentialForms.valid){
        const formData = {...this.credentialForms.value,...this.profileForm.value};

        this.accountService.Register(formData).subscribe({

        next: () => {
          this.router.navigateByUrl('/members');
        },
        error: error => {
          console.log(error);
          this.validationErrors.set(error)
        }
      }) 

      }
    }

    

  cancel(){
    this.cancelRegister.emit(false);
  }

}
