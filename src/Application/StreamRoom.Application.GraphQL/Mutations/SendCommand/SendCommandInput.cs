namespace StreamRoom.Application.GraphQL.Mutations.SendCommand;

public record SendCommandInput(Guid UserId, Guid RoomId, CommandTypeEnum CommandType);
