using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TurismoApi.Migrations
{
    /// <inheritdoc />
    public partial class AtualizacaoExperienciaLocal : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Localizacao",
                table: "ExperienciasLocais");

            migrationBuilder.AddColumn<double>(
                name: "Latitude",
                table: "ExperienciasLocais",
                type: "double",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Longitude",
                table: "ExperienciasLocais",
                type: "double",
                nullable: false,
                defaultValue: 0.0);
        }


        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Latitude",
                table: "ExperienciasLocais");

            migrationBuilder.DropColumn(
                name: "Longitude",
                table: "ExperienciasLocais");

            migrationBuilder.AddColumn<string>(
                name: "Localizacao",
                table: "ExperienciasLocais",
                type: "longtext",
                nullable: false)
                .Annotation("MySql:CharSet", "utf8mb4");
        }

    }
}
