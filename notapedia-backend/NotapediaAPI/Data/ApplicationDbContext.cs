using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using NotapediaAPI.Models;

namespace NotapediaAPI.Data
{
    public class ApplicationDbContext : IdentityDbContext<User>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options) { }

        public override DbSet<User> Users { get; set; }
        public DbSet<Notamon> Notamons { get; set; }
        public DbSet<Item> Items { get; set; }
        public DbSet<Vault> Vaults { get; set; }
        public DbSet<Key> Keys { get; set; }
        public DbSet<TypeEffectiveness> TypeEffectivenesses { get; set; }
        public DbSet<Status> Statuses { get; set; }
        public DbSet<UserCapturedNotamon> UserCapturedNotamons { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<User>().ToTable("AspNetUsers");

            builder.Entity<UserCapturedNotamon>()
                .HasOne(u => u.User)
                .WithMany(u => u.CapturedNotamons)
                .HasForeignKey(u => u.UserId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}