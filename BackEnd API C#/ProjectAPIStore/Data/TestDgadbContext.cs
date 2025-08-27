using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

using ProjectAPIStore.Models;

namespace ProjectAPIStore.Data;

public partial class TestDgadbContext : DbContext
{
    public TestDgadbContext()
    {
    }

    public TestDgadbContext(DbContextOptions<TestDgadbContext> options)
        : base(options)
    {
    }

  public virtual DbSet<Solicitud> Solicitudes { get; set; }



  protected override void OnModelCreating(ModelBuilder modelBuilder)
  {
    modelBuilder.Entity<Solicitud>(entity =>
    {
      entity.HasKey(e => e.Codigo).HasName("PK_Solicitudes");
      entity.ToTable("Solicitudes");

      entity.Property(e => e.Codigo).HasColumnName("Codigo");

      entity.Property(e => e.NombreApellido)
            .HasMaxLength(150)
            .IsUnicode(false)
            .HasColumnName("NombreApellido");

      entity.Property(e => e.HoraEntrada)
            .HasColumnType("time(7)")
            .HasColumnName("HoraEntrada");

      entity.Property(e => e.FechaEntrada)
            .HasColumnType("date")
            .HasColumnName("FechaEntrada");

      entity.Property(e => e.FechaSalida)
            .HasColumnType("date")
            .HasColumnName("FechaSalida");

      entity.Property(e => e.HoraSalida)
            .HasColumnType("time(7)")
            .HasColumnName("HoraSalida");
    });

    base.OnModelCreating(modelBuilder);
  }



  partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}


