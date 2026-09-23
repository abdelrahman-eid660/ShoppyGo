import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
export interface APIStructuare {
  get({path , params} : {path? : string , params? : HttpParams}): Observable<any>;

  getById(id: any): Observable<any>;

  post(body: any): Observable<any>;

  put(body: any, id: any): Observable<any>;

  patch(body: any, id: any): Observable<any>;

  delete(id: any): Observable<any>;
}
