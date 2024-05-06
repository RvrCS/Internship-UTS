
import {
  trigger,
  transition,
  style,
  query,
  group,
  animateChild,
  animate,
  keyframes,
} from '@angular/animations';
import { Constantes } from './constantes';

export interface IMenuItem {
  select: boolean;
  id: string;
  icon?: string;
  label: string;
  to?: string;
  newWindow?: boolean;
  subs?: IMenuItem[];
  containSub: boolean;
  parent?: number;
  img?: string;
}

const data: IMenuItem[] = Constantes.PageClients ? MenuCliente() : MenuUsuario();
export default data;

export function MenuCliente() {
  return [
    {
      id: 'sales-start',
      icon: 'iconsminds-air-balloon-1',
      label: 'Inicio',
      img: 'assets/icons/Inicio.png',
      select: true,
      containSub: false,
      to: '/app/start',
      subs: []
    },

    {
      id: 'sales-misdatos',
      icon: 'iconsminds-air-balloon-1',
      label: 'Mis datos',
      img: 'assets/icons/Configuracion.png',
      select: true,
      containSub: false,
      to: '/app/misdatos',
      subs: []
    },

  ];
}

export function MenuUsuario() {
  return [
    {
      id: 'sales-start',
      icon: 'iconsminds-air-balloon-1',
      label: 'Inicio',
      img: 'assets/icons/Inicio.png',
      select: true,
      containSub: false,
      to: '/app/start',
      subs: []
    }
  ];
}


export class MenuItem {
  selected: boolean;
  idMenu: string;
  labels: string;
  menus?: MenuItem[];
  containSubs: boolean;
  icono: string;
  img?: string;
}

export function ConversorMenu(array: IMenuItem[]) {

  let list: MenuItem[] = [];
  array.forEach(menu => {

    const model = new MenuItem();
    model.idMenu = menu.id;
    model.labels = menu.label;
    model.selected = menu.select;
    model.containSubs = menu.containSub;
    model.icono = menu.icon;
    model.img = menu.img;

    if (menu.subs) {
      menu.subs.forEach(sub => {
        const submodel = new MenuItem();
        submodel.idMenu = sub.id;
        submodel.labels = sub.label;
        submodel.selected = sub.select;
        submodel.containSubs = sub.containSub;
        submodel.icono = sub.icon;
        if (sub.subs) {
          sub.subs.forEach(deepsub => {
            const deepsubmodel = new MenuItem();
            deepsubmodel.idMenu = deepsub.id;
            deepsubmodel.labels = deepsub.label;
            deepsubmodel.selected = deepsub.select;
            deepsubmodel.containSubs = deepsub.containSub;
            deepsubmodel.icono = deepsub.icon;
            if (!submodel.menus) submodel.menus = [];
            submodel.menus.push(deepsubmodel);
          });
        }
        if (!model.menus) model.menus = [];
        model.menus.push(submodel);
      });
    }

    list.push(model);
  });
  return list;
}


// Basic

export const fader =
  trigger('routeAnimations', [
    transition('* <=> *', [
      query(':enter, :leave', [
        style({
          position: 'absolute',
          left: 0,
          width: '100%',
          opacity: 0,
          transform: 'scale(0) translateY(100%)',
        }),
      ]),
      query(':enter', [
        animate('600ms ease', style({ opacity: 1, transform: 'scale(1) translateY(0)' })),
      ])
    ]),
  ]);


// Positioned

export const slider =
  trigger('routeAnimations', [
    transition('* => isLeft', slideTo('left')),
    transition('* => isRight', slideTo('right')),
    transition('isRight => *', slideTo('left')),
    transition('isLeft => *', slideTo('right'))
  ]);


export const transformer =
  trigger('routeAnimations', [
    transition('* => isLeft', translateTo({ x: -100, y: -100, rotate: -720 })),
    transition('* => isRight', translateTo({ x: 100, y: -100, rotate: 90 })),
    transition('isRight => *', translateTo({ x: -100, y: -100, rotate: 360 })),
    transition('isLeft => *', translateTo({ x: 100, y: -100, rotate: -360 }))
  ]);


function slideTo(direction) {
  const optional = { optional: true };
  return [
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        [direction]: 0,
        width: '100%'
      })
    ], optional),
    query(':enter', [
      style({ [direction]: '-100%' })
    ]),
    group([
      query(':leave', [
        animate('600ms ease', style({ [direction]: '100%' }))
      ], optional),
      query(':enter', [
        animate('600ms ease', style({ [direction]: '0%' }))
      ])
    ]),
    // Normalize the page style... Might not be necessary

    // Required only if you have child animations on the page
    // query(':leave', animateChild()),
    // query(':enter', animateChild()),
  ];
}


function translateTo({ x = 100, y = 0, rotate = 0 }) {
  const optional = { optional: true };
  return [
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%'
      })
    ], optional),
    query(':enter', [
      style({ transform: `translate(${x}%, ${y}%) rotate(${rotate}deg)` })
    ]),
    group([
      query(':leave', [
        animate('600ms ease-out', style({ transform: `translate(${x}%, ${y}%) rotate(${rotate}deg)` }))
      ], optional),
      query(':enter', [
        animate('600ms ease-out', style({ transform: `translate(0, 0) rotate(0)` }))
      ])
    ]),
  ];
}


// Keyframes

export const stepper =
  trigger('routeAnimations', [
    transition('* <=> *', [
      query(':enter, :leave', [
        style({
          position: 'absolute',
          left: 0,
          width: '100%',
        }),
      ]),
      group([
        query(':enter', [
          animate('2000ms ease', keyframes([
            style({ transform: 'scale(0) translateX(100%)', offset: 0 }),
            style({ transform: 'scale(0.5) translateX(25%)', offset: 0.3 }),
            style({ transform: 'scale(1) translateX(0%)', offset: 1 }),
          ])),
        ]),
        query(':leave', [
          animate('2000ms ease', keyframes([
            style({ transform: 'scale(1)', offset: 0 }),
            style({ transform: 'scale(0.5) translateX(-25%) rotate(0)', offset: 0.35 }),
            style({ opacity: 0, transform: 'translateX(-50%) rotate(-180deg) scale(6)', offset: 1 }),
          ])),
        ])
      ]),
    ])

  ]);


export function GeneradorMenu(menuItems: IMenuItem[]) {

  menuItems.forEach(menu => {
    if (menu.subs) {
      menu.subs.forEach(sub => {
        if (sub.subs) {
          sub.subs.forEach(deepsub => {

          });
        }

      });
    }
  });

  return menuItems;
}


