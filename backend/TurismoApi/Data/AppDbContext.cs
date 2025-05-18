using Microsoft.EntityFrameworkCore;
using TurismoApi.Models;

namespace TurismoApi.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<PontoTuristico> PontosTuristicos { get; set; }
        public DbSet<ExperienciaLocal> ExperienciasLocais { get; set; }
        public DbSet<Favorito> Favoritos { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Favorito>()
                .HasOne(f => f.PontoTuristico)
                .WithMany()
                .HasForeignKey(f => f.PontoTuristicoId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Favorito>()
                .HasOne(f => f.ExperienciaLocal)
                .WithMany()
                .HasForeignKey(f => f.ExperienciaLocalId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Favorito>()
                .HasOne(f => f.User)
                .WithMany()
                .HasForeignKey(f => f.UserId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
