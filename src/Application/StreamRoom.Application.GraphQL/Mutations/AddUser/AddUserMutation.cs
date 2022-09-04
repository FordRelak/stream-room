namespace StreamRoom.Application.GraphQL.Mutations.AddUser;

public class AddUserMutation : ObjectTypeExtension<Mutation>
{
    protected override void Configure(IObjectTypeDescriptor<Mutation> descriptor)
    {
        descriptor
            .Field(nameof(AddUserMutation).ToGqlName())
            .Argument("input", argument => argument.Type<NonNullType<AddUserInputType>>())
            .ResolveWith<AddUserRevolver>(resolver => resolver.AddUserAsync(default!, default!))
            .Description("Add user.");
    }

    private class AddUserRevolver
    {
        public async Task<AddUserPayload> AddUserAsync(AddUserInput input, [Service] IUserRepository userRepository)
        {
            var newUser = new User
            {
                Name = input.Name,
            };

            await userRepository.InsertAsync(newUser);

            return new(newUser.Id);
        }
    }
}
