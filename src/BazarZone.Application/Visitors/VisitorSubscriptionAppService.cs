using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Volo.Abp;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;
using BazarZone.Visitors;
using System.Collections.Generic;

namespace BazarZone.Visitors
{
    [RemoteService]
    [Route("api/app/visitor-subscription")]
    public class VisitorSubscriptionAppService : BazarZoneAppService
    {
        private readonly IRepository<VisitorSubscription, Guid> _repository;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public VisitorSubscriptionAppService(
            IRepository<VisitorSubscription, Guid> repository,
            IHttpContextAccessor httpContextAccessor)
        {
            _repository = repository;
            _httpContextAccessor = httpContextAccessor;
        }

        [AllowAnonymous]
        [HttpPost]
        public async Task<VisitorSubscriptionDto> CreateAsync(CreateVisitorSubscriptionDto input)
        {
            var entity = ObjectMapper.Map<CreateVisitorSubscriptionDto, VisitorSubscription>(input);
            entity.IpAddress = _httpContextAccessor.HttpContext?.Connection?.RemoteIpAddress?.ToString() ?? string.Empty;
            entity.UserAgent = _httpContextAccessor.HttpContext?.Request?.Headers["User-Agent"].ToString();

            await _repository.InsertAsync(entity);

            return ObjectMapper.Map<VisitorSubscription, VisitorSubscriptionDto>(entity);
        }

        [HttpGet]
        public async Task<PagedResultDto<VisitorSubscriptionDto>> GetListAsync(PagedAndSortedResultRequestDto input)
        {
             if (input.Sorting.IsNullOrWhiteSpace())
            {
                input.Sorting = nameof(VisitorSubscription.CreationTime) + " desc";
            }

            var count = await _repository.GetCountAsync();
            var list = await _repository.GetPagedListAsync(
                input.SkipCount,
                input.MaxResultCount,
                input.Sorting
            );

            return new PagedResultDto<VisitorSubscriptionDto>(
                count,
                ObjectMapper.Map<List<VisitorSubscription>, List<VisitorSubscriptionDto>>(list)
            );
        }
    }
}
