import {Component, EventEmitter, inject, Output} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth-service.service';
import {samePasswordValidator} from '../../validators/same-password.validators';
import {FloatLabel} from 'primeng/floatlabel';
import {Password} from 'primeng/password';
import {Button} from 'primeng/button';
import {InputText} from 'primeng/inputtext';
import {PrimeTemplate} from 'primeng/api';
import {SelectButton} from 'primeng/selectbutton';

@Component({
  selector: 'app-register',
  imports: [
    FloatLabel,
    ReactiveFormsModule,
    Password,
    Button,
    InputText,
    PrimeTemplate,
    SelectButton
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  private readonly _fb: FormBuilder = inject(FormBuilder);
  private readonly _authService: AuthService = inject(AuthService);

  @Output()
  private readonly close: EventEmitter<void> = new EventEmitter();

  @Output()
  readonly _switchForm = new EventEmitter<void>();


  registerForm: FormGroup;
  errorMessage: string | null = null;
  isLoading = false;
  isRegistered = false;

  roleOptions = [
    { label: 'Étudiant', value: 'STUDENT' },
    { label: 'Mentor', value: 'MENTOR' }
  ];

  constructor() {
    this.registerForm = this._fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
      confirmPassword: [null, [Validators.required]],
      username: [null, [Validators.required]],
      role: ['STUDENT', [Validators.required]],
    });
    this.registerForm.setValidators(samePasswordValidator());
  }

  submit() {

    this.registerForm.markAllAsTouched();

    if (this.registerForm.invalid) {
      return;
    }

    this.isLoading = true;
    this._authService.register(this.registerForm.value).subscribe({
      next: () => {
        this.isLoading = false;
        this.registerForm.reset();
        this.isRegistered = true;
        this.closeForm();
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
        this.errorMessage = err.error;
      }
    });
  }

  closeForm() {
    this.registerForm.reset();
    this.errorMessage = null;
    this.close.emit();
  }

  switchForm(): void {
    this.registerForm.reset();
    this.errorMessage = null;
    this._switchForm.emit();
  }

}

