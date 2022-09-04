namespace StreamRoom.Application.GraphQL.Types;
public class UserType : ObjectType<User>
{
    protected override void Configure(IObjectTypeDescriptor<User> descriptor)
    {
        descriptor
            .Field(type => type.Id)
            .Description("User Id.");

        descriptor
            .Field(type => type.Name)
            .Description("User name.");
    }
}
