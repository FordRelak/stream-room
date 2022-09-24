namespace StreamRoom.Application.GraphQL.Queries.Rooms;

public class GetRoomByIdQuery : ObjectTypeExtension<Query>
{
    protected override void Configure(IObjectTypeDescriptor<Query> descriptor)
    {
        descriptor
            .Field(nameof(GetRoomByIdQuery).ToGqlName())
            .Argument("id", argument => argument.Type<NonNullType<IdType>>())
            .Type<RoomType>()
            .ResolveWith<GetRoomByIdResolver>(resolver => resolver.GetRoomByIdAsync(default!, default!))
            .Description("Get room by id.");
    }

    private class GetRoomByIdResolver
    {
        public Task<Room?> GetRoomByIdAsync(Guid id, [Service] IRoomRepository roomRepository)
        {
            return roomRepository.GetAsync(id);
        }
    }
}
