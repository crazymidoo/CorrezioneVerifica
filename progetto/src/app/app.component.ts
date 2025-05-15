import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Post } from './models/post.model';
import { CommonModule } from '@angular/common';
import { PostComponent } from './post/post.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, PostComponent], //CommonModule per importare json
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'progetto';

  vettPost: Post[] = [];

  addPost(nome: string, post: string){
    let nuovoPost = new Post(nome, post); 
    console.log(nuovoPost);
    //push per infilare le cose nel vettore 
    this.vettPost.push(nuovoPost)
    console.log(this.vettPost);
  }
}