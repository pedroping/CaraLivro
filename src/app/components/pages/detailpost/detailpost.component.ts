import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormControlDirective, FormGroupDirective } from '@angular/forms';

import { Post } from 'src/app/Post';
import { Comment } from 'src/app/Comment';

import { PostsService } from 'src/app/services/posts.service';
import { environment } from 'src/environments/environment';
import { faTimes, faEdit, faHome} from '@fortawesome/free-solid-svg-icons';
import { MessagesService } from 'src/app/services/messages.service';
import { CommentService } from 'src/app/services/comment.service';

@Component({
  selector: 'app-detailpost',
  templateUrl: './detailpost.component.html',
  styleUrls: ['./detailpost.component.css']
})
export class DetailpostComponent implements OnInit {

  constructor(private route: ActivatedRoute, 
    private postsService: PostsService, 
    private messagesService: MessagesService,
    private router: Router,
    private commentService: CommentService
    ) { }
  
  commentForm!: FormGroup

  faTimes = faTimes
  faEdit = faEdit
  faHome = faHome
  
  id!: number
  Post!: Post
  Url = environment.baseUrl;

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.postsService.getPost(this.id).subscribe((data) => {
      this.Post = data.data;
    })

    this.commentForm = new FormGroup({
      text: new FormControl("", [Validators.required]),
      username: new FormControl("", [Validators.required])
    })
  }

  get text(){
    return this.commentForm.get('text')
  }

  get username(){
    return this.commentForm.get('username')
  }

  async removePost(id: number){
    await this.postsService.removePost(id).subscribe(data => {
      this.router.navigate(['./'])
      this.messagesService.add('Excluido com sucesso')
    })
  }
  
  async onSubmit(formDirective: FormGroupDirective){

    if(this.commentForm.invalid)
      return

    const data: Comment = this.commentForm.value

    data.momentId = Number(this.Post.id)

    await this.commentService.addComment(data).subscribe(d => {
      
      this.Post.comments?.push(d.data);
      this.messagesService.add("Comentario adicionado");
      
      this.commentForm.reset()
      formDirective.resetForm()
    } )
  }
  

}
