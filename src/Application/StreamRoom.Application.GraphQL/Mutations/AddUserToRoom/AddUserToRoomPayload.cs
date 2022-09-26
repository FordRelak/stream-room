namespace StreamRoom.Application.GraphQL.Mutations.AddUserToRoom;

public class AddUserToRoomPayload
{
    public AddUserToRoomPayload(Guid roomId)
    {
        RoomId = roomId;
    }

    public Guid RoomId { get; set; }
}
