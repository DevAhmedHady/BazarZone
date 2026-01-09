using Riok.Mapperly.Abstractions;
using Volo.Abp.Mapperly;
using BazarZone.Books;

namespace BazarZone.Web;

[Mapper(RequiredMappingStrategy = RequiredMappingStrategy.Target)]
public partial class BazarZoneWebMappers : MapperBase<BookDto, CreateUpdateBookDto>
{
    public override partial CreateUpdateBookDto Map(BookDto source);

    public override partial void Map(BookDto source, CreateUpdateBookDto destination);
}
