import { trigger, style, transition, animate } from '@angular/animations';

export const fadeInAnimation = trigger('fadeInAnimation', [
  transition(':enter', [
    style({ opacity: 0, transform: 'translateY(20px)' }),
    animate('0.5s ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
  ]),
]);
