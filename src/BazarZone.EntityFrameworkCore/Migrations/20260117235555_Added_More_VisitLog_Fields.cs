using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BazarZone.Migrations
{
    /// <inheritdoc />
    public partial class Added_More_VisitLog_Fields : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Method",
                table: "AppVisitLogs",
                type: "character varying(16)",
                maxLength: 16,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "QueryString",
                table: "AppVisitLogs",
                type: "character varying(1024)",
                maxLength: 1024,
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Method",
                table: "AppVisitLogs");

            migrationBuilder.DropColumn(
                name: "QueryString",
                table: "AppVisitLogs");
        }
    }
}
