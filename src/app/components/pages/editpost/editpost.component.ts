import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/Post';
import { ActivatedRoute, Router } from '@angular/router';
import { PostsService } from 'src/app/services/posts.service';
import { MessagesService } from 'src/app/services/messages.service';

@Component({
  selector: 'app-editpost',
  templateUrl: './editpost.component.html',
  styleUrls: ['./editpost.component.css']
})
export class EditpostComponent implements OnInit {

  constructor(private route: ActivatedRoute, 
    private postsService: PostsService, 
    private messagesService: MessagesService,
    private router: Router
  ) { }
  id!: number
  Post!: Post
  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.postsService.getPost(this.id).subscribe((data) => {
      this.Post = data.data;
    })
  }

  formHandler(event: Post){
    
    if (event.title != this.Post.title || event.description != this.Post.description || event.image != this.Post.image) {
      const postData = new FormData()

      postData.append('title', event.title)
      postData.append('description', event.description)
      postData.append('image', event.image)

      this.postsService.editPost(this.id, postData).subscribe(data => {
        this.router.navigate(['./'])
        this.messagesService.add(`Momento ${this.id} editado com sucesso!`)
        
      })
      return
    }
    this.messagesService.add(`Nenhuma alteração, por favor tente novamente!`)
  }
}
