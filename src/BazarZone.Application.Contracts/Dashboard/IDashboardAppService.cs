using System.Collections.Generic;
using System.Threading.Tasks;
using Volo.Abp.Application.Services;

namespace BazarZone.Dashboard
{
    public interface IDashboardAppService : IApplicationService
    {
        Task<DashboardSummaryDto> GetSummaryAsync();
        Task<DashboardTimeseriesDto> GetTimeseriesAsync(DashboardTimeseriesInputDto input);
        Task<List<DashboardRecentActivityDto>> GetRecentActivityAsync();
    }
}
