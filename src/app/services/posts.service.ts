import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Response } from '../Response';

import { Post } from '../Post';
import { environment } from 'src/environments/environment';
import { MessagesService } from './messages.service';
@Injectable({
  providedIn: 'root'
})
export class PostsService {

  private baseUrl = environment.baseUrl;
  private Url = `${this.baseUrl}api/moments`

  constructor(private http: HttpClient) { }

  addPost(formData: FormData): Observable<FormData>{
    return this.http.post<FormData>(this.Url, formData);
  }

  getPosts(): Observable<Response<Post[]>>{
    return this.http.get<Response<Post[]>>(this.Url);
  }

  getPost(id: number): Observable<Response<Post>>{
    const newUrl = `${this.Url}/${id}`
    return this.http.get<Response<Post>>(newUrl);
  }

  editPost(id: number, formData: FormData): Observable<FormData>{
    const newUrl = `${this.Url}/${id}`
    return this.http.put<FormData>(newUrl, formData);
  }
  removePost(id: number){
    const newUrl = `${this.Url}/${id}`
    return this.http.delete(newUrl);
  }

  
}
