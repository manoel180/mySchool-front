import { Routes } from '@angular/router';
import {FullComponent} from "./layouts/full/full.component";
import {CoursesComponent} from "./pages/courses/courses.component";
import {CourseDetailComponent} from "./pages/courses/course-detail/course-detail.component";
import { BlankComponent } from './layouts/blank/blank.component';
import { StudentsComponent } from './pages/students/students.component';
import { StudentDetailComponent } from './pages/students/student-detail/student-detail.component';
import { authGuard } from './core/auth/auth.guard';


export const routes: Routes = [
  {
    path: '',
    component: BlankComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./pages/authentication/authentication.routes').then(
            (m) => m.AuthenticationRoutes
          ),
      },
    ],
  },
  {
    path: '',
    component: FullComponent,
    canActivate: [authGuard],
    runGuardsAndResolvers: 'always',
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
        component:  CoursesComponent,
        canActivate: [authGuard],
        runGuardsAndResolvers: 'always',
      },
      {
        path: 'course',
        component:  CourseDetailComponent
      },

      {
        path: 'students',
        component:  StudentsComponent
      },
      {
        path: 'student',
        component:  StudentDetailComponent
      },


    ]
  }

];
