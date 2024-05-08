import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-code-forgot-password',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './code-forgot-password.component.html',
  styleUrl: './code-forgot-password.component.css'
})
export class CodeForgotPasswordComponent {

  code: string = '';
  isLoadingCode: any = null;

  @Output() LoadingCodeStatus: EventEmitter<any> = new EventEmitter();
  @Output() CodeValue: EventEmitter<any> = new EventEmitter();
  constructor(
    public authService: AuthService,
    private toastr: ToastrService
  ) {
  }

  verifiedCode() {
    if (!this.code) {
      this.toastr.error("Ingrese un código valido", "Validación")
    }
    let data = {
      code: this.code
    }
    this.authService.verifiedCode(data).subscribe((res: any) => {
      console.log(res);
      if (res.message == 200) {
        this.isLoadingCode = 1;
        this.LoadingCodeStatus.emit(this.isLoadingCode);
        this.CodeValue.emit(this.code);
        this.toastr.success("El código es correcto", "Éxito");
      } else {
        this.isLoadingCode = null;
        this.LoadingCodeStatus.emit(this.isLoadingCode);
        this.CodeValue.emit(this.code);
        this.toastr.error("El código es incorrecto", "Validación");
      }
    })
  }
}
