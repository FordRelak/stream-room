namespace StreamRoom.Application.GraphQL.Mutations.RemoveUserFromRoom;
public class RemoveUserFromRoomInputType : InputObjectType<RemoveUserFromRoomInput>
{
    protected override void Configure(IInputObjectTypeDescriptor<RemoveUserFromRoomInput> descriptor)
    {
        descriptor
            .Description("Input for remove user from room.");

        descriptor
            .Field(type => type.UserId)
            .Type<NonNullType<UuidType>>()
            .Description("User id.");

        descriptor
            .Field(type => type.RoomId)
            .Type<NonNullType<UuidType>>()
            .Description("Room id.");
    }
}
