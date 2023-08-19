using StreamRoom.Application.GraphQL.Middlewares.ClaimUser;

namespace StreamRoom.Application.GraphQL.Mutations.AddRoom;

public class AddRoomMutation : ObjectTypeExtension<Mutation>
{
    protected override void Configure(IObjectTypeDescriptor<Mutation> descriptor)
    {
        descriptor
            .Field(nameof(AddRoomMutation).ToGqlName())
            .Authorize()
            .Use<ClaimUserMiddleware>()
            .Argument("input", argument => argument.Type<NonNullType<AddRoomInputType>>())
            .ResolveWith<AddRoomResolver>(resolver => resolver.AddRoomAsync(default!, default!, default!))
            .Description("Add room.");
    }

    private class AddRoomResolver
    {
        public async Task<AddRoomPayload> AddRoomAsync(
            AddRoomInput input,
            [Service] IRoomRepository roomRepository,
            [ClaimUser] User? roomAuthor)
        {
            if(roomAuthor is null)
            {
                throw new GraphQLException("User is not defined");
            }

            var room = new Room
            {
                Name = input.Name,
                AdminId = roomAuthor.Id
            };

            await roomRepository.InsertAsync(room);

            return new(room.Id);
        }
    }
}
