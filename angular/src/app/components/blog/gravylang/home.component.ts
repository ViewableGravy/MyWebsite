import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

export class Post {
  constructor(
    public content: [],
    public title: string,
    public summary: string,
    public author: string,
    public date: string
  ) {}
}

@Component({
  selector: 'app-blog',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class BlogComponent implements OnInit {

  posts: Post[];

  constructor(
    private httpClient: HttpClient
  ) { }

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts() {
    this.httpClient.get<any>('http://192.168.1.193:3000/api/blog/posts').subscribe(
      response => {
        console.log(response);
        this.posts = response;
      }
    )
  }
}