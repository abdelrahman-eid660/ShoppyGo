import { Component, CUSTOM_ELEMENTS_SCHEMA, effect, ElementRef, inject , ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../../../core/service/language.service';
import { TranslocoPipe } from '@jsverse/transloco';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-footer',
  standalone: true,
  imports: [CommonModule , TranslocoPipe , RouterLink],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './user-footer.html',
  styleUrl: './user-footer.css'
})
export class UserFooter {
  @ViewChild('swiperRef') swiperRef!: ElementRef;
  readonly langService = inject(LanguageService);
  items = [
    {label : "Home Appliances" , img : "/assets/imgs/categories/1.png"},
    {label : "Electronics" , img : "/assets/imgs/categories/2.png"},
    {label : "Sports" , img : "/assets/imgs/categories/3.png"},
    {label : "Entertainment" , img : "/assets/imgs/categories/4.png"},
    {label : "Supplements" , img : "/assets/imgs/categories/5.png"},
    {label : "Super Market" , img : "/assets/imgs/categories/6.png"},
    {label : "Furniture" , img : "/assets/imgs/categories/7.png"},
    {label : "Clothes" , img : "/assets/imgs/categories/8.png"},
  ];

  constructor(){
    effect(()=>{
      const currentLang = this.langService.currentLanguage()
      const dir = currentLang === 'ar' ? 'rtl' : 'ltr'
      if (this.swiperRef?.nativeElement?.swiper) {
        const swiper = this.swiperRef?.nativeElement?.swiper
        swiper.changeLanguageDirection(dir)
        swiper.update()
      }
    })
  }
  nextSlide() {
    this.swiperRef.nativeElement.swiper.slideNext();
  }
  prevSlide() {
    this.swiperRef.nativeElement.swiper.slidePrev();
  }
}
