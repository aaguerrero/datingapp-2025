using System;
using API.Entities;
using API.Helpers;
using Entities;

namespace API.Interfaces;

public interface IMemberRepository
{
    void Update(Member member);
    Task<Boolean> SaveAllAsync();

    Task<PaginatedResult<Member>> GetMembersAsync(PaginParams pagingParams);

    Task<Member?> GetMemberByIdAsync(string Id);

    Task<IReadOnlyList<Photo>> GetPhotosForMemberAsync(string memberId);

    Task<Member?>GetMemberForUpdate(string id); 

}