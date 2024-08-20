import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Course } from '../../../core/model/courses';
import { CourseService } from '../../../services/course.service';
import {MatSnackBar} from "@angular/material/snack-bar";
import {MaterialModule} from "../../../material/material.module";


@Component({
  selector: 'app-course-detail',
  standalone: true,
  imports: [MaterialModule, FormsModule,
    ReactiveFormsModule],
  templateUrl: './course-detail.component.html',
  styleUrl: './course-detail.component.scss'
})
export class CourseDetailComponent implements OnInit {

  form!: FormGroup;

  public selectedId!: number;
  course: Course = new Course();


constructor(private router: Router,
  private route: ActivatedRoute,
  private fb: FormBuilder,
            private snackBar: MatSnackBar,
  private courseService: CourseService)
  {}
  ngOnInit() {

    this.createForm();
    this.updateForm();
  }
  createForm() {
    this.form = this.fb.group({
      name: ['', Validators.required],
    });
  }
  updateForm()
  {
    this.selectedId = +this.route.snapshot.paramMap.get('id')!;
    this.courseService.getId(this.selectedId)
    .subscribe({
      next: (res: Course) => {
      this.course = res;
      if (this.course) {
        this.form.patchValue(this.course);
      } else {
          this.form.reset();
      }
    }});

  }
  save(){

    if(this.course.id){
      this.course = Object.assign(this.course, this.form.value)

      this.courseService.edit(this.course, this.course.id)
      .subscribe({
        next: (res: Course) => {
          this.snackBar.open('Successful',  'Curso salvo com sucesso!');
          this.router.navigate(['course']);
      },
      error: (err: any) => {
        this.snackBar.open('Erro',  err);
      }});
    }else{

      this.courseService.save(this.form.value)
      .subscribe({
        next: (res: Course) => {
          this.snackBar.open('Successful',  'Curso salvo com sucesso!');
          this.router.navigate(['products']);
      },
      error: (err: any) => {
        this.snackBar.open('Erro',  err);
      }});
    }
  }
}
