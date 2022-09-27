namespace StreamRoom.Application.GraphQL.Mutations.RemoveUserFromRoom;
public record RemoveUserFromRoomInput(Guid UserId, Guid RoomId);
