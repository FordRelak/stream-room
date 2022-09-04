using Microsoft.Extensions.DependencyInjection;
using StreamRoom.Application.GraphQL.Common;
using StreamRoom.Application.GraphQL.Filters;
using StreamRoom.Application.GraphQL.Mutations.AddRoom;
using StreamRoom.Application.GraphQL.Queries;
using StreamRoom.Application.GraphQL.Types;

namespace StreamRoom.Application.GraphQL.Setup;
public static class DIRegisterGraphQL
{
    public static IServiceCollection RegisterGraphQL(this IServiceCollection services)
    {
        services
            .AddGraphQL()

            .AddType<RoomType>()
            .AddType<AddRoomInputType>()

            .AddQueryType<Query>()
            .AddTypeExtension<GetRooms>()

            .AddMutationType<Mutation>()
            .AddTypeExtension<AddRoomMutation>()

            .AddErrorFilter<AppErrorFilter>()
            ;

        return services;
    }
}
