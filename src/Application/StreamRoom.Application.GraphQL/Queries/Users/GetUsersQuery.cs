namespace StreamRoom.Application.GraphQL.Queries.Users;

public class GetUsersQuery : ObjectTypeExtension<Query>
{
    protected override void Configure(IObjectTypeDescriptor<Query> descriptor)
    {
        descriptor
            .Field(nameof(GetUsersQuery).ToGqlName())
            .Type<UserType>()
            .ResolveWith<GetUsersResolver>(resolver => resolver.GetUsersAsync(default!))
            .Description("Get users.");
    }

    private class GetUsersResolver
    {
        public Task<IReadOnlyList<User>> GetUsersAsync([Service] IUserRepository userRepository)
        {
            return userRepository.GetAllAsync();
        }
    }
}
