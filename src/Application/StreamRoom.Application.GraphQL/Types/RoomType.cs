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
            .Description("Room users.");

        descriptor
            .Field(type => type.Src)
            .Description("Room media source is playing now.");
    }
}
