using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace NotapediaAPI.Migrations
{
    /// <inheritdoc />
    public partial class IdentityFix : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "CapturedNotamon",
                table: "UserCapturedNotamons",
                newName: "CaptureDate");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "UserCapturedNotamons",
                newName: "CaptureId");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "Notamons",
                newName: "NotamonId");

            migrationBuilder.AddColumn<int>(
                name: "NotamonId",
                table: "UserCapturedNotamons",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AlterColumn<string>(
                name: "Number",
                table: "Notamons",
                type: "TEXT",
                maxLength: 255,
                nullable: false,
                oldClrType: typeof(int),
                oldType: "INTEGER");

            migrationBuilder.AddColumn<string>(
                name: "Discriminator",
                table: "AspNetUsers",
                type: "TEXT",
                maxLength: 13,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "ProfileImage",
                table: "AspNetUsers",
                type: "TEXT",
                maxLength: 255,
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Items",
                columns: table => new
                {
                    ItemId = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(type: "TEXT", maxLength: 100, nullable: false),
                    Description = table.Column<string>(type: "TEXT", maxLength: 255, nullable: false),
                    ItemType = table.Column<string>(type: "TEXT", nullable: false),
                    ItemTypeId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Items", x => x.ItemId);
                });

            migrationBuilder.CreateTable(
                name: "Keys",
                columns: table => new
                {
                    KeyId = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Location = table.Column<string>(type: "TEXT", maxLength: 255, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Keys", x => x.KeyId);
                });

            migrationBuilder.CreateTable(
                name: "Statuses",
                columns: table => new
                {
                    StatusId = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(type: "TEXT", maxLength: 100, nullable: false),
                    Description = table.Column<string>(type: "TEXT", maxLength: 255, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Statuses", x => x.StatusId);
                });

            migrationBuilder.CreateTable(
                name: "TypeEffectivenesses",
                columns: table => new
                {
                    TypeEffectivenessId = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Type = table.Column<string>(type: "TEXT", maxLength: 100, nullable: false),
                    Normal = table.Column<int>(type: "INTEGER", nullable: false),
                    Fire = table.Column<int>(type: "INTEGER", nullable: false),
                    Water = table.Column<int>(type: "INTEGER", nullable: false),
                    Plant = table.Column<int>(type: "INTEGER", nullable: false),
                    Wind = table.Column<int>(type: "INTEGER", nullable: false),
                    Electric = table.Column<int>(type: "INTEGER", nullable: false),
                    Mineral = table.Column<int>(type: "INTEGER", nullable: false),
                    Ghost = table.Column<int>(type: "INTEGER", nullable: false),
                    Psychic = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TypeEffectivenesses", x => x.TypeEffectivenessId);
                });

            migrationBuilder.CreateTable(
                name: "Vaults",
                columns: table => new
                {
                    VaultId = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Location = table.Column<string>(type: "TEXT", maxLength: 100, nullable: false),
                    Contents = table.Column<string>(type: "TEXT", maxLength: 255, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Vaults", x => x.VaultId);
                });

            migrationBuilder.CreateIndex(
                name: "IX_UserCapturedNotamons_NotamonId",
                table: "UserCapturedNotamons",
                column: "NotamonId");

            migrationBuilder.AddForeignKey(
                name: "FK_UserCapturedNotamons_Notamons_NotamonId",
                table: "UserCapturedNotamons",
                column: "NotamonId",
                principalTable: "Notamons",
                principalColumn: "NotamonId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserCapturedNotamons_Notamons_NotamonId",
                table: "UserCapturedNotamons");

            migrationBuilder.DropTable(
                name: "Items");

            migrationBuilder.DropTable(
                name: "Keys");

            migrationBuilder.DropTable(
                name: "Statuses");

            migrationBuilder.DropTable(
                name: "TypeEffectivenesses");

            migrationBuilder.DropTable(
                name: "Vaults");

            migrationBuilder.DropIndex(
                name: "IX_UserCapturedNotamons_NotamonId",
                table: "UserCapturedNotamons");

            migrationBuilder.DropColumn(
                name: "NotamonId",
                table: "UserCapturedNotamons");

            migrationBuilder.DropColumn(
                name: "Discriminator",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "ProfileImage",
                table: "AspNetUsers");

            migrationBuilder.RenameColumn(
                name: "CaptureDate",
                table: "UserCapturedNotamons",
                newName: "CapturedNotamon");

            migrationBuilder.RenameColumn(
                name: "CaptureId",
                table: "UserCapturedNotamons",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "NotamonId",
                table: "Notamons",
                newName: "Id");

            migrationBuilder.AlterColumn<int>(
                name: "Number",
                table: "Notamons",
                type: "INTEGER",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "TEXT",
                oldMaxLength: 255);
        }
    }
}
