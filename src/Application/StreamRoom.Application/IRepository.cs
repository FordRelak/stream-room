using StreamRoom.Domain;

namespace StreamRoom.Application;

public interface IRepository<T> where T : Base
{
    Task<IReadOnlyList<T>> GetAllAsync();

    Task<T?> GetAsync(Guid id);

    Task<IReadOnlyList<T>> GetAsync(Guid[] ids);

    Task<bool> InsertAsync(T value);

    Task<bool> UpdateAsync(T value);
}
