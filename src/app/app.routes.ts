import { Routes } from '@angular/router';
import {FullComponent} from "./layouts/full/full.component";
import {CoursesComponent} from "./pages/courses/courses.component";
import {CourseDetailComponent} from "./pages/courses/course-detail/course-detail.component";

export const routes: Routes = [
  {
    path: '',
    component: FullComponent,
    children: [
      {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        loadChildren: () =>
          import('./pages/pages.routes').then((m) => m.PagesRoutes),
      },
      {
        path: 'courses',
        component:  CoursesComponent
      },
      {
        path: 'course',
        component:  CourseDetailComponent
      }


    ]
  }

];
