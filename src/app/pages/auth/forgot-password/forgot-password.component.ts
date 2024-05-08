import { Component } from '@angular/core';
import { CodeForgotPasswordComponent } from '../code-forgot-password/code-forgot-password.component';
import { CommonModule } from '@angular/common';
import { NewPasswordComponent } from '../new-password/new-password.component';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule, CodeForgotPasswordComponent, NewPasswordComponent],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {
  isLoadingMail: any = null;
  isLoadingCode: any = null;
  email: string = '';
  code: string = '';
  new_password: string = '';

  constructor(
    public authService: AuthService,
    private toastr: ToastrService
  ) {
  }

  verifiedMail() {
    if (!this.email) {
      this.toastr.error("Ingresa un correo válido", "Validación")
    }
    let data = {
      email: this.email
    }
    this.authService.verifiedMail(data).subscribe((res: any) => {
      console.log(res);
      if (res.message == 200) {
        this.isLoadingMail = 1;
        this.toastr.success("El código se envió a tu correo electrónico", "Éxito");
      } else {
        this.isLoadingMail = null;
        this.toastr.error("El correo ingresado no existe", "Validación");
      }
    })
  }

  LoadingCode($event: any) {
    this.isLoadingCode = $event;
  }

  CodeValue($event: any) {
    this.code = $event;
  }
}
