import {Injectable} from '@angular/core';
import {ICourseService} from './ICourseService';
import {Course} from '../core/model/courses';
import {Observable} from 'rxjs';
import {CRUDService} from './CRUD.service';
import {ConfigAPI} from './config';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CourseService extends CRUDService<Course> implements ICourseService {
  override url: string = ConfigAPI.COURSE;

  constructor(http: HttpClient) {
    super(http);
  }
}
