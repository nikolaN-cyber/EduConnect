import { Component, EventEmitter, Input, Output, OnInit, OnDestroy } from '@angular/core';
import { Post } from '../../models/post';
import { SHARED_IMPORTS } from '../../shared/shared-imports';
import { Store } from '@ngrx/store';
import { Observable, Subscription, map, of } from 'rxjs';
import { Comment, CreateCommentDto } from '../../models/comment';
import { loadComments, addComment, editComment, deleteComment } from '../../store/comments/comment.actions';
import { selectAllComments, selectCommentsByPostId, selectCommentsLoading } from '../../store/comments/comment.selectors';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { getUser } from '../../auth/user-context';

@Component({
  selector: 'app-single-post',
  standalone: true,
  imports: [SHARED_IMPORTS],
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.css']
})
export class SinglePostComponent implements OnInit, OnDestroy {
  @Input() post!: Post;
  @Output() close = new EventEmitter<void>();

  comments$: Observable<Comment[]> = of([]);
  loading$: Observable<boolean> = of(false);

  commentForm: FormGroup;
  editingCommentId: string | null = null;
  editCommentForm: FormGroup;

  user = getUser();
  subscription = new Subscription();

  constructor(private store: Store, private fb: FormBuilder) {
    this.commentForm = this.fb.group({ text: ['', Validators.required] });
    this.editCommentForm = this.fb.group({ text: ['', Validators.required] });
  }

  ngOnInit(): void {
    this.store.dispatch(loadComments({ postId: this.post.id }));

    this.comments$ = this.store.select(selectCommentsByPostId(this.post.id));

    this.loading$ = this.store.select(selectCommentsLoading);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  addNewComment(): void {
    if (this.commentForm.invalid) return;

    const dto: CreateCommentDto = { postId: this.post.id, text: this.commentForm.value.text };
    this.store.dispatch(addComment({ createCommentDto: dto }));
    this.commentForm.reset();
  }

  startEdit(comment: Comment): void {
    this.editingCommentId = comment.id;
    this.editCommentForm.setValue({ text: comment.text });
  }

  saveEdit(commentId: string): void {
    if (this.editCommentForm.invalid) return;
    const text = this.editCommentForm.value.text;
    this.store.dispatch(editComment({ id: commentId, updateCommentDto: { text } }));
    this.editingCommentId = null;
  }

  cancelEdit(): void {
    this.editingCommentId = null;
  }

  deleteComment(commentId: string): void {
    if (confirm('Are you sure you want to delete this comment?')) {
      this.store.dispatch(deleteComment({ id: commentId }));
    }
  }

  isAuthor(comment: Comment): boolean {
    return comment.author.id === this.user?.id;
  }

  closeModal(): void {
    this.close.emit();
  }
}
