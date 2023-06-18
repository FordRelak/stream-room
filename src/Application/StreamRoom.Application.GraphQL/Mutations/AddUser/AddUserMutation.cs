using AppAny.HotChocolate.FluentValidation;
using StreamRoom.Application.Factories;
using StreamRoom.Application.Repositories;
using StreamRoom.Application.Services;

namespace StreamRoom.Application.GraphQL.Mutations.AddUser;

public class AddUserMutation : ObjectTypeExtension<Mutation>
{
    protected override void Configure(IObjectTypeDescriptor<Mutation> descriptor)
    {
        descriptor
            .Field(nameof(AddUserMutation).ToGqlName())
            .Argument("input", argument => argument.Type<NonNullType<AddUserInputType>>().UseFluentValidation())
            .ResolveWith<AddUserRevolver>(resolver => resolver.AddUserAsync(default!, default!, default!, default!))
            .Description("Add user.");
    }

    private class AddUserRevolver
    {
        public async Task<AddUserPayload> AddUserAsync(
            AddUserInput input,
            [Service] IUserRepository userRepository,
            [Service] IClaimFactory claimFactory,
            [Service] ISignInService signInService)
        {
            var newUser = new User
            {
                Nickname = input.Nickname,
            };

            await userRepository.InsertAsync(newUser);

            var userClaimsPrincipal = await claimFactory.CreateAsync(newUser);

            await signInService.CookieSignInAsync(userClaimsPrincipal);

            return new(newUser.Id);
        }
    }
}
