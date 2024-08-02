﻿// <auto-generated />
using System;
using GraphQlBackend.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace GraphQlBackend.Migrations
{
    [DbContext(typeof(OMAContext))]
    [Migration("20240801032141_Initial")]
    partial class Initial
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.7")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("GraphQlBackend.Entities.Address", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("AddressLine1")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("AddressLine2")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("City")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Country")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("CustomerId")
                        .HasColumnType("int");

                    b.Property<string>("State")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("CustomerId")
                        .IsUnique();

                    b.ToTable("Addresses");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            AddressLine1 = "SomePlace",
                            AddressLine2 = "There",
                            City = "Melbourne",
                            Country = "AU",
                            CustomerId = 1,
                            State = "Victoria"
                        },
                        new
                        {
                            Id = 2,
                            AddressLine1 = "Another Place",
                            AddressLine2 = "here",
                            City = "Melbourne",
                            Country = "AU",
                            CustomerId = 2,
                            State = "Victoria"
                        });
                });

            modelBuilder.Entity("GraphQlBackend.Entities.Customer", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("ContactNumber")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("IsDeleted")
                        .HasColumnType("bit");

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Customers");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            ContactNumber = "0123444",
                            Email = "jamesband@hermajesty.com",
                            FirstName = "James",
                            IsDeleted = false,
                            LastName = "Bond"
                        },
                        new
                        {
                            Id = 2,
                            ContactNumber = "12344456",
                            Email = "monty@hermajesty.com",
                            FirstName = "Monty",
                            IsDeleted = false,
                            LastName = "Python"
                        });
                });

            modelBuilder.Entity("GraphQlBackend.Entities.Order", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("CustomerId")
                        .HasColumnType("int");

                    b.Property<decimal>("DepositAmount")
                        .HasColumnType("decimal(18,2)");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("IsDeleted")
                        .HasColumnType("bit");

                    b.Property<bool>("IsDelivery")
                        .HasColumnType("bit");

                    b.Property<DateTime>("OrderDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("OtherNotes")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Status")
                        .HasColumnType("int");

                    b.Property<decimal>("TotalAmount")
                        .HasColumnType("decimal(18,2)");

                    b.HasKey("Id");

                    b.HasIndex("CustomerId");

                    b.ToTable("Orders");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            CustomerId = 1,
                            DepositAmount = 10m,
                            Description = "New Item",
                            IsDeleted = false,
                            IsDelivery = true,
                            OrderDate = new DateTime(2022, 10, 20, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            OtherNotes = "Something new",
                            Status = 0,
                            TotalAmount = 500m
                        },
                        new
                        {
                            Id = 2,
                            CustomerId = 2,
                            DepositAmount = 250m,
                            Description = "Another New Item",
                            IsDeleted = false,
                            IsDelivery = false,
                            OrderDate = new DateTime(2022, 10, 10, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            OtherNotes = "Something new again",
                            Status = 1,
                            TotalAmount = 5000m
                        });
                });

            modelBuilder.Entity("GraphQlBackend.Entities.Address", b =>
                {
                    b.HasOne("GraphQlBackend.Entities.Customer", null)
                        .WithOne("Address")
                        .HasForeignKey("GraphQlBackend.Entities.Address", "CustomerId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("GraphQlBackend.Entities.Order", b =>
                {
                    b.HasOne("GraphQlBackend.Entities.Customer", "Customer")
                        .WithMany("Orders")
                        .HasForeignKey("CustomerId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Customer");
                });

            modelBuilder.Entity("GraphQlBackend.Entities.Customer", b =>
                {
                    b.Navigation("Address")
                        .IsRequired();

                    b.Navigation("Orders");
                });
#pragma warning restore 612, 618
        }
    }
}