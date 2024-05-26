import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  name: string = '';
  surname: string = '';
  email: string = '';
  password: string = '';
  confirm_password: string = '';
  phone: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
  ) {

  }

  register() {
    if (
      !this.name ||
      !this.surname ||
      !this.email ||
      !this.password ||
      !this.phone
    ) {
      this.toastr.error("Necesitas ingresar todos los campos", "Validación");
      return;
    }
    if (this.password != this.confirm_password) {
      return;
    }
    let data = {
      name: this.name,
      surname: this.surname,
      email: this.email,
      password: this.password,
      phone: this.phone
    }
    this.authService.register(data).subscribe((res: any) => {
      console.log(res);
      this.toastr.success("Se registró correctamente el usuario", "Éxito");
      setTimeout(() => {
        this.router.navigateByUrl("/login")
      }, 500);
    })
  }
}
