import { Component, OnInit } from '@angular/core';
import { PostsService, Post } from '../posts.service';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  /**
   * observável da lista de posts
   */
  public posts$:Observable<Post[]>;
  /**
   * string de ultima pesquisa efetuada
   */
  private lastSearch:string;
  constructor(public postsService:PostsService, private activatedRoute:ActivatedRoute) {}

  ngOnInit() {
    //inicializa a lista e string de ultima pesquisa
    this.lastSearch="";
    this.reloadPosts("");
  }

  /**
   * pesquisa por uma string
   * @param event event do form de pesquisa
   */
  public search(event) : void{
    event.preventDefault();
    let actSearch:string=event.target.search.value;
    if(this.lastSearch !== actSearch){
      this.lastSearch=actSearch;
      this.reloadPosts(this.lastSearch);
    }
  }

  /**
   * recarrega o observável com a nova query de pesquisa para alterar a view
   * @param query query de pesquisa
   */
  private reloadPosts(query:string) {
    //pede o novo observável baseado na string de pesquisa (a view irá tratar de subscrever e unsubscrever o observável automáticamente)
    this.posts$=this.postsService.getPosts(query);
  }


}
