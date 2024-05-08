import { Component, Input } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-new-password',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './new-password.component.html',
  styleUrl: './new-password.component.css'
})
export class NewPasswordComponent {
  new_password: string = '';
  isLoadingCode: any = null;
  @Input() code: any;
  constructor(
    public authService: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) {
  }

  verifiedNewPassword() {
    if (!this.new_password) {
      this.toastr.error("Ingrese un código valido", "Validación")
    }
    let data = {
      new_password: this.new_password,
      code: this.code
    }
    this.authService.verifiedNewPassword(data).subscribe((res: any) => {
      console.log(res);
      if (res.message == 200) {
        this.isLoadingCode = 1;
        this.toastr.success("Se restableció correctamente la contraseña", "Éxito");
        this.router.navigateByUrl("/login")
      } else {
        this.isLoadingCode = null;
        this.toastr.error("Ocurrió algún error, intentelo de nuevo mas tarde", "Error");
      }
    })
  }
}
