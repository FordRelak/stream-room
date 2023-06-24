using Microsoft.Extensions.Options;
using StackExchange.Redis;
using StreamRoom.Application.Repositories;
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

    public Task<IReadOnlySet<Guid>> GetRoomUsersAsync(Guid roomId)
    {
        return GetAsync(roomId)
            .ContinueWith(task => task.Result?.UserIds as IReadOnlySet<Guid> ?? new HashSet<Guid>(), TaskContinuationOptions.OnlyOnRanToCompletion);
    }
}
