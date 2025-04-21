import { Component, signal, Output, EventEmitter } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login-register-card',
  standalone: true,
  imports: [CommonModule, LoginComponent, RegisterComponent],
  templateUrl: './login-register-card.component.html',
  styleUrl: './login-register-card.component.scss'
})
export class LoginRegisterCardComponent {
  isFlipped = signal(false);

  @Output() close = new EventEmitter<void>();

  flip() {
    this.isFlipped.set(!this.isFlipped());
  }
}
