﻿using HotChocolate.Subscriptions;

namespace StreamRoom.Application.GraphQL.Subscriptions.Command;

public class ConsumeRoomCommandsSubscription : ObjectTypeExtension<Subscription>
{
    private const string _roomIdArgumentName = "roomId";

    protected override void Configure(IObjectTypeDescriptor<Subscription> descriptor)
    {
        descriptor
            .Field(nameof(ConsumeRoomCommandsSubscription).ToGqlName())
            .Authorize()
            .Argument(_roomIdArgumentName, argument => argument.Type<NonNullType<UuidType>>()
                                                    .Description("Room id for the commands to subscribe to."))
            .ResolveWith<ConsumeRoomCommandsResolver>(resolver => resolver.SendCommandAsync(default!))
            .Subscribe(async context =>
            {
                var receiver = context.Service<ITopicEventReceiver>();
                var roomId = context.ArgumentValue<Guid>(_roomIdArgumentName);

                var topicName = string.Format(SubscriptionConstants.ROOM_TOPIC_NAME_FORMAT, roomId);

                var stream = await receiver.SubscribeAsync<CommandDto>(topicName);

                return stream;
            })
            .Description("Fired when some user use command.");
    }

    private class ConsumeRoomCommandsResolver
    {
        public Task<CommandPayload> SendCommandAsync([EventMessage] CommandDto commandDto)
        {
            return Task.FromResult(new CommandPayload(commandDto.CommandType, commandDto.RoomId, commandDto.UserId));
        }
    }
}
