import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service'; // ng generate service services/auth
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  username: string = '';
  contrasenia: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService,
    private router: Router
  ) {}

  login() {
    const credentials = {
      username: this.username,
      password: this.contrasenia
    };
    this.errorMessage = '';
    this.authService.login(credentials).subscribe({
      
      next: (response) => {
        console.log('Login exitoso:', response);
        localStorage.setItem('token', response.token);
        this.router.navigate(['/home']);
      },
      error: (error) => {
        console.error('Error de login:', error);
        
        // Detecta si viene un mensaje personalizado del backend
        if (error.status === 401) {
          this.errorMessage = error.error?.message || 'Credenciales incorrectas.';
        } else {
          this.errorMessage = 'Ocurrió un error inesperado. Intenta de nuevo.';
        }
      }

    });
  }
}
