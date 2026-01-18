using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BazarZone.Migrations
{
    /// <inheritdoc />
    public partial class AddSocialLinksToProductAndProvider : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "FacebookUrl",
                table: "AppServiceProviders",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "InstagramUrl",
                table: "AppServiceProviders",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "LinkedInUrl",
                table: "AppServiceProviders",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "TwitterUrl",
                table: "AppServiceProviders",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "FacebookUrl",
                table: "AppProducts",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "InstagramUrl",
                table: "AppProducts",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "LinkedInUrl",
                table: "AppProducts",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "TwitterUrl",
                table: "AppProducts",
                type: "text",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FacebookUrl",
                table: "AppServiceProviders");

            migrationBuilder.DropColumn(
                name: "InstagramUrl",
                table: "AppServiceProviders");

            migrationBuilder.DropColumn(
                name: "LinkedInUrl",
                table: "AppServiceProviders");

            migrationBuilder.DropColumn(
                name: "TwitterUrl",
                table: "AppServiceProviders");

            migrationBuilder.DropColumn(
                name: "FacebookUrl",
                table: "AppProducts");

            migrationBuilder.DropColumn(
                name: "InstagramUrl",
                table: "AppProducts");

            migrationBuilder.DropColumn(
                name: "LinkedInUrl",
                table: "AppProducts");

            migrationBuilder.DropColumn(
                name: "TwitterUrl",
                table: "AppProducts");
        }
    }
}
