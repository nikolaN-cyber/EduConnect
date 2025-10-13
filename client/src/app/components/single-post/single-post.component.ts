import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Post } from '../../models/post';
import { SHARED_IMPORTS } from '../../shared/shared-imports';

@Component({
  selector: 'app-single-post',
  standalone: true,
  imports: [SHARED_IMPORTS],
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.css']
})
export class SinglePostComponent {
  @Input() post!: Post;
  @Output() close = new EventEmitter<void>()

  closeModal() {
    this.close.emit();
  }
}
