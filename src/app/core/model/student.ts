import { Course } from "./courses";

export class Student {

  id!: number;
  name!: string;
  email!: string;
  birthdate!: Date;
  course: Course[] = [];


}
