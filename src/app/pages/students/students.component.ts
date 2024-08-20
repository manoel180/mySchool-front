import {AfterViewInit, Component } from '@angular/core';
import {MaterialModule} from "../../material/material.module";
import {MatTableDataSource} from "@angular/material/table";

import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";

import {Router, RouterLink} from "@angular/router";
import { MatDialog } from '@angular/material/dialog';
import { Student } from '../../core/model/student';
import { StudentService } from '../../services/student.service';
import { StudentDeleteComponent } from './student-delete/student-delete.component';
import { DatePipe } from '@angular/common';
import _moment from 'moment';

const moment = _moment;
@Component({
  selector: 'app-students',
  standalone: true,
  imports: [MaterialModule, RouterLink, DatePipe],

  templateUrl: './students.component.html',
  styleUrl: './students.component.scss'
})
export class StudentsComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'email','birthdate', 'age', 'action'];
  dataSource: MatTableDataSource<Student> = new MatTableDataSource();



  constructor( private studentService: StudentService,
               private router: Router,
              private dialog: MatDialog ) {
    this.load();
  }

  load() {
    this.studentService.listAll().subscribe({
      next: (res: Student[]) => {
        this.dataSource = new MatTableDataSource(res);
      },

    });
  }
  getAge(birthDate: Date ){
    return moment().diff(birthDate, 'years')
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

  editStudent(student: Student) {
    this.router.navigate(['student', { id: student.id }]);
  }
  openDialog(student: Student): void {
    const dialogRef = this.dialog.open(StudentDeleteComponent, {
      data: {student: student},
      width: '250px'
    });

    dialogRef.afterOpened().subscribe(result => {
      if (result !== undefined) {
        this.load();
      }
    });
  }
}
