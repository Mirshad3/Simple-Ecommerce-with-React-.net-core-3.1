using Microsoft.EntityFrameworkCore;
using System;

namespace ecommerce.Models
{
    public class EcomDbContext : DbContext
    {
        public EcomDbContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Product> Products { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<User>()
                .HasIndex(u => u.Email)
                .IsUnique();
            builder.Entity<User>()
                .HasIndex(u => u.UserName)
                .IsUnique();
            builder.Entity<Product>()
                .HasIndex(u => u.ProductCode)
                .IsUnique();
            builder.Entity<User>().HasData(new User
            {
                Id = 1,
                UserName = "Admin",
                Password = "Admin",
                Email = "admin@admin.com",
                LastLoginTime = new DateTime(2022, 07, 25),
            });
        }

    }

}