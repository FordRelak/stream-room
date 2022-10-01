namespace StreamRoom.Application.GraphQL.Mutations.SendCommand;

public class SendCommandInputType : InputObjectType<SendCommandInput>
{
    protected override void Configure(IInputObjectTypeDescriptor<SendCommandInput> descriptor)
    {
        descriptor
            .Field(type => type.CommandType)
            .Description("Command.");

        descriptor
            .Field(type => type.UserId)
            .Description("User id.");

        descriptor
            .Field(type => type.RoomId)
            .Description("Room id.");
    }
}
