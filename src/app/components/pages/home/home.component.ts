import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/Post';
import { PostsService } from 'src/app/services/posts.service';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  faSearch = faSearch
  all_Posts?: Post[] = []
  filtered_Posts?: Post[] = []
  Url = environment.baseUrl;
  space: String = '  '
  constructor(private postService: PostsService) { }
  

  ngOnInit(): void {
    this.postService.getPosts().subscribe(itens => {
      
      const Itens = itens.data;
      
      Itens.map((item) => {
        item.created_at = new Date(item.created_at!).toLocaleDateString('pt-BR');
      })

      this.all_Posts = Itens
      this.filtered_Posts = Itens;

    })
  }

  searchPost(e: Event){
    const target = e.target as HTMLInputElement
    const Value = target.value
    
    this.filtered_Posts = this.all_Posts?.filter((item: Post) => 
      item.title.toLocaleLowerCase().indexOf(Value.toLocaleLowerCase()) > -1
    )
  }
}
