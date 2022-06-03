import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostService } from 'src/app/services/post.service';
@Component({
  selector: 'app-post-confirm',
  templateUrl: './post-confirm.component.html',
  styleUrls: ['./post-confirm.component.css']
})
export class PostConfirmComponent implements OnInit {

  postDetail: any;
  postId = "";
  constructor(private postService: PostService, private router: Router) { }

  ngOnInit(): void {
    this.postDetail = this.postService.getPost();
    this.postId = this.postDetail.id;
  }

  CreatePost() {
    if(this.postId){
      
      this.postService.updatePost(this.postId,{
        "data": {
          PostTitle: this.postDetail.data.PostTitle,
          PostDescription: this.postDetail.data.PostDescription,
          PostStatus:this.postDetail.status
        }
      }).subscribe((data: any) => {
        this.router.navigate(["posts"]);
    });
    
    }
    else{
      this.postService.createPost(
        {
          "data": {
            PostTitle: this.postDetail.data.PostTitle,
            PostDescription: this.postDetail.data.PostDescription
          }
        }).subscribe((data: any) => {
          this.router.navigate(["posts"]);
      });
     
     }
    }

  CancelPost() {
    this.router.navigate(["post/create"])
  }

}
