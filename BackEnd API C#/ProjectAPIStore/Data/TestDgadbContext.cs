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

  public DbSet<Solicitud> Solicitudes { get; set; } = null!; // 👈



  protected override void OnModelCreating(ModelBuilder modelBuilder)
  {
        modelBuilder.Entity<Solicitud>(entity =>
        {
            entity.ToTable("Solicitudes");

            entity.HasKey(e => e.Id).HasName("PK_Solicitudes"); 
            entity.Property(e => e.Id)
                  .HasColumnName("Id")
                  .ValueGeneratedOnAdd();                      

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

            entity.Property(e => e.UrlDocumento)
                  .HasMaxLength(500)   // coincide con tu tabla
                  .IsUnicode(false)
                  .HasColumnName("UrlDocumento");

            entity.Property(e => e.DocumentoTipo)
                  .HasMaxLength(100)
                  .IsUnicode(false)
                  .HasColumnName("DocumentoTipo");

            // (Opcional) índice por Codigo para búsquedas rápidas
            entity.HasIndex(e => e.Codigo);
        });


        base.OnModelCreating(modelBuilder);
  }



  partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}


