namespace StreamRoom.Application.GraphQL.Mutations.AddUserToRoom;

public record AddUserToRoomInput(Guid RoomId, Guid UserId);
