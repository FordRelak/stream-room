using AppAny.HotChocolate.FluentValidation;
using HotChocolate.Subscriptions;
using StreamRoom.Application.GraphQL.Middlewares.ClaimUser;

namespace StreamRoom.Application.GraphQL.Mutations.SetRoomSource;
public class SetRoomSourceMutation : ObjectTypeExtension<Mutation>
{
    protected override void Configure(IObjectTypeDescriptor<Mutation> descriptor)
    {
        descriptor
            .Field(nameof(SetRoomSourceMutation).ToGqlName())
            .Authorize()
            .Use<ClaimUserMiddleware>()
            .Argument("input", argument => argument.Type<NonNullType<SetRoomSourceInputType>>()
                                                   .UseFluentValidation()
                                                   .Description("Input for set new source"))
            .ResolveWith<SetRoomSourceResolver>(resolver => resolver.SetRoomSourceAsync(default!, default!, default!, default!))
            .Description("Change room source");
    }

    private class SetRoomSourceResolver
    {
        public async Task<SetRoomSourcePayload> SetRoomSourceAsync(
            SetRoomSourceInput input,
            [Service] IRoomRepository roomRepository,
            [ClaimUser] User? user,
            [Service] ITopicEventSender topicEventSender)
        {
            if(user is null)
            {
                throw new GraphQLException("User is not defined");
            }

            var room = await roomRepository.GetAsync(input.RoomId) ?? throw new GraphQLException("Room not found");

            if(!room.IsAdmin(user.Id))
            {
                throw new GraphQLException("This user cannot administrate room.");
            }

            room.Source = input.Source;

            await roomRepository.UpdateAsync(room);

            var topicName = string.Format(SubscriptionConstants.ROOM_TOPIC_NAME_FORMAT, input.RoomId);

            await topicEventSender.SendAsync(topicName, new CommandDto(CommandTypeEnum.SourceHasChanged, room.Id, user.Id));

            return new();
        }
    }
}
