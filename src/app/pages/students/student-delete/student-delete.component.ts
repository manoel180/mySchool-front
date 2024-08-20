import { Component, inject, model, OnInit } from '@angular/core';
import { MaterialModule } from '../../../material/material.module';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StudentService } from '../../../services/student.service';


@Component({
  selector: 'app-student-delete',
  templateUrl: './student-delete.component.html',
  styleUrls: ['./student-delete.component.css'],
  standalone: true,
  imports: [MaterialModule],
})
export class StudentDeleteComponent implements OnInit {
  readonly dialogRef = inject(MatDialogRef<StudentDeleteComponent>);
  readonly data = inject<any>(MAT_DIALOG_DATA);
  readonly student = model(this.data);

  constructor(private studentService: StudentService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
  }

  delete(){
    const c = this.student();
    this.studentService.delete(c['student'].id).subscribe({
      next: (res: any) => {
        this.snackBar.open('Estudante excluido com sucesso!');
      },
      error: (err: any) => {
        this.snackBar.open('Error ao excluir estudante!');
      },
    });
  }
}
