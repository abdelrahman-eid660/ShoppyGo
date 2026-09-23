import { Inject, inject, Injectable } from "@angular/core";
import { APIStructuare } from "../interface/Api.interface";
import { Observable } from "rxjs";
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from "../../shared/environments/environment";

@Injectable({
  providedIn : 'root'
})
export class APIFunction implements APIStructuare{
  constructor(@Inject(String) protected router : string){}
  private readonly baseUrl = environment.apiUrl
  private readonly http = inject(HttpClient)
  get<T>({path , params}:{path? : string , params? :HttpParams}): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}/${this.router}/${path}`, {params , withCredentials : true})
  }
  patch<T>({id , body}:{id : string , body : any}): Observable<T> {
    return this.http.patch<T>(`${this.baseUrl}/${this.router}/${id}`,body,{withCredentials : true})
  }
  post<T>({path = '' , body}:{path? : string , body : any}): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}/${this.router}/${path}`,body,{withCredentials : true})
  }
  put<T>({id  , body}:{id : string , body : any}): Observable<T> {
    return this.http.put<T>(`${this.baseUrl}/${this.router}/${id}`,body,{withCredentials : true})
  }
  delete<T>({id , path = ''}:{id: string , path? : string}): Observable<T> {
    return this.http.delete<T>(`${this.baseUrl}/${this.router}/${path}/${id}`,{withCredentials : true})
  }
  getById<T>({id , path = ''}:{id: string , path? : string}): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}/${this.router}/${path}/${id}`,{withCredentials : true})
  }
}
