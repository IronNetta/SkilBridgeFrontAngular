import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { UserService } from '../../services/user.service';
import { MessageService } from 'primeng/api';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-profil-edit',
  templateUrl: './profil-edit.component.html',
  styleUrls: ['./profil-edit.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    ToastModule
  ],
  providers: [MessageService]
})
export class ProfilEditComponent {

  private readonly ref = inject(DynamicDialogRef);
  private readonly userService = inject(UserService);
  private readonly msg = inject(MessageService);

  form = new FormGroup({
    username: new FormControl('', { nonNullable: true, validators: Validators.required }),
    email: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
    password: new FormControl('', { nonNullable: true })
  });
  constructor() {
    const current = this.userService.profile();
    if (current) {
      this.form.patchValue({
        username: current.username,
        email: current.email
      });
    }
  }

  save() {
    const currentEmail = this.userService.profile()?.email!;
    const values = this.form.value;

    this.userService.updateProfile(currentEmail, values).subscribe({
      next: () => {
        this.userService.patchProfileLocally(values);
        this.msg.add({ severity: 'success', summary: 'Profil mis à jour' });
        this.ref.close();
      },
      error: () => {
        this.msg.add({ severity: 'error', summary: 'Erreur lors de la mise à jour' });
      }
    });
  }
}