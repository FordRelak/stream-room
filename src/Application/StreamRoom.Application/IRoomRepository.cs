using StreamRoom.Domain;

namespace StreamRoom.Application;
public interface IRoomRepository : IRepository<Room>
{
    Task<IReadOnlyList<User>> GetRoomUsersAsync(Guid roomId);
}
