import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUser } from '../interfaces/user';
import { v4 as uuidv4 } from 'uuid';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

const userApiUrl: string = "http://localhost:4200/api/user";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private formBuilder: FormBuilder) { }

  getUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(userApiUrl);
  }

  getUserById(id: string): Observable<IUser> {
    return this.http.get<IUser>(`${userApiUrl}/${id}`);
  }

  createUser(data: any): Observable<IUser> {
    let { email, firstName, lastName } = data;
    let newId = uuidv4();
    let newUser: IUser = {
      id: newId,
      email: email,
      firstName: firstName,
      lastName: lastName
    };
    return this.http.post<IUser>(userApiUrl, newUser);
  }

  updateUser(id: string, data: any): Observable<IUser> {
    let { email, firstName, lastName } = data;
    let updatedUser: IUser = {
      id: id,
      email: email,
      firstName: firstName,
      lastName: lastName
    };
    return this.http.patch<IUser>(`${userApiUrl}/${id}`, updatedUser);
  }

  deleteUser(id: string): Observable<IUser> {
    return this.http.delete<IUser>(`${userApiUrl}/${id}`);
  }

  // TODO validate more
  userForm(): FormGroup {
    return this.formBuilder.group({
      email: new FormControl("", [Validators.required, Validators.email]),
      firstName: ["", { validators: [Validators.required, Validators.maxLength(50)]}],
      lastName: ["", { validators: [Validators.required, Validators.maxLength(50)]}]
    })
  }
}