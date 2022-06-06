import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { PostService } from 'src/app/services/post.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
    selector: 'app-post-create',
    templateUrl: './post-create.component.html',
    styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {

    constructor(private fb: FormBuilder, public postService: PostService, private router: Router, private route: ActivatedRoute) { }
    title = 'bulletin-board';
    posts: any;
    postDetail: any;
    postId: any;
    status: any;
    error = null;

    postForm = this.fb.group({
        PostTitle: ['', [Validators.required, Validators.maxLength(255)]],
        PostDescription: ['', [Validators.required]],
        PostStatus: ['']
    });

    get Title() {
        return this.postForm?.get('PostTitle');
    }
    get Description() {
        return this.postForm?.get('PostDescription');
    }

    ngOnInit(): void {
        this.postId = this.route.snapshot.queryParams['postId'];
        this.getPostDetail();
    }

    async getPostDetail() {
        if (this.postId) {
            return await this.postService.getSinglePost(this.postId).subscribe((data: any) => {
                this.postDetail = data.data;
                this.status = this.postDetail.attributes.PostStatus;
                this.postForm.get("PostDescription")?.setValue(this.postDetail.attributes.PostDescription);
                this.postForm.get("PostTitle")?.setValue(this.postDetail.attributes.PostTitle);
            });
        }
        else {
            this.postDetail = await this.postService.getPost();
            const postData = this.postDetail;

            if (postData?.data.PostTitle && postData?.data.PostDescription) {

                this.postForm.get("PostDescription")?.setValue(postData.data.PostDescription);
                this.postForm.get("PostTitle")?.setValue(postData.data.PostTitle);
            } else {

                this.postForm.get("PostDescription")?.setValue("");
                this.postForm.get("PostTitle")?.setValue("");
            }
            return;
        }
    }

    Add() {
        this.postService.setPost({
            data: this.postForm.value
        });
        this.router.navigate(["post/confirm"]);
    }

    Update(data: any) {
        this.postId = data.id;
        this.Title?.setValue(data.attributes.PostTitle);
        this.Description?.setValue(data.attributes.PostDescription);
    }

    Edit() {
        this.postService.setPost({
            id: this.postId,
            status: this.status,
            data: this.postForm.value
        });
        this.router.navigate(["post/confirm"]);
    }

    onChange($event: any) {
        $event.checked ? this.status = true : this.status = false;
    }

}
