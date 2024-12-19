import { Component } from '@angular/core';
import { Router } from '@angular/router';   
import { HttpErrorResponse } from '@angular/common/http';
import { UserService}  from '../../Services/userService';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [FormsModule,CommonModule] ,
})
export class LoginComponent {
  loginData = {
    email: '',
    password: ''
  };

  errorMessage: string = '';

  constructor(private router: Router, private userService: UserService) {} // Inject Router and UserService

  onLogin(): void {
    this.userService.loginUser(this.loginData).subscribe(
      response => {
        const token = response.headers.get('Authorization'); // Assuming the token is in the Authorization header
        if (token) {
          localStorage.setItem('authToken', token); // Save token in localStorage
          this.router.navigate(['/dashboard']); // Navigate to dashboard
        }
      },
      error => {
        console.error('Login failed', error);
        this.errorMessage = 'Invalid email or password.';
      }
    );
  }

  hideIcon(event: FocusEvent) {
    const input = event.target as HTMLInputElement;
    const icon = input.previousElementSibling as HTMLElement;
    if (icon) {
      icon.style.opacity = '0';
    }
  }

  showIcon(event: FocusEvent) {
    const input = event.target as HTMLInputElement;
    const icon = input.previousElementSibling as HTMLElement;
    if (icon) {
      icon.style.opacity = '1';
    }
  }
}
