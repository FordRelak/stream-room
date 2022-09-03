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
    public abstract string HashName { get; }

    public async Task<T> GetAsync(Guid id)
    {
        var value = await _database.HashGetAsync(HashName, id.ToString());

        return JsonSerializer.Deserialize<T>(value, _jsonSerializerOptions);
    }

    public Task<bool> InsertAsync(T value)
    {
        value.Id = Guid.NewGuid();

        var serializedValue = JsonSerializer.Serialize(value, _jsonSerializerOptions);

        return _database.HashSetAsync(HashName, value.Id.ToString(), serializedValue);
    }

    public async Task<IReadOnlyList<T>> GetAllAsync()
    {
        var values = await _database.HashGetAllAsync(HashName);

        return !values.Any()
            ? Array.Empty<T>()
            : Array.ConvertAll(values, value => JsonSerializer.Deserialize<T>(value.Value, _jsonSerializerOptions)) as IReadOnlyList<T>;
    }
}
