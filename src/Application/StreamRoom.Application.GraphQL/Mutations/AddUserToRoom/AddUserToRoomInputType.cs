namespace StreamRoom.Application.GraphQL.Mutations.AddUserToRoom;

public class AddUserToRoomInputType : InputObjectType<AddUserToRoomInput>
{
    protected override void Configure(IInputObjectTypeDescriptor<AddUserToRoomInput> descriptor)
    {
        descriptor
            .Description("Type for add user to room.");

        descriptor
            .Field(input => input.RoomId)
            .Type<NonNullType<UuidType>>()
            .Description("Room id.");

        descriptor
            .Field(input => input.UserId)
            .Type<NonNullType<UuidType>>()
            .Description("User id.");
    }
}
