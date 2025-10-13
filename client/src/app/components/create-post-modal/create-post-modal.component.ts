import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { SHARED_IMPORTS } from '../../shared/shared-imports';
import { PostsState } from '../../store/post/post.reducer';
import { CreatePostDto } from '../../models/post';
import { addPost } from '../../store/post/post.actions';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-create-post-modal',
  standalone: true,
  imports: [SHARED_IMPORTS],
  templateUrl: './create-post-modal.component.html',
  styleUrls: ['./create-post-modal.component.css']
})
export class CreatePostModalComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CreatePostModalComponent>,
    private store: Store<PostsState>,
  ) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      text: [''],
      imageUrl: ['']
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const newPost: CreatePostDto = {
      title: this.form.value.title,
      content: {
        text: this.form.value.text,
        imageUrl: this.form.value.imageUrl
      }
    };
    this.store.dispatch(addPost({ createPostDto: newPost }));
    this.dialogRef.close();
  }
}
