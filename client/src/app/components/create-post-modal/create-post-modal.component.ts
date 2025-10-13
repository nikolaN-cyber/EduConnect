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
  selectedImageBase64: string | null = null;

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

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      this.selectedImageBase64 = reader.result as string;
    };
    reader.readAsDataURL(file);
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
        imageUrl: this.selectedImageBase64 ?? undefined
      }
    };
    this.store.dispatch(addPost({ createPostDto: newPost }));
    this.dialogRef.close();
  }
}
