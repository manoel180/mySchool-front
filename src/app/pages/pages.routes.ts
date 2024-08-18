import { Routes } from '@angular/router';
import { StarterComponent } from './starter/starter.component';
import {CoursesComponent} from "./courses/courses.component";

export const PagesRoutes: Routes = [
  {
    path: '',
    component: StarterComponent,
    data: {
      title: 'Home',
      urls: [
        { title: 'Home', url: '/home' },
      ],
    },
  },
];
