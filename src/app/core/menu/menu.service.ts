import { Injectable } from '@angular/core';

export interface BadgeItem {
  type: string;
  value: string;
}

export interface ChildrenItems {
  state: string;
  name: string;
  type?: string;
}

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
  badge?: BadgeItem[];
  children?: ChildrenItems[];
}

const MENUITEMS = [
  // {
  //   state: 'dashboard',
  //   name: 'dashboard',
  //   type: 'link',
  //   icon: 'dashboard.png',
  //   img: 'dashboard'
  // }
  {
    state: 'account',
    name: 'Account',
    type: 'link',
    icon: 'local_library',
    img: 'partsmaster'
  },
  {
    state: 'employee-management',
    name: 'employee Management',
    type: 'link',
    icon: 'local_library',
    img: 'OperatorMaster'
  },
  {
    state: 'group-management',
    name: 'Group Management',
    type: 'link',
    icon: 'local_library',
    img: 'EquipmentMapping'
  },
  {
      state: 'program-management',
      name: 'Program Management',
      type: 'link',
      icon: 'local_library',
      img: 'EquipmentMapping'
    },
    {
      state: 'profile-management',
      name: 'Profile Management',
      type: 'link',
      icon: 'local_library',
      img: 'EquipmentMapping'
    }
];

@Injectable()
export class MenuService {
  getAll(): Menu[] {
    return MENUITEMS;
  }

  add(menu) {
    MENUITEMS.push(menu);
  }
}
