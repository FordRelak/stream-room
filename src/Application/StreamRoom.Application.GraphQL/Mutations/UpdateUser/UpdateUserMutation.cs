using AppAny.HotChocolate.FluentValidation;

namespace StreamRoom.Application.GraphQL.Mutations.UpdateUser;

public class UpdateUserMutation : ObjectTypeExtension<Mutation>
{
    protected override void Configure(IObjectTypeDescriptor<Mutation> descriptor)
    {
        descriptor
            .Field(nameof(UpdateUserMutation).ToGqlName())
            .Argument("input", argument => argument.Type<NonNullType<UpdateUserInputType>>().UseFluentValidation())
            .ResolveWith<UpdateUserResolver>(resolver => resolver.UpdateUserAsync(default!, default!))
            .Description("Update user.");
    }

    private class UpdateUserResolver
    {
        public async Task<UpdateUserPayload> UpdateUserAsync(UpdateUserInput updateUserInput, [Service] IUserRepository userRepository)
        {
            var user = await userRepository.GetAsync(updateUserInput.Id);

            _ = user ?? throw new GraphQLException($"User with id = '{updateUserInput.Id}' not found.");

            user.Name = updateUserInput.Name;

            await userRepository.UpdateAsync(user);

            return new UpdateUserPayload
            {
                Id = updateUserInput.Id,
            };
        }
    }
}
