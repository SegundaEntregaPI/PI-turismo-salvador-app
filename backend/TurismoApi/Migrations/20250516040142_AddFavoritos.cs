using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TurismoApi.Migrations
{
    /// <inheritdoc />
    public partial class AddFavoritos : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Favoritos",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    PontoTuristicoId = table.Column<int>(type: "int", nullable: true),
                    ExperienciaLocalId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Favoritos", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Favoritos_ExperienciasLocais_ExperienciaLocalId",
                        column: x => x.ExperienciaLocalId,
                        principalTable: "ExperienciasLocais",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Favoritos_PontosTuristicos_PontoTuristicoId",
                        column: x => x.PontoTuristicoId,
                        principalTable: "PontosTuristicos",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Favoritos_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_Favoritos_ExperienciaLocalId",
                table: "Favoritos",
                column: "ExperienciaLocalId");

            migrationBuilder.CreateIndex(
                name: "IX_Favoritos_PontoTuristicoId",
                table: "Favoritos",
                column: "PontoTuristicoId");

            migrationBuilder.CreateIndex(
                name: "IX_Favoritos_UserId",
                table: "Favoritos",
                column: "UserId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Favoritos");
        }
    }
}
