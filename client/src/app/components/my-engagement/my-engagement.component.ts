import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { UserService } from '../../services/user.service';
import { Post } from '../../models/post';
import { Comment } from '../../models/comment';
import { SHARED_IMPORTS } from '../../shared/shared-imports';

@Component({
  selector: 'app-my-engagement',
  standalone: true,
  imports: [SHARED_IMPORTS],
  templateUrl: './my-engagement.component.html',
  styleUrls: ['./my-engagement.component.css']
})
export class MyEngagementComponent implements OnInit {
  likedPosts: Post[] = [];
  myComments: Comment[] = [];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    forkJoin({
      likedPosts: this.userService.getLikedPosts(),
      myComments: this.userService.getMyComments()
    }).subscribe({
      next: (data) => {
        this.likedPosts = data.likedPosts;
        this.myComments = data.myComments;
      },
      error: (err) => console.error(err)
    });
  }
}
