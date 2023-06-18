using StreamRoom.Application.Repositories;

namespace StreamRoom.Application.GraphQL.Mutations.AddRoom;

public class AddRoomMutation : ObjectTypeExtension<Mutation>
{
    protected override void Configure(IObjectTypeDescriptor<Mutation> descriptor)
    {
        descriptor
            .Field(nameof(AddRoomMutation).ToGqlName())
            .Argument("input", argument => argument.Type<NonNullType<AddRoomInputType>>())
            .ResolveWith<AddRoomResolver>(resolver => resolver.AddRoomAsync(default!, default!))
            .Description("Add room.");
    }

    private class AddRoomResolver
    {
        public async Task<AddRoomPayload> AddRoomAsync(AddRoomInput input, [Service] IRoomRepository roomRepository)
        {
            var room = new Room
            {
                Name = input.Name,
            };

            await roomRepository.InsertAsync(room);

            return new(room.Id);
        }
    }
}
