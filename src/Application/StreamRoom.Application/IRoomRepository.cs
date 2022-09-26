using StreamRoom.Domain;

namespace StreamRoom.Application;

public interface IRoomRepository : IRepository<Room>
{
    Task<IReadOnlySet<Guid>> GetRoomUsersAsync(Guid roomId);
}
