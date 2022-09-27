namespace StreamRoom.Application.GraphQL.Mutations.RemoveUserFromRoom;
public class RemoveUserFromRoomPayload : Payload
{
    public Guid RoomId { get; set; }

    public RemoveUserFromRoomPayload(Guid roomId)
    {
        RoomId = roomId;
    }
}
