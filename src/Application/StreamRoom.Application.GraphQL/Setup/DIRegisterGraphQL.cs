using Microsoft.Extensions.DependencyInjection;
using StreamRoom.Application.GraphQL.Mutations.AddRoom;
using StreamRoom.Application.GraphQL.Mutations.AddUser;
using StreamRoom.Application.GraphQL.Mutations.AddUserToRoom;
using StreamRoom.Application.GraphQL.Mutations.RemoveUserFromRoom;
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
            .AddType<AddUserToRoomInputType>()
            .AddType<RemoveUserFromRoomInputType>()

            .AddQueryType<Query>()
            .AddTypeExtension<GetRoomsQuery>()
            .AddTypeExtension<GetRoomByIdQuery>()
            .AddTypeExtension<GetUsersQuery>()
            .AddTypeExtension<GetUserByIdQuery>()

            .AddMutationType<Mutation>()
            .AddTypeExtension<AddRoomMutation>()
            .AddTypeExtension<AddUserMutation>()
            .AddTypeExtension<AddUserToRoomMutation>()
            .AddTypeExtension<RemoveUserFromRoomMutation>()
            ;

        return services;
    }
}
