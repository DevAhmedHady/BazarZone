using Microsoft.EntityFrameworkCore;
using Volo.Abp.AuditLogging.EntityFrameworkCore;
using Volo.Abp.BackgroundJobs.EntityFrameworkCore;
using Volo.Abp.BlobStoring.Database.EntityFrameworkCore;
using Volo.Abp.Data;
using Volo.Abp.DependencyInjection;
using Volo.Abp.EntityFrameworkCore;
using Volo.Abp.EntityFrameworkCore.Modeling;
using Volo.Abp.FeatureManagement.EntityFrameworkCore;
using Volo.Abp.Identity;
using Volo.Abp.Identity.EntityFrameworkCore;
using Volo.Abp.PermissionManagement.EntityFrameworkCore;
using Volo.Abp.SettingManagement.EntityFrameworkCore;
using Volo.Abp.OpenIddict.EntityFrameworkCore;
using BazarZone.ServiceProviders;
using BazarZone.Services;
using BazarZone.Products;
using BazarZone.Content;
using BazarZone.Sliders;
using BazarZone.Visitors;

namespace BazarZone.EntityFrameworkCore;

[ReplaceDbContext(typeof(IIdentityDbContext))]
[ConnectionStringName("Default")]
public class BazarZoneDbContext :
    AbpDbContext<BazarZoneDbContext>,
    IIdentityDbContext
{
    /* Add DbSet properties for your Aggregate Roots / Entities here. */
    public DbSet<ServiceProvider> ServiceProviders { get; set; }
    public DbSet<Service> Services { get; set; }
    public DbSet<Product> Products { get; set; }
    public DbSet<PageContent> PageContents { get; set; }
    public DbSet<SliderBanner> SliderBanners { get; set; }
    public DbSet<Media.AppImage> AppImages { get; set; }
    public DbSet<Contact.ContactRequest> ContactRequests { get; set; }
    public DbSet<ProviderApplication> ProviderApplications { get; set; }
    public DbSet<VisitLog> VisitLogs { get; set; }



    #region Entities from the modules

    /* Notice: We only implemented IIdentityProDbContext 
     * and replaced them for this DbContext. This allows you to perform JOIN
     * queries for the entities of these modules over the repositories easily. You
     * typically don't need that for other modules. But, if you need, you can
     * implement the DbContext interface of the needed module and use ReplaceDbContext
     * attribute just like IIdentityProDbContext .
     *
     * More info: Replacing a DbContext of a module ensures that the related module
     * uses this DbContext on runtime. Otherwise, it will use its own DbContext class.
     */

    // Identity
    public DbSet<IdentityUser> Users { get; set; }
    public DbSet<IdentityRole> Roles { get; set; }
    public DbSet<IdentityClaimType> ClaimTypes { get; set; }
    public DbSet<OrganizationUnit> OrganizationUnits { get; set; }
    public DbSet<IdentitySecurityLog> SecurityLogs { get; set; }
    public DbSet<IdentityLinkUser> LinkUsers { get; set; }
    public DbSet<IdentityUserDelegation> UserDelegations { get; set; }
    public DbSet<IdentitySession> Sessions { get; set; }

    #endregion

    public BazarZoneDbContext(DbContextOptions<BazarZoneDbContext> options)
        : base(options)
    {

    }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        /* Include modules to your migration db context */

        builder.ConfigurePermissionManagement();
        builder.ConfigureSettingManagement();
        builder.ConfigureBackgroundJobs();
        builder.ConfigureAuditLogging();
        builder.ConfigureFeatureManagement();
        builder.ConfigureIdentity();
        builder.ConfigureOpenIddict();
        builder.ConfigureBlobStoring();
        
        /* Configure your own tables/entities inside here */

        builder.Entity<ServiceProvider>(b =>
        {
            b.ToTable(BazarZoneConsts.DbTablePrefix + "ServiceProviders", BazarZoneConsts.DbSchema);
            b.ConfigureByConvention();
            b.Property(x => x.Name).IsRequired().HasMaxLength(128);
            b.Property(x => x.Description).HasMaxLength(2048);
        });

        builder.Entity<Service>(b =>
        {
            b.ToTable(BazarZoneConsts.DbTablePrefix + "Services", BazarZoneConsts.DbSchema);
            b.ConfigureByConvention();
            b.Property(x => x.Name).IsRequired().HasMaxLength(128);
            b.Property(x => x.Price).HasColumnType("decimal(18,2)");
        });

        builder.Entity<Product>(b =>
        {
            b.ToTable(BazarZoneConsts.DbTablePrefix + "Products", BazarZoneConsts.DbSchema);
            b.ConfigureByConvention();
            b.Property(x => x.Name).IsRequired().HasMaxLength(128);
            b.Property(x => x.Price).HasColumnType("decimal(18,2)");
        });

        builder.Entity<PageContent>(b =>
        {
            b.ToTable(BazarZoneConsts.DbTablePrefix + "PageContents", BazarZoneConsts.DbSchema);
            b.ConfigureByConvention();
            b.Property(x => x.Key).IsRequired().HasMaxLength(64);
            b.HasIndex(x => x.Key).IsUnique();
        });

        builder.Entity<SliderBanner>(b =>
        {
            b.ToTable(BazarZoneConsts.DbTablePrefix + "SliderBanners", BazarZoneConsts.DbSchema);
            b.ConfigureByConvention();
            b.Property(x => x.Title).IsRequired().HasMaxLength(128);
            b.Property(x => x.ImageUrl).IsRequired().HasMaxLength(1024);
            b.Property(x => x.Description).HasMaxLength(512);
            b.Property(x => x.LinkUrl).HasMaxLength(1024);
            b.HasIndex(x => new { x.Position, x.SortOrder });
        });

        builder.Entity<Media.AppImage>(b =>
        {
            b.ToTable(BazarZoneConsts.DbTablePrefix + "AppImages", BazarZoneConsts.DbSchema);
            b.ConfigureByConvention();
            b.Property(x => x.FileName).IsRequired().HasMaxLength(255);
            b.Property(x => x.MimeType).IsRequired().HasMaxLength(128);
            // Content matches byte[] by default to varbinary(max) or bytea
        });

        builder.Entity<Contact.ContactRequest>(b =>
        {
            b.ToTable(BazarZoneConsts.DbTablePrefix + "ContactRequests", BazarZoneConsts.DbSchema);
            b.ConfigureByConvention();
            b.Property(x => x.Name).IsRequired().HasMaxLength(128);
            b.Property(x => x.Email).IsRequired().HasMaxLength(128);
            b.Property(x => x.Subject).IsRequired().HasMaxLength(256);
            b.Property(x => x.Message).IsRequired().HasMaxLength(2048);
        });

        builder.Entity<ProviderApplication>(b =>
        {
            b.ToTable(BazarZoneConsts.DbTablePrefix + "ProviderApplications", BazarZoneConsts.DbSchema);
            b.ConfigureByConvention();
            b.Property(x => x.CompanyName).IsRequired().HasMaxLength(128);
            b.Property(x => x.ContactPerson).IsRequired().HasMaxLength(128);
            b.Property(x => x.Email).IsRequired().HasMaxLength(128);
            b.Property(x => x.PhoneNumber).IsRequired().HasMaxLength(32);
        });

        builder.Entity<VisitLog>(b =>
        {
            b.ToTable(BazarZoneConsts.DbTablePrefix + "VisitLogs", BazarZoneConsts.DbSchema);
            b.ConfigureByConvention();
            b.Property(x => x.Path).IsRequired().HasMaxLength(512);
            b.Property(x => x.QueryString).HasMaxLength(1024);
            b.Property(x => x.Method).HasMaxLength(16);
            b.Property(x => x.ReferrerUrl).HasMaxLength(1024);
            b.Property(x => x.UserAgent).HasMaxLength(512);
            b.Property(x => x.IpAddress).HasMaxLength(64);
            b.Property(x => x.Source).HasMaxLength(32);
            b.HasIndex(x => x.CreationTime);
        });
    }
}
