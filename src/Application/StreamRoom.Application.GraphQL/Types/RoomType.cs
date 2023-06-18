using StreamRoom.Application.Repositories;

namespace StreamRoom.Application.GraphQL.Types;

public class RoomType : ObjectType<Room>
{
    protected override void Configure(IObjectTypeDescriptor<Room> descriptor)
    {
        descriptor
            .Field(type => type.Id)
            .Type<UuidType>()
            .Description("Room Id.");

        descriptor
            .Field(type => type.Name)
            .Type<StringType>()
            .Description("Room name.");

        descriptor
            .Field($"{nameof(User)}s".ToGqlName())
            .ResolveWith<RoomUsersResolver>(resolver => resolver.GetRoomUsersAsync(default!, default!, default!))
            .Description("Room user ids.");

        descriptor
            .Field(type => type.Src)
            .Type<StringType>()
            .Description("Room media source is playing now.");

        descriptor
            .Field(type => type.UserIds)
            .Ignore();
    }

    private class RoomUsersResolver
    {
        public async Task<IReadOnlyList<User>> GetRoomUsersAsync(
            [Parent] Room room,
            [Service] IRoomRepository roomRepository,
            [Service] IUserRepository userRepository)
        {
            var roomUserIds = await roomRepository.GetRoomUsersAsync(room.Id);

            return await userRepository.GetAsync(roomUserIds.ToArray());
        }
    }
}
