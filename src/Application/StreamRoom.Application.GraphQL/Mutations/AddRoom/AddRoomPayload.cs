using StreamRoom.Application.GraphQL.Common;

namespace StreamRoom.Application.GraphQL.Mutations.AddRoom;
public class AddRoomPayload : Payload
{
    public AddRoomPayload(Guid id)
    {
        Id = id;
    }
    public Guid Id { get; set; }
}
