namespace StreamRoom.Application.GraphQL.Mutations.AddUserToRoom;

public class AddUserToRoomMutation : ObjectTypeExtension<Mutation>
{
    protected override void Configure(IObjectTypeDescriptor<Mutation> descriptor)
    {
        descriptor
            .Field(nameof(AddUserToRoomMutation).ToGqlName())
            .Authorize()
            .Argument("input", argument => argument.Type<NonNullType<AddUserToRoomInputType>>())
            .ResolveWith<AddUserToRoomResolver>(resolver => resolver.AddUserToRoomAsync(default!, default!, default!))
            .Description("Add user to room.");
    }

    private class AddUserToRoomResolver
    {
        public async Task<AddUserToRoomPayload> AddUserToRoomAsync(
            AddUserToRoomInput input,
            [Service] IRoomRepository roomRepository,
            [Service] IUserRepository userRepository)
        {
            var room = await roomRepository.GetAsync(input.RoomId);
            _ = room ?? throw new GraphQLException("Room not found");

            var user = await userRepository.GetAsync(input.UserId);
            _ = user ?? throw new GraphQLException("User not found");

            room.UserIds.Add(user.Id);

            await roomRepository.UpdateAsync(room);

            return new(room.Id);
        }
    }
}
