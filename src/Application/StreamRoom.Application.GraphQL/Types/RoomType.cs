namespace StreamRoom.Application.GraphQL.Types;
public class RoomType : ObjectType<Room>
{
    protected override void Configure(IObjectTypeDescriptor<Room> descriptor)
    {
        descriptor
            .Field(type => type.Id)
            .Description("Room Id.");

        descriptor
            .Field(type => type.Name)
            .Description("Room name.");

        descriptor
            .Field(type => type.Users)
            .ResolveWith<RoomUsersResolver>(resolver => resolver.GetRoomUsersAsync(default!, default!))
            .Type<UserType>()
            .Description("Room users.");

        descriptor
            .Field(type => type.Src)
            .Description("Room media source is playing now.");
    }

    private class RoomUsersResolver
    {
        public Task<IReadOnlyList<User>> GetRoomUsersAsync([Parent] Room room, [Service] IRoomRepository roomRepository)
        {
            return roomRepository.GetRoomUsersAsync(room.Id);
        }
    }
}
