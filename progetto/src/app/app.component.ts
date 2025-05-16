import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Post } from './models/post.model';
import { CommonModule } from '@angular/common';
import { PostComponent } from './post/post.component';
import { Commento } from './models/commento.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, PostComponent], //CommonModule per importare json
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'progetto';

  vettPost: Post[] = [];
  vettCommento: Commento[] = [];
  obs : Observable<Post[]>;

  obsPost! : Observable<any>; //Any perchè non so i dati che mi arrivano di che tipo sono
  addPost(userId: string, body: string){
    let nuovoPost = new Post(userId, body,"0", "Senza Titolo"); 
    console.log(nuovoPost);
    //push per infilare le cose nel vettore 
    this.vettPost.push(nuovoPost)
    console.log(this.vettPost);

    this.obsPost = this.http.post("https://jsonplaceholder.typicode.com/posts", nuovoPost)
    this.obsPost.subscribe(this.rispostaPost);
  }

  rispostaPost = (data : any) =>
  {
    console.log(data)
  }

  addCommento(commento: string){
    let nuovoCommento = new Commento(commento); 
    this.vettCommento.push(nuovoCommento);
  }

  //Mi faccio dare l'oggetto http da angular
  constructor(private http : HttpClient){
    //Faccio richiesta http perchè il constructor parte all'avvio 
    this.obs = this.http.get<Post[]>("https://jsonplaceholder.typicode.com/posts")//richiedo i post dal mio server
    //Dico all'observable cosa fare quando ricevo i dati
    this.obs.subscribe(this.getData);
  }
  //La funzione che l'observable chiama quando riceve i dati
  getData = (data : Post[]) => {
    console.log(data);//loggare nella console la variabile data
    this.vettPost = data; //Assegno i dati ricevuti all'array di post
  }
}