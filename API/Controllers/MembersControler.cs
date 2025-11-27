using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using API.Data;
using API.Entities;
using System.Net.Mime;

namespace API.Controllers;



    [ApiController]
    [Route("api/[controller]")]  // localhost:5001/api/members
    
    
    

    public class MembersController(AppDbContext context) : ControllerBase
    {
        [HttpGet]
        public ActionResult<IReadOnlyList<AppUser>> GetMembers()
        {
            var members= context.Users.ToList();

            return members;
        }

        [HttpGet("{id}")]  // localhost:5001/api/members/bob-id
    public ActionResult<AppUser> GetMember(string id)
    {
        var member = context.Users.Find(id) ;

        if (member == null)
            return NotFound();

        return member;
    }
    }
    



