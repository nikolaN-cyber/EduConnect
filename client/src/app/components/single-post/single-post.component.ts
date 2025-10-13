import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { Post } from '../../models/post';
import { SHARED_IMPORTS } from '../../shared/shared-imports';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Comment, CreateCommentDto } from '../../models/comment';
import { loadComments, addComment, editComment, deleteComment } from '../../store/comments/comment.actions';
import { selectAllComments, selectCommentsLoading } from '../../store/comments/comment.selectors';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { getUser } from '../../auth/user-context';

@Component({
  selector: 'app-single-post',
  standalone: true,
  imports: [SHARED_IMPORTS],
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.css']
})
export class SinglePostComponent implements OnInit {
  @Input() post!: Post;
  @Output() close = new EventEmitter<void>();

  comments$: Observable<Comment[]>;
  loading$: Observable<boolean>;
  visibleComments: Comment[] = [];
  offset = 0;
  limit = 10;

  commentForm: FormGroup;
  editingCommentId: string | null = null;
  editCommentForm: FormGroup;

  user = getUser();

  constructor(private store: Store, private fb: FormBuilder) {
    this.comments$ = this.store.select(selectAllComments);
    this.loading$ = this.store.select(selectCommentsLoading);

    this.commentForm = this.fb.group({
      text: ['', Validators.required]
    });
    this.editCommentForm = this.fb.group({
      text: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadInitialComments();

    this.comments$.subscribe(comments => {
      this.visibleComments = comments.slice(0, this.offset + this.limit);
    });
  }

  loadInitialComments(): void {
    this.offset = 0;
    this.store.dispatch(loadComments({ postId: this.post.id, offset: this.offset, limit: this.limit }));
  }

  loadNext10(): void {
    this.offset += this.limit;
    this.store.dispatch(loadComments({ postId: this.post.id, offset: this.offset, limit: this.limit }));
  }

  showLess(): void {
    this.offset = 0;
    this.visibleComments = this.visibleComments.slice(0, this.limit);
  }

  addNewComment(): void {
    if (this.commentForm.invalid) return;

    const dto: CreateCommentDto = {
      postId: this.post.id,
      text: this.commentForm.value.text
    };

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
