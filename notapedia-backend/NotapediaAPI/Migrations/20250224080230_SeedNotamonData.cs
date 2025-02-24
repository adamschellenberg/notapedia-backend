using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace NotapediaAPI.Migrations
{
    /// <inheritdoc />
    public partial class SeedNotamonData : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Name",
                table: "Statuses",
                newName: "Effect");

            migrationBuilder.RenameColumn(
                name: "StatusId",
                table: "Statuses",
                newName: "StatusEffectId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Effect",
                table: "Statuses",
                newName: "Name");

            migrationBuilder.RenameColumn(
                name: "StatusEffectId",
                table: "Statuses",
                newName: "StatusId");
        }
    }
}
