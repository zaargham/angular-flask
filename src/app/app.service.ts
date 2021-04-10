import { Injectable } from '@angular/core';
import { Token } from './token';
import { HttpClient,HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import {  Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AppService {
  private apiServer="https://flask-back-api.herokuapp.com";
  httpOptions={
    header:new HttpHeaders({
      'Content-Type':'application/json'
    })
  }

  constructor(private httpClient:HttpClient) { }

  getAll(): Observable<Token> {
    return this.httpClient.get<Token>(this.apiServer + '/login/')
    .pipe(
      catchError(this.errorHandler)
    )
  }
  errorHandler(error: { error: { message: string; }; status: any; message: any; }) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
 }
 upload(file:any,tkn:String):Observable<any> {
  
  const formData = new FormData(); 
    

  formData.append("file", file, file.name);
    
 
  return this.httpClient.post(this.apiServer+'/protected?token='+tkn,formData)
}
 
}
