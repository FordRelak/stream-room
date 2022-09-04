using Microsoft.Extensions.Options;
using StackExchange.Redis;
using StreamRoom.Application;
using StreamRoom.Domain;
using System.Text.Json;

namespace StreamRoom.Infrastructure.Redis;

public class RedisRoomRepository : RedisRepository<Room>, IRoomRepository
{
    public RedisRoomRepository(
        IConnectionMultiplexer connectionMultiplexer,
        IOptions<JsonSerializerOptions> jsonSerializerOptions) : base(connectionMultiplexer, jsonSerializerOptions.Value)
    {
    }

    protected override string HashName => nameof(Room).ToLower();

    public Task<IReadOnlyList<User>> GetRoomUsersAsync(Guid roomId)
    {
        return GetAsync(roomId)
            .ContinueWith(task => task.Result?.Users ?? Array.Empty<User>(), TaskContinuationOptions.OnlyOnRanToCompletion);
    }
}
