using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BazarZone.Content;
using BazarZone.Products;
using BazarZone.ServiceProviders;
using BazarZone.Services;
using Volo.Abp.Data;
using Volo.Abp.DependencyInjection;
using Volo.Abp.Domain.Repositories;

namespace BazarZone.Data;

public class CatalogDataSeedContributor : IDataSeedContributor, ITransientDependency
{
    private readonly IRepository<ServiceProvider, Guid> _providerRepository;
    private readonly IRepository<Product, Guid> _productRepository;
    private readonly IRepository<Service, Guid> _serviceRepository;
    private readonly IRepository<PageContent, Guid> _contentRepository;

    public CatalogDataSeedContributor(
        IRepository<ServiceProvider, Guid> providerRepository,
        IRepository<Product, Guid> productRepository,
        IRepository<Service, Guid> serviceRepository,
        IRepository<PageContent, Guid> contentRepository)
    {
        _providerRepository = providerRepository;
        _productRepository = productRepository;
        _serviceRepository = serviceRepository;
        _contentRepository = contentRepository;
    }

    public async Task SeedAsync(DataSeedContext context)
    {
        if (!await _providerRepository.AnyAsync())
        {
            var providers = BuildProviders();
            await _providerRepository.InsertManyAsync(providers, autoSave: true);
        }

        var existingProviders = await _providerRepository.GetListAsync();

        if (!await _productRepository.AnyAsync() && existingProviders.Any())
        {
            var products = BuildProducts(existingProviders);
            await _productRepository.InsertManyAsync(products, autoSave: true);
        }

        if (!await _serviceRepository.AnyAsync() && existingProviders.Any())
        {
            var services = BuildServices(existingProviders);
            await _serviceRepository.InsertManyAsync(services, autoSave: true);
        }

        if (!await _contentRepository.AnyAsync())
        {
            var contents = BuildContents();
            await _contentRepository.InsertManyAsync(contents, autoSave: true);
        }
    }

    private static List<ServiceProvider> BuildProviders()
    {
        return new List<ServiceProvider>
        {
            new ServiceProvider(Guid.NewGuid(), "Aurora Tech", "حلول تقنية مبتكرة للأعمال الذكية والتحول الرقمي.",
                "https://images.unsplash.com/photo-1518770660439-4636190af475?w=200&h=200&fit=crop",
                "info@aurora-tech.com")
            {
                ContactPhone = "+966 55 000 1111",
                WebsiteUrl = "https://aurora-tech.example.com",
                Address = "Riyadh, KSA",
                Category = "تقنية",
                IsActive = true
            },
            new ServiceProvider(Guid.NewGuid(), "Zen Living", "منتجات عافية وصحة طبيعية لأسلوب حياة متوازن.",
                "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
                "hello@zenliving.com")
            {
                ContactPhone = "+966 55 000 2222",
                WebsiteUrl = "https://zenliving.example.com",
                Address = "Jeddah, KSA",
                Category = "صحة",
                IsActive = true
            },
            new ServiceProvider(Guid.NewGuid(), "Pixel Craft", "أدوات التصميم والإبداع الرقمي للمحترفين.",
                "https://images.unsplash.com/photo-1616469829935-c0e995fbf036?w=200&h=200&fit=crop",
                "team@pixelcraft.com")
            {
                ContactPhone = "+966 55 000 3333",
                WebsiteUrl = "https://pixelcraft.example.com",
                Address = "Dammam, KSA",
                Category = "تصميم",
                IsActive = true
            },
            new ServiceProvider(Guid.NewGuid(), "Smart Kitchen", "أجهزة مطبخ ذكية ومبتكرة لمنزل عصري.",
                "https://images.unsplash.com/photo-1556912173-3bb406ef7e77?w=200&h=200&fit=crop",
                "support@smartkitchen.com")
            {
                ContactPhone = "+966 55 000 4444",
                WebsiteUrl = "https://smartkitchen.example.com",
                Address = "Riyadh, KSA",
                Category = "مطبخ",
                IsActive = true
            },
            new ServiceProvider(Guid.NewGuid(), "Urban Brew", "قهوة حرفية ومعدات تحضير متميزة.",
                "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=200&h=200&fit=crop",
                "orders@urbanbrew.com")
            {
                ContactPhone = "+966 55 000 5555",
                WebsiteUrl = "https://urbanbrew.example.com",
                Address = "Makkah, KSA",
                Category = "مشروبات",
                IsActive = true
            },
            new ServiceProvider(Guid.NewGuid(), "Nova Sports", "معدات رياضية عالية الأداء للرياضيين المحترفين.",
                "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=200&h=200&fit=crop",
                "sales@novasports.com")
            {
                ContactPhone = "+966 55 000 6666",
                WebsiteUrl = "https://novasports.example.com",
                Address = "Riyadh, KSA",
                Category = "رياضة",
                IsActive = true
            },
            new ServiceProvider(Guid.NewGuid(), "Velvet Luxe", "علامة تجارية فاخرة للعطور والإكسسوارات الراقية.",
                "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=200&fit=crop",
                "care@velvetluxe.com")
            {
                ContactPhone = "+966 55 000 7777",
                WebsiteUrl = "https://velvetluxe.example.com",
                Address = "Khobar, KSA",
                Category = "أسلوب حياة",
                IsActive = true
            },
            new ServiceProvider(Guid.NewGuid(), "Eco Earth", "منتجات صديقة للبيئة لحياة مستدامة.",
                "https://images.unsplash.com/photo-1591561954557-26941169b49e?w=200&h=200&fit=crop",
                "hello@ecoearth.com")
            {
                ContactPhone = "+966 55 000 8888",
                WebsiteUrl = "https://ecoearth.example.com",
                Address = "Medina, KSA",
                Category = "استدامة",
                IsActive = true
            },
            new ServiceProvider(Guid.NewGuid(), "Game Forge", "مستلزمات الألعاب وأجهزة الترفيه الحديثة.",
                "https://images.unsplash.com/photo-1614680376593-902f74cf0d41?w=200&h=200&fit=crop",
                "support@gameforge.com")
            {
                ContactPhone = "+966 55 000 9999",
                WebsiteUrl = "https://gameforge.example.com",
                Address = "Riyadh, KSA",
                Category = "ألعاب",
                IsActive = true
            },
            new ServiceProvider(Guid.NewGuid(), "Travel Pro", "حقائب ومستلزمات سفر عملية للمغامرين.",
                "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=200&h=200&fit=crop",
                "info@travelpro.com")
            {
                ContactPhone = "+966 55 000 1212",
                WebsiteUrl = "https://travelpro.example.com",
                Address = "Jeddah, KSA",
                Category = "سفر",
                IsActive = true
            }
        };
    }

