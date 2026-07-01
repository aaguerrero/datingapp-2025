using System;
using API.Entities;

using System.Security.Cryptography.X509Certificates;
using Microsoft.EntityFrameworkCore;
using Entities;

namespace API.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    public DbSet<AppUser> Users { get; set; }

    public DbSet<Member> Members { get; set; }

    public DbSet<Photo> Photos { get; set; }
}