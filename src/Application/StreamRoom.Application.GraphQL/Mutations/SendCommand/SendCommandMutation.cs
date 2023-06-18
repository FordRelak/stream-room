using HotChocolate.Subscriptions;
using StreamRoom.Application.GraphQL.Dtos;
using StreamRoom.Application.Repositories;

namespace StreamRoom.Application.GraphQL.Mutations.SendCommand;

public class SendCommandMutation : ObjectTypeExtension<Mutation>
{
    protected override void Configure(IObjectTypeDescriptor<Mutation> descriptor)
    {
        descriptor
            .Field(nameof(SendCommandMutation).ToGqlName())
            .Argument("input", argument => argument.Type<NonNullType<SendCommandInputType>>()
                                                   .Description("Input data for send command."))
            .ResolveWith<SendCommandResolver>(resolver => resolver.SendCommandAsync(default!, default!, default!))
            .Description("Send command.");
    }

    private class SendCommandResolver
    {
        public async Task<SendCommandPayload> SendCommandAsync(
            SendCommandInput input,
            [Service] ITopicEventSender topicEventSender,
            [Service] IRoomRepository roomRepository)
        {
            var room = await roomRepository.GetAsync(input.RoomId);

            _ = room ?? throw new GraphQLException($"Room with id = {input.RoomId} not found.");

            if(!room.UserIds.Any(userId => userId.Equals(input.UserId)))
            {
                throw new GraphQLException($"User with id = {input.UserId} not in Room with id = {input.RoomId} .");
            }

            var topicName = string.Format(SubscriptionConstants.ROOM_TOPIC_NAME_FORMAT, input.RoomId);

            await topicEventSender.SendAsync(topicName, new CommandDto(input.CommandType, input.RoomId, input.UserId));

            return new();
        }
    }
}
