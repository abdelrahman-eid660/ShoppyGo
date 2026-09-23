import { inject, Injectable, signal } from "@angular/core";
import { TranslocoService } from "@jsverse/transloco";
import { LangEnum } from "../../shared/models/global.model";
import { firstValueFrom } from "rxjs";

@Injectable({
  providedIn : 'root'
})
export class LanguageService {
  private readonly transloco = inject(TranslocoService)
  private readonly storageKey = 'ShoppyGo-language'
  readonly currentLanguage = signal<LangEnum>(this.getLanguage())
  async initLanguage(): Promise<void> {
    const lang = this.getLanguage();
    await firstValueFrom(this.transloco.load(lang))
    this.currentLanguage.set(lang)
    this.transloco.setActiveLang(lang);
    this.updateAppDirection(lang);
  }
  private updateAppDirection(lang : LangEnum):void{
    const direction = lang === 'en' ? 'ltr' : 'rtl'
    document.documentElement.dir = direction
    document.documentElement.lang = lang
  }
  async setLanguage(lang : LangEnum):Promise<void>{
    if(lang === this.currentLanguage()) return
    await firstValueFrom(this.transloco.load(lang))
    this.currentLanguage.set(lang)
    this.transloco.setActiveLang(lang)
    localStorage.setItem(this.storageKey,lang)
    this.updateAppDirection(lang)
  }
  getLanguage():LangEnum{
    const lang = localStorage.getItem(this.storageKey)
    return lang  === 'en' ? LangEnum.en : LangEnum.ar
  }
  toggleButton():void{
    const lang : LangEnum = this.getLanguage() === 'ar' ? LangEnum.en : LangEnum.ar
    this.setLanguage(lang)
    this.currentLanguage.set(lang)
  }
}
