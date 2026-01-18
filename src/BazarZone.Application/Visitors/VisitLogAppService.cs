using System;
using System.Linq;
using System.Threading.Tasks;
using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Volo.Abp;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;
using BazarZone.Visitors;

namespace BazarZone.Visitors
{
    [RemoteService]
    [Route("api/app/visit-log")]
    public class VisitLogAppService : BazarZoneAppService
    {
        private readonly IRepository<VisitLog, Guid> _visitLogRepository;
        private readonly IRepository<VisitorSubscription, Guid> _subscriptionRepository;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public VisitLogAppService(
            IRepository<VisitLog, Guid> visitLogRepository,
            IRepository<VisitorSubscription, Guid> subscriptionRepository,
            IHttpContextAccessor httpContextAccessor)
        {
            _visitLogRepository = visitLogRepository;
            _subscriptionRepository = subscriptionRepository;
            _httpContextAccessor = httpContextAccessor;
        }

        [HttpGet]
        public async Task<PagedResultDto<VisitLogDto>> GetListAsync(PagedAndSortedResultRequestDto input)
        {
            if (input.Sorting.IsNullOrWhiteSpace())
            {
                input.Sorting = nameof(VisitLog.CreationTime) + " desc";
            }

            var count = await _visitLogRepository.GetCountAsync();
            var list = await _visitLogRepository.GetPagedListAsync(
                input.SkipCount,
                input.MaxResultCount,
                input.Sorting
            );

            return new PagedResultDto<VisitLogDto>(
                count,
                ObjectMapper.Map<List<VisitLog>, List<VisitLogDto>>(list)
            );
        }

        [AllowAnonymous]
        [HttpPost("track")]
        public async Task TrackAsync()
        {
            var context = _httpContextAccessor.HttpContext;
            if (context == null)
            {
                return;
            }

            var path = context.Request.Path.Value ?? "/";

            var visit = new VisitLog(GuidGenerator.Create(), path)
            {
                QueryString = context.Request.QueryString.HasValue ? context.Request.QueryString.Value : null,
                Method = context.Request.Method,
                ReferrerUrl = context.Request.Headers.Referer.ToString(),
                UserAgent = context.Request.Headers.UserAgent.ToString(),
                IpAddress = context.Connection.RemoteIpAddress?.ToString(),
                IsAuthenticated = CurrentUser.IsAuthenticated,
                UserId = CurrentUser.Id,
                Source = "web"
            };

            await _visitLogRepository.InsertAsync(visit);
        }

        [HttpGet("summaries")]
        public async Task<List<VisitorSummaryDto>> GetVisitorSummariesAsync()
        {
            var visitQuery = await _visitLogRepository.GetQueryableAsync();
            var subscriptionQuery = await _subscriptionRepository.GetQueryableAsync();

            var query = from v in visitQuery
                        group v by v.IpAddress into g
                        select new
                        {
                            IpAddress = g.Key,
                            VisitCount = g.Count(),
                            FirstVisitTime = g.Min(x => x.CreationTime),
                            LastVisitTime = g.Max(x => x.CreationTime)
                        };

            var joinedQuery = from g in query
                              join s in subscriptionQuery on g.IpAddress equals s.IpAddress into subs
                              from sub in subs.DefaultIfEmpty()
                              select new VisitorSummaryDto
                              {
                                  IpAddress = g.IpAddress,
                                  VisitCount = g.VisitCount,
                                  FirstVisitTime = g.FirstVisitTime,
                                  LastVisitTime = g.LastVisitTime,
                                  IsSubscribed = sub != null,
                                  SubscriptionName = sub != null ? sub.Name : null,
                                  SubscriptionEmail = sub != null ? sub.Email : null,
                                  SubscriptionPhoneNumber = sub != null ? sub.PhoneNumber : null,
                                  SubscriptionDate = sub != null ? sub.CreationTime : (DateTime?)null
                              };

            return await AsyncExecuter.ToListAsync(joinedQuery);
        }
    }
}

