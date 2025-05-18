using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TurismoApi.Migrations
{
    /// <inheritdoc />
    public partial class AjustaRelacionamentoFavoritos : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Favoritos_ExperienciasLocais_ExperienciaLocalId",
                table: "Favoritos");

            migrationBuilder.DropForeignKey(
                name: "FK_Favoritos_PontosTuristicos_PontoTuristicoId",
                table: "Favoritos");

            migrationBuilder.AddForeignKey(
                name: "FK_Favoritos_ExperienciasLocais_ExperienciaLocalId",
                table: "Favoritos",
                column: "ExperienciaLocalId",
                principalTable: "ExperienciasLocais",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Favoritos_PontosTuristicos_PontoTuristicoId",
                table: "Favoritos",
                column: "PontoTuristicoId",
                principalTable: "PontosTuristicos",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Favoritos_ExperienciasLocais_ExperienciaLocalId",
                table: "Favoritos");

            migrationBuilder.DropForeignKey(
                name: "FK_Favoritos_PontosTuristicos_PontoTuristicoId",
                table: "Favoritos");

            migrationBuilder.AddForeignKey(
                name: "FK_Favoritos_ExperienciasLocais_ExperienciaLocalId",
                table: "Favoritos",
                column: "ExperienciaLocalId",
                principalTable: "ExperienciasLocais",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Favoritos_PontosTuristicos_PontoTuristicoId",
                table: "Favoritos",
                column: "PontoTuristicoId",
                principalTable: "PontosTuristicos",
                principalColumn: "Id");
        }
    }
}