    private static List<Product> BuildProducts(IReadOnlyList<ServiceProvider> providers)
    {
        var productNames = new[]
        {
            "مجموعة أساسية", "باقة احترافية", "نسخة مطورة", "إصدار محدود", "خيار ذكي", "حل متكامل"
        };

        var imageUrls = new[]
        {
            "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=600&fit=crop",
            "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop",
            "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=600&h=600&fit=crop",
            "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&h=600&fit=crop",
            "https://images.unsplash.com/photo-1503602642458-232111445657?w=600&h=600&fit=crop",
            "https://images.unsplash.com/photo-1517705008128-361805f42e86?w=600&h=600&fit=crop",
            "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=600&h=600&fit=crop",
            "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=600&h=600&fit=crop",
            "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=600&fit=crop",
            "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=600&h=600&fit=crop"
        };

        var products = new List<Product>();
        var providerIndex = 0;

        foreach (var provider in providers)
        {
            for (var i = 0; i < 6; i++)
            {
                products.Add(new Product(
                    Guid.NewGuid(),
                    provider.Id,
                    $"{provider.Name} - {productNames[i % productNames.Length]}",
                    $"منتج مميز من {provider.Name} يناسب احتياجاتك اليومية.",
                    99 + (i * 75) + (providerIndex * 10),
                    imageUrls[(providerIndex + i) % imageUrls.Length]
                ));
            }
            providerIndex++;
        }

        return products;
    }

    private static List<Service> BuildServices(IReadOnlyList<ServiceProvider> providers)
    {
        var serviceNames = new[]
        {
            "استشارة متقدمة", "تركيب احترافي", "خطة دعم", "جلسة تدريب", "مراجعة شاملة"
        };

        var services = new List<Service>();
        var providerIndex = 0;

        foreach (var provider in providers)
        {
            for (var i = 0; i < 4; i++)
            {
                var service = new Service(
                    Guid.NewGuid(),
                    provider.Id,
                    $"{serviceNames[i % serviceNames.Length]} - {provider.Name}",
                    $"خدمة احترافية مقدمة من {provider.Name} لضمان أفضل تجربة.",
                    150 + (i * 100) + (providerIndex * 15)
                )
                {
                    PriceUnit = i % 2 == 0 ? "للساعة" : "للمشروع"
                };

                services.Add(service);
            }
            providerIndex++;
        }

        return services;
    }

    private static List<PageContent> BuildContents()
    {
        return new List<PageContent>
        {
            new(Guid.NewGuid(), "home_hero_title", "حيث تنبض العلامات بالحياة", "Home", PageContentType.Text),
            new(Guid.NewGuid(), "home_hero_subtitle", "اكتشف منتجات مبتكرة من أكثر العلامات التجارية إبداعًا في مكان واحد.", "Home", PageContentType.Text),
            new(Guid.NewGuid(), "home_cta_title", "هل أنت مستعد لعرض علامتك التجارية؟", "Home", PageContentType.Text),
            new(Guid.NewGuid(), "home_cta_subtitle", "انضم إلى قاعة المعارض واعرض منتجاتك أمام آلاف الزوار.", "Home", PageContentType.Text),
            new(Guid.NewGuid(), "home_hero_image", "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=1200&h=800&fit=crop", "Home", PageContentType.Image),
            new(Guid.NewGuid(), "about_intro", "بازازون منصة رقمية تربط العلامات التجارية بالعملاء عبر تجربة معرض غامرة.", "About", PageContentType.Text),
            new(Guid.NewGuid(), "about_mission", "مهمتنا تمكين الشركات من الوصول إلى جمهور أوسع من خلال تجربة رقمية مميزة.", "About", PageContentType.Text),
            new(Guid.NewGuid(), "contact_email", "support@bazarzone.com", "Contact", PageContentType.Text),
            new(Guid.NewGuid(), "contact_phone", "+966 11 000 0000", "Contact", PageContentType.Text),
            new(Guid.NewGuid(), "footer_about", "بازازون - تجربة تسوق رقمية متكاملة.", "Footer", PageContentType.Text),
            new(Guid.NewGuid(), "footer_instagram", "https://instagram.com/bazarzone", "Footer", PageContentType.Link),
            new(Guid.NewGuid(), "footer_twitter", "https://x.com/bazarzone", "Footer", PageContentType.Link)
        };
    }
}
