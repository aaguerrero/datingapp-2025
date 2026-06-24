using System;
using System.Text;
using System.Security.Cryptography;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using API.DTOs;
using Microsoft.EntityFrameworkCore;
using API.Interfaces;
using Microsoft.AspNetCore.Authorization;


namespace API.Controllers;

public class AccountController(AppDbContext context, ITokenService tokenService) : BaseApiController
{
    [HttpPost("register")]  // api/account/register

    public async Task<ActionResult<UserDto>> Register(RegisterDTO registerDto)
    {
        if (await EmailExists(registerDto.Email)) return BadRequest("Email Taken");

        using var hmac = new HMACSHA512();

        var user =  new AppUser
        {
            DisplayName = registerDto.DisplayName,
            Email = registerDto.Email,
            PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.Password)),
            PasswordSalt = hmac.Key
        };

        context.Users.Add(user) ;
        await context.SaveChangesAsync();

         return user.ToDto(tokenService);
        
        
    }

    
    [HttpPost("login")]
    public async Task<ActionResult<UserDto>> Login(LoginDTO loginDto)
    {
        var user = await context.Users.FirstOrDefaultAsync(x => x.Email.ToLower()== loginDto.Email.ToLower());

        if (user == null) return Unauthorized("Invalid email Adress");

        using var hmac = new HMACSHA512(user.PasswordSalt) ;

        var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.Password));

        for (var i = 0; i < computedHash.Length; i++)
        {
            if(computedHash[i] != user.PasswordHash[i]) return Unauthorized("Invalid Password") ;
        }

        return  user.ToDto(tokenService);
       
    }

    private async Task<bool> EmailExists(string email)
    {
        return await context.Users.AnyAsync(x => x.Email.ToLower() == email.ToLower());
    }

}