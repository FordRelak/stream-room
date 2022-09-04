namespace StreamRoom.Application.GraphQL.Queries.Rooms;

public class GetRoomsQuery : ObjectTypeExtension<Query>
{
    protected override void Configure(IObjectTypeDescriptor<Query> descriptor)
    {
        descriptor
            .Field(nameof(GetRoomsQuery).ToGqlName())
            .Type<ListType<RoomType>>()
            .ResolveWith<GetRoomsResolver>(resolver => resolver.GetRoomAsync(default!))
            .Description("Get rooms.");
    }

    private class GetRoomsResolver
    {
        public Task<IReadOnlyList<Room>> GetRoomAsync([Service] IRoomRepository roomRepository)
        {
            return roomRepository.GetAllAsync();
        }
    }
}
