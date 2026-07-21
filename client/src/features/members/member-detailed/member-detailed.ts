import { Component, inject, OnInit } from '@angular/core';
import { MemberService } from '../../../core/service/member-service';
import { ActivatedRoute, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { Member } from '../../../types/member';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';


@Component({
  selector: 'app-member-detailed',
  imports: [AsyncPipe, RouterLink, RouterLinkActive,RouterOutlet],
  standalone: true,
  templateUrl: './member-detailed.html',
  styleUrl: './member-detailed.css',
})
export class MemberDetailed implements OnInit{
  private memberService = inject(MemberService);
  private route = inject(ActivatedRoute);
  protected member$?: Observable <Member>;

  ngOnInit(): void {
  this.member$ = this.loadMember()
  
}

  loadMember() {
    const id = this.route.snapshot.paramMap.get('id');
    console.log(this.route.snapshot.paramMap.get('id'));
    console.log('ID:', id);

    if (!id) return ;
    return this.memberService.getMember(id);
  }
}
