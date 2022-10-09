import { ErrorInterceptor } from '../services/interceptors/error.interceptor';
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { httpInterceptor } from "../services/interceptors/http.interceptor";

export const interceptorProviders = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: httpInterceptor,
    multi: true
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true
  },
];
