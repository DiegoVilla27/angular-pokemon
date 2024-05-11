import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Output
} from "@angular/core";

@Directive({
  selector: "[outsideClick]",
  standalone: true
})
export class OutsideClickDirective {
  @Output() clickOutside: EventEmitter<void> = new EventEmitter<void>();

  constructor(private _el: ElementRef) {}

  @HostListener("document:click", ["$event.target"])
  onClick(target: EventTarget) {
    if (!this._el.nativeElement.contains(target)) {
      this.clickOutside.emit();
    }
  }
}
