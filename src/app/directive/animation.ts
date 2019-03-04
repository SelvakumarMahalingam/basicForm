/**
 * Created BY HMSPL
 * Modified By  06/12/2018
 * Modified Description : Create Different Animation Functions
 */

import { animate, query, stagger, state, style, transition, trigger } from '@angular/animations';

export const delay = trigger('listStagger', [
    transition('* <=> *', [
      query(
        ':enter',
        [
          style({ opacity: 0, transform: 'translateY(-15px)' }),
          stagger(
            '50ms',
            animate(
              '550ms ease-out',
              style({ opacity: 1, transform: 'translateY(0px)' })
            )
          )
        ],
        { optional: true }
      ),
      query(':leave', animate('50ms', style({ opacity: 0 })), {
        optional: true
      })
    ])
  ]);

export const fade = trigger('fade-in-out', [
  transition('void => *', [
    style({ opacity: 0 }),
    animate('0.4s ease-in', style({ opacity: 1 }))
  ]),
  transition('* => void', [
    style({ opacity: 1 }),
    animate('0.4s ease-out', style({ opacity: 0 }))
  ])
]);
export const fadeSpeed = trigger('fade-speed', [
  transition('void => *', [
    style({ opacity: 0 }),
    animate('0.2s ease-in', style({ opacity: 1 }))
  ]),
  transition('* => void', [
    style({ opacity: 1 }),
    animate('200ms ease-out', style({ opacity: 0 }))
  ])
]);
export const fade_enter = trigger('fade-in', [
  transition('void => *', [
    style({ opacity: 0 }),
    animate('0.4s ease-in', style({ opacity: 1 }))
  ])
]);

export const fcScale = trigger('scale-in', [
  transition('void => *', [
    style({ transform: 'translateY(-100%)' }),
    animate('0.6s ease-in', style({ transform: 'translateY(0)' }))
  ])
]);

export const slideUpDown = [
  trigger('slideUpDwn', [
    transition('void => *', [style({ opacity: 0, transform: 'translateY(-100%)' }),
    animate('300ms', style({ opacity: 1, transform: 'translateY(0)' }))
    ]),
    transition('* => void', [style({ opacity: 1, transform: 'translateY(0)' }),
    animate('300ms', style({ opacity: 0, transform: 'translateY(100%)' }))
    ])
  ])
];

export const cusSlideLeft = trigger('ccSildeLeftRight', [
  transition('void => *', [
    style({ transform: 'translateX(100%)', opacity: 0 }),
    animate('0.3s ease-in', style({ transform: 'translateX(0)', opacity: 1 }))
  ]),
  transition('* => void', [
    style({ transform: 'translateX(0)', opacity: 1 }),
    animate('0.3s ease-out', style({ transform: 'translateX(-100%)', opacity: 0 }))
  ])
]);

export const cusSlideLeftRight = trigger('cc1SildeLeftRight', [
  state('in', style({ transform: 'translateX(0)', opacity: 1 })),
  transition('close=>open', [
    style({ transform: 'translateX(100%)', opacity: 0 }),
    animate('0.3s ease-in', style({ transform: 'translateX(0)', opacity: 1 }))
  ]),
  transition('open=>close', [
    style({ transform: 'translateX(0)', opacity: 1 }),
    animate('0.3s ease-out', style({ transform: 'translateX(-100%)', opacity: 0 }))
  ])
]);


export const downToUp = trigger('scaleUp', [
  transition('void => *', [style({ opacity: '0', transform: 'translateY(20px)' }),
  animate('0.3s ease-in', style({ opacity: 1, transform: 'translateY(0)' }))]),
  transition('* => void', [style({ opacity: '1' }),
  animate('0.3s ease-out', style({ opacity: 0 }))])
]);
export const leftToRight = trigger('leftToRight', [
  transition('void => *', [style({ opacity: '0', transform: 'translateY(-10px)' }),
  animate('0.3s ease-in', style({ opacity: 1, transform: 'translateY(0)' }))]),
  transition('* => void', [style({ opacity: '1' }),
  animate('0.3s ease-out', style({ opacity: 0 }))])
]);


