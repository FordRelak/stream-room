namespace StreamRoom.Application.GraphQL.Mutations.SetRoomSource;
public class SetRoomSourceInputType : InputObjectType<SetRoomSourceInput>
{
    protected override void Configure(IInputObjectTypeDescriptor<SetRoomSourceInput> descriptor)
    {
        descriptor
            .Field(type => type.RoomId)
            .Description("Room id.");

        descriptor
            .Field(type => type.Source)
            .Description("New source.");
    }
}
