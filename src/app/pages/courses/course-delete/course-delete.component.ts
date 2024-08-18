import { Component, inject, model, OnInit, signal } from '@angular/core';
import { MaterialModule } from '../../../material/material.module';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CourseService } from '../../../services/course.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Course } from '../../../core/model/courses';

@Component({
  selector: 'app-course-delete',
  templateUrl: './course-delete.component.html',
  styleUrls: ['./course-delete.component.css'],
  standalone: true,
  imports: [MaterialModule],
})
export class CourseDeleteComponent implements OnInit {
  readonly dialogRef = inject(MatDialogRef<CourseDeleteComponent>);
  readonly data = inject<any>(MAT_DIALOG_DATA);
  readonly course = model(this.data);

  constructor(private courseService: CourseService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
  }

  delete(){
    const c = this.course();
    this.courseService.delete(c['course'].id).subscribe({
      next: (res: any) => {
        this.snackBar.open('Curso excluido com sucesso!');
      },
      error: (err: any) => {
        this.snackBar.open('Error ao excluir curso!');
      },
    });
  }
}
