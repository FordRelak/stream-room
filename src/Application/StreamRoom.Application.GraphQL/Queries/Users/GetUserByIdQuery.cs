namespace StreamRoom.Application.GraphQL.Queries.Users;

public class GetUserByIdQuery : ObjectTypeExtension<Query>
{
    protected override void Configure(IObjectTypeDescriptor<Query> descriptor)
    {
        descriptor
            .Field(nameof(GetUserByIdQuery).ToGqlName())
            .Authorize()
            .Argument("id", argument => argument.Type<NonNullType<IdType>>())
            .ResolveWith<GetUserByIdResolver>(resolver => resolver.GetUserByIdAsync(default!, default!))
            .Description("Get user by id.");
    }

    private class GetUserByIdResolver
    {
        public Task<User?> GetUserByIdAsync(Guid id, [Service] IUserRepository userRepository)
        {
            return userRepository.GetAsync(id);
        }
    }
}
