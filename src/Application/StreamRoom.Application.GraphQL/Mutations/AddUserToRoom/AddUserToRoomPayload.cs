namespace StreamRoom.Application.GraphQL.Mutations.AddUserToRoom;

public class AddUserToRoomPayload : Payload
{
    public AddUserToRoomPayload(Guid roomId)
    {
        RoomId = roomId;
    }

    public Guid RoomId { get; set; }
}
