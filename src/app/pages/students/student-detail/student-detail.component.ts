import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Course } from '../../../core/model/courses';
import { CourseService } from '../../../services/course.service';
import {MatSnackBar} from "@angular/material/snack-bar";
import {MaterialModule} from "../../../material/material.module";
import { StudentService } from '../../../services/student.service';
import { Student } from '../../../core/model/student';
import {provideMomentDateAdapter} from '@angular/material-moment-adapter';
import { Location } from '@angular/common';

export const MY_FORMATS = {
  parse: {
    dateInput: ['YYYY-MM-DD'],
  },
  display: {
    dateInput: 'DD-MM-YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'L',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-student-detail',
  standalone: true,
  imports: [MaterialModule, FormsModule,
    ReactiveFormsModule],
    providers: [provideMomentDateAdapter(MY_FORMATS)],
  templateUrl: './student-detail.component.html',
  styleUrl: './student-detail.component.scss'
})
export class StudentDetailComponent implements OnInit {

  form!: FormGroup;

  public selectedId!: number;
  courses: Course[] = [];
  student: Student = new Student();


constructor(private router: Router,
  private route: ActivatedRoute,
  private fb: FormBuilder,
            private snackBar: MatSnackBar,
  private courseService: CourseService,
  private studentService: StudentService,
  private location: Location
)
  {}
  ngOnInit() {

    this.createForm();
    this.updateForm();
    this.load();
  }
  load() {
    this.courseService.listAll().subscribe({
      next: (res: Course[]) => {
        this.courses = res;
      },

    });
  }
  createForm() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      birthdate: ['', Validators.required],
      course: ['', Validators.required],
    });
  }
  updateForm()
  {
    this.selectedId = +this.route.snapshot.paramMap.get('id')!;
    this.studentService.getId(this.selectedId)
    .subscribe({
      next: (res: Student) => {
      this.student = res;
      if (this.student) {
        this.form.patchValue(this.student);
      } else {
          this.form.reset();
      }
    }});

  }
  cancel() {
    this.location.back();
  }
  save(){
    this.form.controls['birthdate'].setValue(this.form.controls['birthdate'].value.format('YYYY-MM-DD'))
    if(this.student.id){
      this.student = Object.assign(this.student, this.form.value)

      this.studentService.edit(this.student, this.student.id)
      .subscribe({
        next: (res: Student) => {
          this.snackBar.open('Estudante salvo com sucesso!');
          this.router.navigate(['students']);
      },
      error: (err: any) => {
        this.snackBar.open('Erro ao salvar o estudante');
      }});
    }else{
      this.studentService.save(this.form.value)
      .subscribe({
        next: (res: Student) => {
          this.snackBar.open('Estudante salvo com sucesso!');
          this.router.navigate(['students']);
      },
      error: (err: any) => {
        this.snackBar.open('Erro ao salvar o estudante');
      }});
    }
  }
}
