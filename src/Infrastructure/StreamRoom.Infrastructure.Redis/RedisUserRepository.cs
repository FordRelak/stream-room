using StackExchange.Redis;
using StreamRoom.Application;
using StreamRoom.Domain;
using System.Text.Json;

namespace StreamRoom.Infrastructure.Redis;
public class RedisUserRepository : RedisRepository<User>, IUserRepository
{
    public RedisUserRepository(
        IConnectionMultiplexer connectionMultiplexer,
        JsonSerializerOptions jsonSerializerOptions) : base(connectionMultiplexer, jsonSerializerOptions)
    {
    }

    public override string HashName => nameof(User).ToLower();
}
