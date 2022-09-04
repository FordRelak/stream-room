namespace StreamRoom.Application.GraphQL.Mutations.AddRoom;

public class AddRoomInputType : InputObjectType<AddRoomInput>
{
    protected override void Configure(IInputObjectTypeDescriptor<AddRoomInput> descriptor)
    {
        descriptor
            .Description("Type to add new room.");

        descriptor
            .Field(type => type.Name)
            .Type<NonNullType<StringType>>()
            .Description("Name of a new room.");
    }
}
