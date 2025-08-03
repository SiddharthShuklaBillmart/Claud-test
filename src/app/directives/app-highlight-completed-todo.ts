import { Directive, effect, ElementRef, inject, input } from '@angular/core';

@Directive({
  selector: '[appAppHighlightCompletedTodo]'
})
export class AppHighlightCompletedTodo {
  isCompleted = input(false)
  el = inject(ElementRef)
  stylesEffect = effect(()=>{
    if(this.isCompleted()) {
      this.el.nativeElement.style.textDecoration = 'line-through';
      this.el.nativeElement.style.backgroundColor = "grey";
    } else{
      this.el.nativeElement.style.textDecoration = 'none';
      this.el.nativeElement.style.backgroundColor = "#fff";
    }
  })
}
