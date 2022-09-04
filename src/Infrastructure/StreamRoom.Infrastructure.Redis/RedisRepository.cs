using StackExchange.Redis;
using StreamRoom.Application;
using StreamRoom.Domain;
using System.Text.Json;

namespace StreamRoom.Infrastructure.Redis;

public abstract class RedisRepository<T> : IRepository<T> where T : Base
{
    private readonly JsonSerializerOptions _jsonSerializerOptions;
    private readonly IDatabase _database;

    public RedisRepository(
        IConnectionMultiplexer connectionMultiplexer,
        JsonSerializerOptions jsonSerializerOptions)
    {
        _jsonSerializerOptions = jsonSerializerOptions;
        _database = connectionMultiplexer.GetDatabase();
    }

    protected abstract string HashName { get; }

    protected IDatabase Database => _database;

    protected JsonSerializerOptions JsonSerializerOptions => _jsonSerializerOptions;

    public Task<T?> GetAsync(Guid id)
    {
        return _database.HashGetAsync(HashName, id.ToString())
            .ContinueWith(task =>
            {
                return task.Result.HasValue ?
                    JsonSerializer.Deserialize<T>(task.Result!, _jsonSerializerOptions) :
                    default;
            }, TaskContinuationOptions.OnlyOnRanToCompletion);
    }

    public Task<bool> InsertAsync(T value)
    {
        value.Id = Guid.NewGuid();

        var serializedValue = JsonSerializer.Serialize(value, _jsonSerializerOptions);

        return _database.HashSetAsync(HashName, value.Id.ToString(), serializedValue);
    }

    public Task<IReadOnlyList<T>> GetAllAsync()
    {
        return _database.HashGetAllAsync(HashName)
            .ContinueWith(task =>
            {
                return !task.Result.Any()
                    ? Array.Empty<T>()
                    : Array.ConvertAll(task.Result, value => JsonSerializer.Deserialize<T>(value.Value!, _jsonSerializerOptions)) as IReadOnlyList<T>;
            }, TaskContinuationOptions.OnlyOnRanToCompletion);
    }
}
