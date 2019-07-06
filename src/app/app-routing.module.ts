import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostsComponent } from './posts/posts.component';
import { HomeComponent } from './home/home.component';
import { PostsDetailsComponent } from './posts/posts-details/posts-details.component';
import { AboutComponent } from './about/about.component';


const routes: Routes = [
  { //lista de posts
    path: "posts",
    component: PostsComponent
  },
  { //detalhes de post
    path: "posts/:id",
    component: PostsDetailsComponent
  },
  { //detalhes da app
    path: "about",
    component: AboutComponent
  },
  { //todas as outras rotas
    path: "**",
    component: HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
