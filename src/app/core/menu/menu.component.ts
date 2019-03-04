import { Component } from '@angular/core';
import { MenuService } from './menu.service';

import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
//  <img  class="menuIcon pl-5"
              //  src="../../assets/images/caterpillar/{{menuitem.img}}{{currentUrl==menuitem.state ?'-'+ currentUrl:''}}.png" alt="">
         
@Component({
  selector: 'app-menu',
  template: `
    <mat-nav-list appAccordion class="navigation">
      <mat-list-item appAccordionLink *ngFor="let menuitem of menuService.getAll();let i = index" group="{{menuitem.state}}">
        <a appAccordionToggle (click)="currIndex = i;currentUrl=menuitem.state"   class="relative" routerLinkActive="active-links"
          [routerLink]="['/', menuitem.state]"    *ngIf="menuitem.type === 'link'">
              <div class="flex wper-10"><img  class="menuIcon"    src="../../assets/images/{{menuitem.img}}.png" alt=""></div>
          <span  style="" class="pl-15 txt-syle">{{ menuitem.name | translate }}</span>
          <span fxFlex></span>
          <span class="menu-badge mat-{{ badge.type }}" *ngFor="let badge of menuitem.badge">{{ badge.value }}</span>
        </a>
        <a appAccordionToggle class="relative" href="{{menuitem.state}}" *ngIf="menuitem.type === 'extLink'">
          <mat-icon>{{ menuitem.icon }}</mat-icon>
          <span>{{ menuitem.name | translate }}</span>
          <span fxFlex></span>
          <span class="menu-badge mat-{{ badge.type }}" *ngFor="let badge of menuitem.badge">{{ badge.value }}</span>
        </a>
        <a appAccordionToggle class="relative" href="{{menuitem.state}}"  *ngIf="menuitem.type === 'extTabLink'">
          <mat-icon>{{ menuitem.icon }}</mat-icon>
          <span>{{ menuitem.name | translate }}</span>
          <span fxFlex></span>
          <span class="menu-badge mat-{{ badge.type }}" *ngFor="let badge of menuitem.badge">{{ badge.value }}</span>
        </a>
        <a appAccordionToggle class="relative" href="javascript:;" *ngIf="menuitem.type === 'sub'">
          <mat-icon>{{ menuitem.icon }}</mat-icon>
          <span>{{ menuitem.name | translate }}</span>
          <span fxFlex></span>
          <span class="menu-badge mat-{{ badge.type }}" *ngFor="let badge of menuitem.badge">{{ badge.value }}</span>
          <mat-icon class="menu-caret">arrow_drop_down</mat-icon>
        </a>
        <mat-nav-list class="sub-menu" *ngIf="menuitem.type === 'sub'">
          <mat-list-item *ngFor="let childitem of menuitem.children" routerLinkActive="open">
            <a [routerLink]="['/', menuitem.state, childitem.state ]" class="relative">{{ childitem.name | translate }}</a>
          </mat-list-item>
        </mat-nav-list>
      </mat-list-item>
    </mat-nav-list>`,
  providers: [MenuService]
})
export class MenuComponent {
  currentLang = 'en';
  public currIndex: any;
  public currentUrl: any;
  constructor(
    public menuService: MenuService,
    public translate: TranslateService,
    private router: Router) {
    this.currentUrl = this.router.url;
    this.currentUrl = this.currentUrl.split('/')[1];
  }
  addMenuItem(): void {
    this.menuService.add({
      state: 'menu',
      name: 'MENU',
      type: 'sub',
      icon: 'trending_flat',
      children: [
        { state: 'menu', name: 'MENU' },
        { state: 'timeline', name: 'MENU' }
      ]
    });
  }
  setCurrIndex(value) {
    console.log(value);
  }
}
