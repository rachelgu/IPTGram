import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

export interface User {
     // ID do user
     id: string,
     // Nome
     name: string,
     // User name
     userName: string,
     // Indica se é o user atualmente autenticado
     isCurrentUser: boolean
}

export interface Post {
   // ID do post
   id: number,
   // Descrição
   caption: string
   // Data de publicação, em formato ISO 8601
   postedAt: Date,
   // Data de última edição, em formato ISO 8601
   lastEditAt: Date,
   // Informações sobre o user que criou o post
   user: User,
   // Nº de likes
   likes: number,
   // Se o user atualmente autenticado adicionou um "like" neste post.
   isLiking: boolean,
   // Nº de comentários.
   comments: number
}

export interface PostComment {
   // ID do comentário
   id: number,
   // Comentário do utilizador
   text:  string,
   // Data de publicação do comentário, em formato ISO 8601
   postedAt: Date,
   // User que fez o comentário
   user: User,
   // Informações sobre o post
   post: {
     // ID do post do comentário.
     id: number
   }
}

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  /**
   * caminho para os posts no servidor de api
   */
  public static POSTS_PATH : string = GlobalService.HOST_API_PATH + "posts/";
  /**
   * caminho para os comentários de um post no servidor de api
   */
  public static POSTS_COMMENTS_SUFIX : string = "comments";
  /**
   * 
   * @param http módulo de pedidos de http
   */
  constructor(private http : HttpClient) {}

  /**
   * pede ao servidor uma lista de posts
   * @param query parametro de pesquisa de posts
   */
  public getPosts(query:string) : Observable<Post[]>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    //define o parametro de pesquisa
    let params = new HttpParams().set("query", query);
    //define o pedido e devolve observável
    return this.http.get<Post[]>(PostsService.POSTS_PATH,{headers: headers, params: params})
      .pipe(catchError((err:any,caught: Observable<Post[]>)=> {
        return of([]);
      }));
  }
 
  /**
   * pede ao servidor os detalhes de 1 post
   * @param id id do post
   */
  public getPost(id:number) : Observable<Post>{
    //define o pedido e devolve observável
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get<Post>(PostsService.POSTS_PATH + id,{headers: headers})
      .pipe(catchError((err:any,caught: Observable<Post>)=> {
        return of(null);
      }));
  }

  /**
   * devolve URL da imagem do post
   * @param idPost id do post
   */
  public getImageUrl(idPost: number) : string {
    return PostsService.POSTS_PATH + '/' + idPost + '/image';
  }

  /**
   * pede ao servidor a lista de comentários de um post
   * @param id id do post
   */
  public getPostComments(id:number) : Observable<PostComment[]>{
    //define o pedido e devolve observável
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get<PostComment[]>(PostsService.POSTS_PATH + id + "/" + PostsService.POSTS_COMMENTS_SUFIX,{headers: headers})
      .pipe(catchError((err:any,caught: Observable<PostComment[]>)=> {
        return of([]);
      }));
  }
}
