using Volo.Abp.Application.Dtos;

namespace BazarZone.Content
{
    public class GetPageContentInput : PagedAndSortedResultRequestDto
    {
        public string? Filter { get; set; }
        public string? Section { get; set; }
    }
}
