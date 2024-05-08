import { Component, afterNextRender } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

declare function password_show_toggle(): any;

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = "";
  password: string = "";
  code_user: string = "";

  constructor(
    private toastr: ToastrService,
    private authService: AuthService,
    public router: Router,
    public activedRoute: ActivatedRoute
  ) {
    afterNextRender(() => {
      setTimeout(() => {
        password_show_toggle();
      }, 50);
    })
  }

  ngOnInit(): void {
    if (this.authService.token && this.authService.user) {
      setTimeout(() => {
        this.router.navigateByUrl("/");
      }, 500);
      return;
    }
    this.activedRoute.queryParams.subscribe((res: any) => {
      this.code_user = res.code;
    })

    if(this.code_user) {
      let data = {
        code_user: this.code_user,
      }
      this.authService.verifiedAuth(data).subscribe((res: any) => {
        console.log(res);
        if (res.message == 403) {
          this.toastr.error("Necesitas ingresar todos los campos", "Validación");
        }

        if (res.message == 200) {
          this.toastr.success("Se validó correctamente el correo", "Éxito");
          setTimeout(() => {
            this.router.navigateByUrl("/login");
          }, 50)
        }
      })
    }
  }

  login() {
    if (!this.email || !this.password) {
      this.toastr.error("Necesitas ingresar todos los campos", "Validación");
      return;
    }
    this.authService.login(this.email, this.password).subscribe((res: any) => {
      console.log(res);
      if (res.error) {
        this.toastr.error("Se produjo un error", "Error");
        return;
      }
      if (res == true) {
        this.toastr.success('Has iniciado correctamente sesión', 'Éxito');
        this.router.navigateByUrl("/");
      }
    }, (err) => {
      console.log(err);
    });
  }

  showSuccess() {
    this.toastr.success('Hello world!', 'Toastr fun!');
  }
}
