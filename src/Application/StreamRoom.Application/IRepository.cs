using StreamRoom.Domain;

namespace StreamRoom.Application;
public interface IRepository<T> where T : Base
{
    Task<IReadOnlyList<T>> GetAllAsync();
    Task<bool> InsertAsync(T value);
}
