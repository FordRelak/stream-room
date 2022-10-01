namespace StreamRoom.Application.GraphQL.Mutations.RemoveUserFromRoom;

public class RemoveUserFromRoomPayload : Payload
{
    public RemoveUserFromRoomPayload(Guid roomId)
    {
        RoomId = roomId;
    }

    public Guid RoomId { get; set; }
}
