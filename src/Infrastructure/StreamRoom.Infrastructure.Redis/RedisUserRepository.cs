using Microsoft.Extensions.Options;
using StackExchange.Redis;
using StreamRoom.Application;
using StreamRoom.Domain;
using System.Text.Json;

namespace StreamRoom.Infrastructure.Redis;
public class RedisUserRepository : RedisRepository<User>, IUserRepository
{
    public RedisUserRepository(
        IConnectionMultiplexer connectionMultiplexer,
        IOptions<JsonSerializerOptions> jsonSerializerOptions) : base(connectionMultiplexer, jsonSerializerOptions.Value)
    {
    }

    protected override string HashName => nameof(User).ToLower();
}
