import{Qa as o,Sa as p,f as n,g as a,ja as i,ka as c}from"./chunk-CALLUSTU.js";var w=(()=>{let r=class r{constructor(t,e){this.authService=t,this.http=e}getInfoProfileClient(){let t=new i({Authorization:"Bearer "+this.authService.token}),e=o+"/ecommerce/profile_client/";return this.http.get(e,{headers:t})}updateProfile(t){let e=new i({Authorization:"Bearer "+this.authService.token}),h=o+"/ecommerce/profile_client";return this.http.post(h,t,{headers:e})}showUsers(){let t=new i({Authorization:"Bearer "+this.authService.token}),e=o+"/ecommerce/profile_client/me";return this.http.get(e,{headers:t})}showOrders(){let t=new i({Authorization:"Bearer "+this.authService.token}),e=o+"/ecommerce/profile_client/orders";return this.http.get(e,{headers:t})}registerReview(t){let e=new i({Authorization:"Bearer "+this.authService.token}),h=o+"/ecommerce/reviews";return this.http.post(h,t,{headers:e})}updateReview(t,e){let h=new i({Authorization:"Bearer "+this.authService.token}),u=o+"/ecommerce/reviews/"+t;return this.http.put(u,e,{headers:h})}};r.\u0275fac=function(e){return new(e||r)(a(p),a(c))},r.\u0275prov=n({token:r,factory:r.\u0275fac,providedIn:"root"});let s=r;return s})();export{w as a};
