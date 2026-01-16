using System;
using System.Threading.Tasks;
using BazarZone.Content;
using Volo.Abp.Data;
using Volo.Abp.DependencyInjection;
using Volo.Abp.Domain.Repositories;

namespace BazarZone.Domain.Data;

public class PageContentDataSeedContributor : IDataSeedContributor, ITransientDependency
{
    private readonly IRepository<PageContent, Guid> _pageContentRepository;

    public PageContentDataSeedContributor(IRepository<PageContent, Guid> pageContentRepository)
    {
        _pageContentRepository = pageContentRepository;
    }

    public async Task SeedAsync(DataSeedContext context)
    {
        /* Home Page Content */
        
        // Hero Section
        await CreateContentAsync("Home_Hero_Badge_Text", "تجربة معرض رقمية", "Home", PageContentType.Text);
        await CreateContentAsync("Home_Hero_Title_Prefix", "حيث تنبض العلامات", "Home", PageContentType.Text);
        await CreateContentAsync("Home_Hero_Title_Highlight", "بالحياة", "Home", PageContentType.Text);
        await CreateContentAsync("Home_Hero_Description", "ادخل إلى قاعة المعارض الرقمية الخاصة بنا. اكتشف منتجات مبتكرة من أكثر العلامات التجارية إبداعًا في العالم، كلها في مكان واحد غامر.", "Home", PageContentType.Text);
        await CreateContentAsync("Home_Hero_Button_Explore", "استكشف الأجنحة", "Home", PageContentType.Text);
        await CreateContentAsync("Home_Hero_Button_Watch", "شاهد العرض", "Home", PageContentType.Text);

        // Exhibition Hall Section
        await CreateContentAsync("Home_Exhibition_Title", "قاعة المعارض", "Home", PageContentType.Text);
        await CreateContentAsync("Home_Exhibition_Description", "تصفح مجموعتنا المختارة من أجنحة العلامات التجارية. يعرض كل جناح منتجات فريدة من علامات تجارية رائدة.", "Home", PageContentType.Text);

        // Stats Section
        await CreateContentAsync("Home_Stats_BrandLabel", "شريك علامة تجارية", "Home", PageContentType.Text);
        await CreateContentAsync("Home_Stats_ProductsLabel", "منتج معروض", "Home", PageContentType.Text);
        await CreateContentAsync("Home_Stats_VisitorsCount", "٢٥ ألف", "Home", PageContentType.Text);
        await CreateContentAsync("Home_Stats_VisitorsLabel", "زائر شهريًا", "Home", PageContentType.Text);
        await CreateContentAsync("Home_Stats_SatisfactionCount", "١٠٠%", "Home", PageContentType.Text);
        await CreateContentAsync("Home_Stats_SatisfactionLabel", "رضا العملاء", "Home", PageContentType.Text);

        // CTA Section
        await CreateContentAsync("Home_CTA_Title", "هل أنت مستعد لعرض علامتك التجارية؟", "Home", PageContentType.Text);
        await CreateContentAsync("Home_CTA_Description", "انضم إلى قاعة المعارض الحصرية لدينا واعرض منتجاتك أمام آلاف الزوار المهتمين.", "Home", PageContentType.Text);
        await CreateContentAsync("Home_CTA_Button", "احصل على جناحك", "Home", PageContentType.Text);
    }

    private async Task CreateContentAsync(string key, string value, string section, PageContentType type)
    {
        if (!await _pageContentRepository.AnyAsync(x => x.Key == key))
        {
            await _pageContentRepository.InsertAsync(new PageContent(Guid.NewGuid(), key, value, section, type));
        }
    }
}
