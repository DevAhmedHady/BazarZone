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
            "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920&q=80",
            "/catalog",
            SliderPosition.BeforeHero,
            0
        );

        await CreateSliderAsync(
            "تسوق من أفضل العلامات التجارية",
            "مئات المنتجات المميزة من علامات تجارية عالمية",
            "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=80",
            null,
            SliderPosition.BeforeHero,
            1
        );

        await CreateSliderAsync(
            "خصومات تصل إلى 50%",
            "لا تفوت فرصة الحصول على أفضل الأسعار",
            "https://images.unsplash.com/photo-1607082350899-7e105aa886ae?w=1920&q=80",
            null,
            SliderPosition.BeforeHero,
            2
        );

        /* After Hero Sliders */
        await CreateSliderAsync(
            "انضم كشريك تجاري",
            "اعرض منتجاتك في معرضنا الرقمي وتواصل مع آلاف العملاء",
            "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1920&q=80",
            "/contact",
            SliderPosition.AfterHero,
            0
        );

        await CreateSliderAsync(
            "خدمة عملاء على مدار الساعة",
            "فريق دعم متخصص لمساعدتك في أي وقت",
            "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1920&q=80",
            null,
            SliderPosition.AfterHero,
            1
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
