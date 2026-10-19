
import { Component, inject, OnInit, signal } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Observable, tap } from 'rxjs';

import { MemberService } from '../../../core/service/member-service';
import { Member } from '../../../types/member';
import { PaginatedResult } from '../../../types/pagination';
import { MemberCard } from '../member-card/member-card';
import { Paginator } from '../../../shared/paginator/paginator';


@Component({
  selector: 'app-member-list',
  imports: [AsyncPipe, MemberCard, Paginator],
  templateUrl: './member-list.html',
  styleUrl: './member-list.css',
})
export class MemberList implements OnInit {
  private memberService = inject(MemberService);
  protected paginatedMembers = signal<PaginatedResult<Member> | null>(null);

  pageNumber = 1;
  pageSize = 5;

 
  ngOnInit(): void {
    this.loadMembers();
  }



loadMembers() {
   this.memberService.getMembers(this.pageNumber, this.pageSize).subscribe({
    next: result =>{
      this.paginatedMembers.set(result)
     }
   })
   
   
}


  onPageChange(event: { pageNumber: number; pageSize: number }) {
  console.log('PAGINATION EVENT:', event);

  this.pageSize = event.pageSize;
  this.pageNumber = event.pageNumber;

  this.loadMembers();
  }

}






