import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Post } from '../../models/post';
import { selectAllPosts, selectPostsLoading } from '../../store/post/post.selectors';
import { PostsState } from '../../store/post/post.reducer';
import { deletePost, likePost, loadPosts } from '../../store/post/post.actions';
import { SHARED_IMPORTS } from '../../shared/shared-imports';
import { SinglePostComponent } from '../single-post/single-post.component';
import { MatDialog } from '@angular/material/dialog';
import { CreatePostModalComponent } from '../create-post-modal/create-post-modal.component';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [SHARED_IMPORTS, SinglePostComponent],
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  posts$: Observable<Post[]>;
  loading$: Observable<boolean>;
  selectedPost: Post | null = null;
  currentUserId: string | null;

  constructor(
    private store: Store<PostsState>,
    private dialog: MatDialog,
    private postService: PostService
  ) {
    this.posts$ = this.store.select(selectAllPosts);
    this.loading$ = this.store.select(selectPostsLoading);
    const currentUser = localStorage.getItem('user')
    if (currentUser) {
      const user = JSON.parse(currentUser);
      this.currentUserId = user.id;
    } else {
      this.currentUserId = null;
    }
  }

  ngOnInit() {
    this.store.dispatch(loadPosts());
  }

  selectPost(post: Post) {
    this.selectedPost = post;
  }

  openCreatePostModal() {
    const dialogRef = this.dialog.open(CreatePostModalComponent, {
      width: '450px'
    });
  }

  onDelete(postId: string) {
    this.store.dispatch(deletePost({ postId }));
  }

  onLike(postId: string) {
    this.store.dispatch(likePost({ postId }));
  }

  isLikedByCurrentUser(post: Post): boolean {
    return post.usersLiked?.some(u => u.id === this.currentUserId) || false;
  }
}
