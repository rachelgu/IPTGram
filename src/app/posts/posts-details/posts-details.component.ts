import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Post, PostsService, PostComment } from 'src/app/posts.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-posts-details',
  templateUrl: './posts-details.component.html',
  styleUrls: ['./posts-details.component.css']
})
export class PostsDetailsComponent implements OnInit {
  /**
   * dados de um post
   */
  public post:Post;
  /**
   * lista de comentários de um post
   */
  public comments: PostComment[];
  constructor(public postsService: PostsService, public activeRoute: ActivatedRoute, private router:Router) { }

  ngOnInit() {
    this.comments=[];
    //pede o post ao servidor
    this.postsService.getPost(
      parseInt(this.activeRoute.snapshot.paramMap.get('id'),10) //id passado por url
    ).subscribe((post: Post) => {
      //caso o post não exista
      if(post == null) {
        this.router.navigate(["posts"]);//volta para a lista de posts
      }
      //guarda os dados do post na var post
      this.post=post;
      //pede ao servidor os comentários do post
      this.postsService.getPostComments(this.post.id).subscribe((comments:PostComment[]) =>{
        //guarda os comentários na var comments
        this.comments=comments;
      },take(1)/*faz o pedido e fecha a subscrição*/);
    },take(1)/*faz o pedido e fecha a subscrição*/);
  }

}
