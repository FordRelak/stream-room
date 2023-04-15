namespace StreamRoom.Application.GraphQL.Mutations.AddUser;

public class AddUserInputType : InputObjectType<AddUserInput>
{
    protected override void Configure(IInputObjectTypeDescriptor<AddUserInput> descriptor)
    {
        descriptor
            .Description("Type to add user.");

        descriptor
            .Field(type => type.Nickname)
            .Type<NonNullType<StringType>>()
            .Description("Nickname of new user.");
    }
}