export const RouterAnimation = trigger('routerAnimation', [
  transition('close=>open', [
    style({ opacity: 0 }),
    animate('0.4s ease-in', style({ opacity: 1 }))
  ]),
  transition('open=>close', [
    style({ opacity: 1 }),
    animate('0.4s ease-out', style({ opacity: 0 }))
  ])
]);

export const listAnimation = trigger('listView', [
  transition('void => *', [style({ opacity: 0, transform: 'translateY(-110px)' }),
  animate('0.5s linear', style({ opacity: 1, transform: 'translateY(0px)' }))]),
  transition('* => void', [style({ opacity: 1, transform: 'translateY(0)' }),
  animate('500ms ease-in-out', style({ opacity: 0, transform: 'translateY(100%)' }))
  ])
]);

export const listanim = trigger('list-in', [
  transition('void => *', [
    query('.listcontainer', style({ transform: 'translateY(-5em)', opacity: 0 }), { optional: true }),
    query('.listcontainer', stagger('0.2s', [
      animate('0.2s .1s linear', style({ opacity: 1, transform: 'translateY(0)' }))
    ]), { optional: true }),
  ])
]);
export const listanimstate = trigger('list-in-state', [
  transition('void => *', [
    query('.listcontainer1', style({ transform: 'translateY(-2em)', opacity: 0 }), { optional: true }),
    query('.listcontainer1', stagger('0.05s', [
      animate('0.1s .1s linear', style({ opacity: 1, transform: 'translateY(0)' }))
    ]), { optional: true }),
  ])
]);
export const dashcard = trigger('card-left-in', [
  transition('void => *', [
    query('.dashcontainer', style({ transform: 'translateY(-3em)', opacity: 0 }), { optional: true }),
    query('.dashcontainer', stagger('0.2s', [
      animate('0.3s .1s linear', style({ opacity: 1, transform: 'translateY(0)' }))
    ]), { optional: true })
  ])
]);
export const rightanim = trigger('card-right-in', [
  transition('void => *', [
    query('.rightcardanim', style({ transform: 'translateX(-2em)', opacity: 0 }), { optional: true }),
    query('.rightcardanim', stagger('.2s', [
      animate('0.2s linear', style({ opacity: 1, transform: 'translateY(0)' }))
    ]), { optional: true })
  ])
]);


export const pdfthumanim = trigger('show-in', [
  transition('void => *', [style({ opacity: 0, transform: 'translateY(3em)' }),
  animate('0.3s linear', style({ opacity: 1, transform: 'translateY(0)' }))
  ]),

]);
export const popoverstate = trigger('popover', [
  transition('close=>open', [style({ opacity: '0' }),
  animate('0.2s ease-in', style({ opacity: 1 }))]),
  transition('open=>close', [style({ opacity: '1' }),
  animate('0.2s ease-out', style({ opacity: 0 }))])
]);

export const fsdetailanim1x = trigger('dtTop1x', [
  transition('void => *', [style({ opacity: 0, transform: 'translateY(-3em)' }),
  animate('0.3s ease-in', style({ opacity: 1, transform: 'translateY(0)' }))
  ])

]);
export const fsdetailanim2x = trigger('dtTop2x', [
  transition('void => *', [style({ opacity: 0, transform: 'translateY(3em)' }),
  animate('0.3s ease-in', style({ opacity: 1, transform: 'translateY(0)' }))
  ])

]);

export const fsdetailanim3x = trigger('dtTop3x', [
  transition('void => *', [style({ opacity: 0, transform: 'translateX(-3em)' }),
  animate('0.3s ease-in', style({ opacity: 1, transform: 'translateX(0)' }))
  ])

]);
export const fsdetailanim4x = trigger('dtTop4x', [
  transition('void => *', [style({ opacity: 0, transform: 'translateX(3em)' }),
  animate('0.3s ease-in', style({ opacity: 1, transform: 'translateX(0)' }))
  ])

]);
