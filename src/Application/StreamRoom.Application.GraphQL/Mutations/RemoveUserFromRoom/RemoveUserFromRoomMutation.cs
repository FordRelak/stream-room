using StreamRoom.Application.Repositories;

namespace StreamRoom.Application.GraphQL.Mutations.RemoveUserFromRoom;

public class RemoveUserFromRoomMutation : ObjectType<Mutation>
{
    protected override void Configure(IObjectTypeDescriptor<Mutation> descriptor)
    {
        descriptor
            .Description("Remove user from room.");

        descriptor
            .Field(nameof(RemoveUserFromRoomMutation).ToGqlName())
            .Argument("input", argument => argument.Type<NonNullType<RemoveUserFromRoomInputType>>())
            .ResolveWith<RemoveUserFromRoomResovler>(resolver => resolver.RemoveUserFromRoomAsync(default!, default!))
            .Description("Input for remove user from room.");
    }

    private class RemoveUserFromRoomResovler
    {
        public async Task<RemoveUserFromRoomPayload> RemoveUserFromRoomAsync(RemoveUserFromRoomInput input, [Service] IRoomRepository roomRepository)
        {
            var room = await roomRepository.GetAsync(input.RoomId);

            _ = room ?? throw new GraphQLException($"Room with id = {input.RoomId} not found.");

            room.UserIds.Remove(input.UserId);

            await roomRepository.UpdateAsync(room);

            return new(input.RoomId);
        }
    }
}
