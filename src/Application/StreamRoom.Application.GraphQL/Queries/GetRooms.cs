using HotChocolate;
using HotChocolate.Types;
using StreamRoom.Application.GraphQL.Common;
using StreamRoom.Common;
using StreamRoom.Domain;

namespace StreamRoom.Application.GraphQL.Queries;
public class GetRooms : ObjectTypeExtension<Query>
{
    protected override void Configure(IObjectTypeDescriptor<Query> descriptor)
    {
        descriptor
            .Field(nameof(GetRooms).ToGqlName())
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

