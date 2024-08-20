import {Injectable} from '@angular/core';

import {CRUDService} from './CRUD.service';
import {ConfigAPI} from './config';
import {HttpClient} from '@angular/common/http';
import { Student } from '../core/model/student';
import { IStudentService } from './IStudentService';

@Injectable({
  providedIn: 'root'
})
export class StudentService extends CRUDService<Student> implements IStudentService {
  override url: string = ConfigAPI.STUDENT;

  constructor(http: HttpClient) {
    super(http);
  }
}
