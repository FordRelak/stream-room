using Microsoft.Extensions.DependencyInjection;
using StreamRoom.Application.GraphQL.Mutations.AddRoom;
using StreamRoom.Application.GraphQL.Mutations.AddUser;
using StreamRoom.Application.GraphQL.Queries.Rooms;
using StreamRoom.Application.GraphQL.Queries.Users;

namespace StreamRoom.Application.GraphQL.Setup;
public static class DIRegisterGraphQL
{
    public static IServiceCollection RegisterGraphQL(this IServiceCollection services)
    {
        services
            .AddGraphQL()

            .AddType<RoomType>()
            .AddType<UserType>()
            .AddType<AddRoomInputType>()
            .AddType<AddUserInputType>()

            .AddQueryType<Query>()
            .AddTypeExtension<GetRoomsQuery>()
            .AddTypeExtension<GetUsersQuery>()

            .AddMutationType<Mutation>()
            .AddTypeExtension<AddRoomMutation>()
            .AddTypeExtension<AddUserMutation>()

            ;

        return services;
    }
}
