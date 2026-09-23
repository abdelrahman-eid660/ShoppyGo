import { Injectable } from "@angular/core";
import { APIFunction } from "./api_function.service";

@Injectable({
  providedIn : 'root'
})
export class AuthService extends APIFunction{
  constructor(){
    super('auth')
  }
}
