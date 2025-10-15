import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Post } from '../../models/post';
import { selectAllPosts, selectPostsLoading } from '../../store/post/post.selectors';
import { PostsState } from '../../store/post/post.reducer';
import { deletePost, likePost, loadPosts } from '../../store/post/post.actions';
import { SHARED_IMPORTS } from '../../shared/shared-imports';
import { SinglePostComponent } from '../single-post/single-post.component';
import { MatDialog } from '@angular/material/dialog';
import { CreatePostModalComponent } from '../create-post-modal/create-post-modal.component';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [SHARED_IMPORTS, SinglePostComponent],
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit, OnDestroy {
  posts$: Observable<Post[]>;
  loading$: Observable<boolean>;
  selectedPost: Post | null = null;
  currentUserId: string | null;
  searchTerm: string = '';
  filteredPosts: Post[] = [];
  private subscription = new Subscription();

  constructor(
    private store: Store<PostsState>,
    private dialog: MatDialog,
  ) {
    this.posts$ = this.store.select(selectAllPosts);
    this.loading$ = this.store.select(selectPostsLoading);

    const currentUser = localStorage.getItem('user');
    this.currentUserId = currentUser ? JSON.parse(currentUser).id : null;
  }

  ngOnInit() {
    this.store.dispatch(loadPosts());

    const sub = this.posts$.subscribe(posts => {
      if (posts) {
        this.filteredPosts = posts;
      }
    });
    this.subscription.add(sub);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  selectPost(post: Post) {
    this.selectedPost = post;
  }

  applyFilter() {
    this.posts$.subscribe(posts => {
      if (!this.searchTerm.trim()) {
        this.filteredPosts = posts;
      } else {
        this.filteredPosts = posts.filter(post =>
          post.title.toLowerCase().includes(this.searchTerm.toLowerCase())
        );
      }

      const totalLikes = this.filteredPosts.reduce((acc, post) => acc + (post.likes || 0), 0);
      console.log('Total likes of filtered posts:', totalLikes);

      this.filteredPosts.forEach(post => console.log('Filtered post ID:', post.id));
    });
  }

  openCreatePostModal() {
    this.dialog.open(CreatePostModalComponent, {
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
