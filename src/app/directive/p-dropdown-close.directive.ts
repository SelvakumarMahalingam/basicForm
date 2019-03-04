import { Directive, ElementRef, HostListener, Input } from '@angular/core';
declare var $: any;
@Directive({
  selector: '[CloseDropdown]'
})
export class PrimeDropdownClose {
  isClickedDroddown = false;
  constructor(private el: ElementRef) {
  }
  @HostListener('onChange') onBlur() {
    $('.ui-dropdown-panel').attr('style', 'display:none');
  }
  @HostListener('document:click', ['$event']) onDocumentClick(e) {
    if (e.target.parentElement.className.indexOf('ui-dropdown') > -1) {
      this.isClickedDroddown = true;
    }else{
      $('.ui-dropdown-panel').attr('style', 'display:none');
    }
  }
}
