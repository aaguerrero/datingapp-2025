
import { Component, inject, OnInit, signal, ViewChild} from '@angular/core';
import { MemberService } from '../../../core/service/member-service';
import { Member, MemberParams } from '../../../types/member';
import { PaginatedResult } from '../../../types/pagination';
import { MemberCard } from '../member-card/member-card';
import { Paginator } from '../../../shared/paginator/paginator';
import { FilterModal } from '../filter-modal/filter-modal';



@Component({
  selector: 'app-member-list',
  imports: [MemberCard, Paginator, FilterModal],
  templateUrl: './member-list.html',
  styleUrl: './member-list.css',
})
export class MemberList implements OnInit {
  @ViewChild('filterModal') modal!: FilterModal;
  private memberService = inject(MemberService);
  protected paginatedMembers = signal<PaginatedResult<Member> | null>(null);

  protected memberParams = new MemberParams();

 
  ngOnInit(): void {
    this.loadMembers();
  }



loadMembers() {
   this.memberService.getMembers(this.memberParams).subscribe({
    next: result =>{
      this.paginatedMembers.set(result)
     }
   })
   
   
}


  onPageChange(event: { pageNumber: number; pageSize: number }) {
  console.log('PAGINATION EVENT:', event);

  this.memberParams.pageSize = event.pageSize;
  this.memberParams.pageNumber = event.pageNumber;
  this.loadMembers();
  }

  openModal(){
    this.modal.open();
  }

  onClose(){
    console.log('Modal closed')
  }

onFilterChange(data: MemberParams) {
  console.log('Filters received from modal:', data);

  this.memberParams.gender = data.gender;
  this.memberParams.minAge = data.minAge;
  this.memberParams.maxAge = data.maxAge;
  this.memberParams.orderBy = data.orderBy;

  // Reiniciamos la paginación
  this.memberParams.pageNumber = 1;

  // Consultamos nuevamente la API
  this.loadMembers();
}

  resetFilters(){
    this.memberParams = new MemberParams();
    this.loadMembers();
  }
}






