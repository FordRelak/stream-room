using StreamRoom.Domain;

namespace StreamRoom.Application.Repositories;

public interface IRoomRepository : IRepository<Room>
{
    Task<IReadOnlySet<Guid>> GetRoomUsersAsync(Guid roomId);
}
