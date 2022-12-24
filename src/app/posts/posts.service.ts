import { Injectable } from '@angular/core';
import {Post} from './post.model'
import { Subject } from 'rxjs'
import { ThisReceiver } from '@angular/compiler';

@Injectable({providedIn: 'root'})
export class PostService {
    private posts: Post[] = [];
    private postsUpdated = new Subject<Post[]>()

    getsPosts() {
        return [...this.posts];
    }

    getPostUpdatedListener(){
        return this.postsUpdated.asObservable();
    }

    addPost(title: string, content: string) {
        const post: Post = {title: title, content: content}
        this.posts.push(post)
        this.postsUpdated.next([...this.posts]);
    }

    removePost(post: any) {
        this.posts = this.posts.filter(item => item !== post)
        this.postsUpdated.next([...this.posts])
    }

    editPost(post: any) {
        post.content = 'Sex Girlfriend'
        post.title = 'are you my..'
    }
}