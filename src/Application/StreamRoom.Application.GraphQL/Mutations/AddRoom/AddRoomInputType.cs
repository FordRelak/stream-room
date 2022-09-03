using HotChocolate.Types;

namespace StreamRoom.Application.GraphQL.Mutations.AddRoom;
public class AddRoomInputType : InputObjectType<AddRoomInput>
{
    protected override void Configure(IInputObjectTypeDescriptor<AddRoomInput> descriptor)
    {
        descriptor
            .Field(input => input.Name)
            .Description("Name of the room")
            .Type<NonNullType<StringType>>();
    }
}
