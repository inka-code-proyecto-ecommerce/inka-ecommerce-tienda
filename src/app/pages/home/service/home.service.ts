import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';
import { URL_SERVICE } from '../../../config/config';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(
    public http: HttpClient,
    public authService: AuthService,
  ) { }

  home() {
    let URL = URL_SERVICE + "/ecommerce/home";
    return this.http.get(URL);
  }

  menus() {
    let URL = URL_SERVICE + "/ecommerce/menus";
    return this.http.get(URL);
  }

  showProduct(slug: string, code_discount: string) {
    let URL = URL_SERVICE + "/ecommerce/product/" + slug + "?campaing_discount=" + code_discount;
    return this.http.get(URL);
  }

  getConfigFilter() {
    let URL = URL_SERVICE + "/ecommerce/config-filter-advance";
    return this.http.get(URL);
  }

  filterAdvanceProduct(data: any) {
    let URL = URL_SERVICE + "/ecommerce/filter-advance-product";
    return this.http.post(URL, data);
  }

  campaingDiscountLink(data: any) {
    let URL = URL_SERVICE + "/ecommerce/campaing-discount-link";
    return this.http.post(URL, data);
  }
}
