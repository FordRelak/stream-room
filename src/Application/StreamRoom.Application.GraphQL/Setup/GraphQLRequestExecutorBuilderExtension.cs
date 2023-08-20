using HotChocolate.Execution.Configuration;
using Microsoft.Extensions.DependencyInjection;
using StreamRoom.Application.GraphQL.Mutations.AddRoom;
using StreamRoom.Application.GraphQL.Mutations.AddUser;
using StreamRoom.Application.GraphQL.Mutations.AddUserToRoom;
using StreamRoom.Application.GraphQL.Mutations.RemoveUserFromRoom;
using StreamRoom.Application.GraphQL.Mutations.SendCommand;
using StreamRoom.Application.GraphQL.Mutations.SetRoomSource;
using StreamRoom.Application.GraphQL.Mutations.UpdateUser;
using StreamRoom.Application.GraphQL.Queries.Rooms;
using StreamRoom.Application.GraphQL.Queries.Users;
using StreamRoom.Application.GraphQL.Subscriptions.Command;

namespace StreamRoom.Application.GraphQL.Setup;

public static class GraphQLRequestExecutorBuilderExtension
{
    public static IRequestExecutorBuilder RegisterGraphQL(this IRequestExecutorBuilder services)
    {
        services
            .AddType<RoomType>()
            .AddType<UserType>()
            .AddType<AddRoomInputType>()
            .AddType<AddUserInputType>()
            .AddType<AddUserToRoomInputType>()
            .AddType<RemoveUserFromRoomInputType>()
            .AddType<SendCommandInputType>()
            .AddType<UpdateUserInputType>()
            .AddType<SetRoomSourceInputType>()

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
            .AddTypeExtension<SendCommandMutation>()
            .AddTypeExtension<UpdateUserMutation>()
            .AddTypeExtension<SetRoomSourceMutation>()

            .AddSubscriptionType<Subscription>()
            .AddTypeExtension<ConsumeRoomCommandsSubscription>()

            .RegisterValidationGraphQLInputs()
        ;

        return services;
    }
}
