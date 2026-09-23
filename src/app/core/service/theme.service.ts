import { Injectable, signal } from "@angular/core";
import { ThemeEnum } from "../../shared/models/global.model";

@Injectable({
  providedIn : 'root'
})
export class ThemeService {
  private readonly storageKey = 'shoppygo-theme'
  readonly currentTheme = signal<ThemeEnum>(this.getSavedTheme())

  private getSavedTheme(): ThemeEnum {
    const theme = localStorage.getItem(this.storageKey)
    return theme === ThemeEnum.dark ? ThemeEnum.dark : ThemeEnum.light
  }
  private applyTheme(theme : ThemeEnum):void{
    const html = document.documentElement
    html.classList.remove('light-theme' , 'dark-theme')
    html.classList.add(`${theme}-theme`)
  }
  initialize():void{
    this.applyTheme(this.currentTheme())
  }
  toggleTheme():void {
    const nextTheme = this.currentTheme() === ThemeEnum.light ? ThemeEnum.dark : ThemeEnum.light
    this.setTheme(nextTheme)
  }
  setTheme(theme : ThemeEnum):void{
    this.currentTheme.set(theme)
    localStorage.setItem(this.storageKey,theme)
    this.applyTheme(theme)
  }
}
