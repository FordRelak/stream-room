namespace StreamRoom.Application.GraphQL.Dtos;

internal class CommandDto
{
    public CommandDto(CommandTypeEnum commandType, Guid roomId, Guid userId)
    {
        CommandType = commandType;
        RoomId = roomId;
        UserId = userId;
    }

    public CommandTypeEnum CommandType { get; set; }

    public Guid RoomId { get; set; }

    public Guid UserId { get; set; }
}
