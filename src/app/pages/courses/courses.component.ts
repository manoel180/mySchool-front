import {AfterViewInit, Component } from '@angular/core';
import {MaterialModule} from "../../material/material.module";
import {MatTableDataSource} from "@angular/material/table";
import {Course} from "../../core/model/courses";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {CourseService} from "../../services/course.service";
import {Router, RouterLink} from "@angular/router";
import { MatDialog } from '@angular/material/dialog';
import { CourseDeleteComponent } from './course-delete/course-delete.component';


@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [MaterialModule, RouterLink],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss'
})
export class CoursesComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'action'];
  dataSource: MatTableDataSource<Course> = new MatTableDataSource();



  constructor( private courseService: CourseService,
               private router: Router,
              private dialog: MatDialog ) {
    this.load();
  }

  load() {
    this.courseService.listAll().subscribe({
      next: (res: Course[]) => {
        this.dataSource = new MatTableDataSource(res);
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngAfterViewInit(): void {
  }
  editCourse(course: Course) {
    this.router.navigate(['course', { id: course.id }]);
  }
  openDialog(course: Course): void {
    const dialogRef = this.dialog.open(CourseDeleteComponent, {
      data: {course: course},
      width: '250px'
    });

    dialogRef.afterOpened().subscribe(result => {
      console.log('The dialog was closed');
      if (result !== undefined) {
        this.load();
      }
    });
  }
}
