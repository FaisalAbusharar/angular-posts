import { Component, OnDestroy, OnInit } from "@angular/core";
import { Post } from '../post.model'
import { PostService } from "../posts.service";
import { Subscription } from "rxjs";

@Component({
    selector: 'app-post-list',
    templateUrl: './post-list.component.html',
    styleUrls: ['./post-list.component.css',]
})
export class PostListComponent implements OnInit, OnDestroy {

    // posts = [
    //     {title: "First Post", content: "this is the first post's content"},
    //     {title: "Second Post", content: "this is the second post's content"},
    //     {title: "Third Post", content: "this is the third post's content"},
    //     {title: "Fourth Post", content: "this is the fourth post's content"},
    // ]

    posts: Post[] = [];
    private postsSub: Subscription = new Subscription;

    constructor(public postsService: PostService) { }

    ngOnInit() {
        this.posts = this.postsService.getsPosts()
        this.postsSub = this.postsService.getPostUpdatedListener()
        .subscribe((posts: Post[]) => {
            this.posts = posts;
        })
    }

    ngOnDestroy() {
        this.postsSub.unsubscribe();
    }
    
    onRemovePost(post: any) {
        this.postsService.removePost(post)
    }

    editMode = false;

    onEditPost(post: any) {
        this.editMode = true;
      }
    
      onSubmit(post: any) {
        this.editMode = false;
      }

}