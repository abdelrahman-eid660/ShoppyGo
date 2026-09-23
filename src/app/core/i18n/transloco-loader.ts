import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Translation, TranslocoLoader, TranslocoLoaderData } from "@jsverse/transloco";
import { Observable } from "rxjs";

@Injectable({
  providedIn : 'root'
})
export class TranslocoHttpLoader implements TranslocoLoader{
  private readonly http : HttpClient = inject(HttpClient)
  getTranslation(lang: string = 'ar', data?: TranslocoLoaderData): Observable<Translation | any> {
    return this.http.get<unknown>(`/assets/i18n/${lang}.json`)
  }
}
