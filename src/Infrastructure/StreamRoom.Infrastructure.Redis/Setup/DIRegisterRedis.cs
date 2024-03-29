﻿using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using StackExchange.Redis;
using StreamRoom.Application.Repositories;

namespace StreamRoom.Infrastructure.Redis.Setup;

public static class DIRegisterRedis
{
    public static IServiceCollection RegisterRedis(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddSingleton<IConnectionMultiplexer>(ConnectionMultiplexer.Connect(configuration.GetConnectionString("Redis")));

        services.AddScoped<IRoomRepository, RedisRoomRepository>();
        services.AddScoped<IUserRepository, RedisUserRepository>();

        return services;
    }
}
