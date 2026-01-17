using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Volo.Abp;
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
        private readonly IHttpContextAccessor _httpContextAccessor;

        public VisitLogAppService(
            IRepository<VisitLog, Guid> visitLogRepository,
            IHttpContextAccessor httpContextAccessor)
        {
            _visitLogRepository = visitLogRepository;
            _httpContextAccessor = httpContextAccessor;
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
                ReferrerUrl = context.Request.Headers.Referer.ToString(),
                UserAgent = context.Request.Headers.UserAgent.ToString(),
                IpAddress = context.Connection.RemoteIpAddress?.ToString(),
                IsAuthenticated = CurrentUser.IsAuthenticated,
                UserId = CurrentUser.Id,
                Source = "web"
            };

            await _visitLogRepository.InsertAsync(visit);
        }
    }
}
