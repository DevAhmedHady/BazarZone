using System;
using System.Threading.Tasks;
using BazarZone.Sliders;
using Volo.Abp.Data;
using Volo.Abp.DependencyInjection;
using Volo.Abp.Domain.Repositories;

namespace BazarZone.Domain.Data;

public class SliderDataSeedContributor : IDataSeedContributor, ITransientDependency
{
    private readonly IRepository<SliderBanner, Guid> _sliderRepository;

    public SliderDataSeedContributor(IRepository<SliderBanner, Guid> sliderRepository)
    {
        _sliderRepository = sliderRepository;
    }

    public async Task SeedAsync(DataSeedContext context)
    {
        // Delete existing sliders and reseed with new images
        var existingSliders = await _sliderRepository.GetListAsync();
        foreach (var slider in existingSliders)
        {
            await _sliderRepository.DeleteAsync(slider);
        }

        /* Before Hero Sliders */
        await CreateSliderAsync(
            "عروض الموسم الجديد",
            "اكتشف أحدث المنتجات والعروض الحصرية لهذا الموسم",
            "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=80", // Modern Building Abstract
            "/catalog",
            SliderPosition.BeforeHero,
            0
        );

        await CreateSliderAsync(
            "تسوق من أفضل العلامات التجارية",
            "مئات المنتجات المميزة من علامات تجارية عالمية",
            "https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=1920&q=80", // Clean Office
            null,
            SliderPosition.BeforeHero,
            1
        );

        await CreateSliderAsync(
            "خصومات تصل إلى 50%",
            "لا تفوت فرصة الحصول على أفضل الأسعار",
            "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=1920&q=80", // Abstract Shapes
            null,
            SliderPosition.BeforeHero,
            2
        );

        /* After Hero Sliders */
        await CreateSliderAsync(
            "انضم كشريك تجاري",
            "اعرض منتجاتك في معرضنا الرقمي وتواصل مع آلاف العملاء",
            "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=1920&q=80", // Code/Tech Abstract
            "/contact",
            SliderPosition.AfterHero,
            0
        );

        await CreateSliderAsync(
            "خدمة عملاء على مدار الساعة",
            "فريق دعم متخصص لمساعدتك في أي وقت",
            "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=1920&q=80", // Clean Workspace
            null,
            SliderPosition.AfterHero,
            1
        );

        /* Provider List Sliders (New) */
        await CreateSliderAsync(
            "مزودون مميزون",
            "تعرف على نخبة من أفضل مزودي الخدمات لدينا",
            "https://images.unsplash.com/photo-1557683316-973673baf926?w=1920&q=80", // Blue Gradient
            null,
            SliderPosition.ProviderList,
            0
        );

        await CreateSliderAsync(
            "الأعلى تقييماً",
            "خدمات نالت رضا وثقة عملائنا",
            "https://images.unsplash.com/photo-1614850523060-8da1d56e37def?w=1920&q=80", // Abstract Waves
            null,
            SliderPosition.ProviderList,
            1
        );

        await CreateSliderAsync(
            "وصل حديثاً",
            "اكتشف أحدث المنضمين لمنصتنا",
            "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=1920&q=80", // Modern Arch
            null,
            SliderPosition.ProviderList,
            2
        );

        await CreateSliderAsync(
            "عروض خاصة",
            "باقات وخصومات حصرية لفترة محدودة",
            "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1920&q=80", // Dark Abstract
            null,
            SliderPosition.ProviderList,
            3
        );

        await CreateSliderAsync(
            "محترفون معتمدون",
            "جودة وموثوقية عالية في الأداء",
            "https://images.unsplash.com/photo-1507919909716-c82196f534be?w=1920&q=80", // Soft Light
            null,
            SliderPosition.ProviderList,
            4
        );
    }

    private async Task CreateSliderAsync(
        string title,
        string? description,
        string imageUrl,
        string? linkUrl,
        SliderPosition position,
        int sortOrder)
    {
        var slider = new SliderBanner(Guid.NewGuid(), title, imageUrl, position, sortOrder)
        {
            Description = description,
            LinkUrl = linkUrl,
            IsVisible = true
        };

        await _sliderRepository.InsertAsync(slider);
    }
}
