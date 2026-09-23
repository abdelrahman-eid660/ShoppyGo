import { AfterViewInit, Component, HostListener, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import Aos from 'aos'
import { NgxSpinnerComponent } from 'ngx-spinner';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet , NgxSpinnerComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements AfterViewInit {
  protected readonly title = signal('ShoppyGo');
  private readonly scrollThredshold = 300

  isVisible = signal<boolean>(false)

  @HostListener('window:scroll')
  onWindowScroll():void{
    const verticalOffset = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0
    this.isVisible.set(verticalOffset > this.scrollThredshold)
  }

  scrollToTop():void{
    window.scrollTo({behavior : 'smooth' , top : 0})
  }

  ngAfterViewInit():void{
    Aos.init({
      duration:1000,
      once:true,
      offset:100
    })
  }
}
