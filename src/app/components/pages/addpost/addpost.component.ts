import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/Post';
import { PostsService } from 'src/app/services/posts.service';
import { Router } from '@angular/router';
import { MessagesService } from 'src/app/services/messages.service';

@Component({
  selector: 'app-addpost',
  templateUrl: './addpost.component.html',
  styleUrls: ['./addpost.component.css']
})
export class AddpostComponent implements OnInit {

  constructor(private postsService: PostsService, private router: Router, private messagesService: MessagesService) { }

  ngOnInit(): void {
  }

  async formHandler(event: Post) {
    const postData = new FormData()

    postData.append('title', event.title)
    postData.append('description', event.description)
    postData.append('image', event.image)

    await this.postsService.addPost(postData).subscribe(data => {
      this.router.navigate(['./'])
      this.messagesService.add('Publicado com sucesso')
    }
    );  
    
  }
}
