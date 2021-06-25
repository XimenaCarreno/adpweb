import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface LoginData {
  email: string;
  password: string;
};

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.css']
})
export class LoginDialogComponent {  
  public formLogin: FormGroup;
  public hide = true;
  
  constructor(public dialogRef: MatDialogRef<LoginDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: LoginData,
    private formBuilder: FormBuilder) {
      this.formLogin = this.formBuilder.group({
        'email': ['', Validators.compose([Validators.required, Validators.email])],
        'password': ['', Validators.compose([Validators.required, Validators.minLength(6)])]
      });
    }

    login() {
      if (this.formLogin.valid) {
        this.dialogRef.close(this.formLogin.value)
      } else {
        console.log('LLena todos los campos para continuar');
      }
    }

    onNoClick(): void {
      this.dialogRef.close();
    }

    get email() {
      return this.formLogin.controls['email'];
    }
  
    get password() {
      return this.formLogin.controls['password'];
    }

}
