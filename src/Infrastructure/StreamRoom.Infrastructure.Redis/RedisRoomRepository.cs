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

    public override string HashName => nameof(Room).ToLower();
}
