import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoginDialogComponent } from './components/login-dialog/login-dialog.component';
import { AuthService } from './services/auth.service';

export interface Login {
  email: string;
  password: string;
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public session = false;

  constructor(public dialog: MatDialog,
    private authService: AuthService,
    private router: Router) {
    this.authService.session().then(res => {
      this.session = res;
    }).catch(err => {
      this.session = err;
    });
  }

  redirectToAdminPage() {
    this.router.navigate(['admin'])
  }
  
  login() {
    this.openDialog();
  }

  logout() {
    this.authService.logout();
    this.session = false;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(LoginDialogComponent, {
      width: '450px'
    });

    dialogRef.afterClosed().subscribe((result: Login) => {
      if (result.hasOwnProperty('email') && result.hasOwnProperty('password')) {
        this.authService.login(result).subscribe( res => {
          localStorage.setItem('token', res.token);
          localStorage.setItem('user', JSON.stringify(res.user));
          this.router.navigate(['admin']);
          this.session = true;
        }, err => {
          console.log(err);
        });
      }
    });
  }
}
