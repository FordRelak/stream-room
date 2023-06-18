using StreamRoom.Application.Repositories;

namespace StreamRoom.Application.GraphQL.Queries.Rooms;

public class GetRoomsQuery : ObjectTypeExtension<Query>
{
    protected override void Configure(IObjectTypeDescriptor<Query> descriptor)
    {
        descriptor
            .Field(nameof(GetRoomsQuery).ToGqlName())
            .Authorize()
            .Type<ListType<RoomType>>()
            .ResolveWith<GetRoomsResolver>(resolver => resolver.GetRoomsAsync(default!))
            .Description("Get rooms.");
    }

    private class GetRoomsResolver
    {
        public Task<IReadOnlyList<Room>> GetRoomsAsync([Service] IRoomRepository roomRepository)
        {
            return roomRepository.GetAllAsync();
        }
    }
}
