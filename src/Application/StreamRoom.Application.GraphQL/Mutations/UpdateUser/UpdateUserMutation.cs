using AppAny.HotChocolate.FluentValidation;

namespace StreamRoom.Application.GraphQL.Mutations.UpdateUser;

public class UpdateUserMutation : ObjectTypeExtension<Mutation>
{
    protected override void Configure(IObjectTypeDescriptor<Mutation> descriptor)
    {
        descriptor
            .Field(nameof(UpdateUserMutation).ToGqlName())
            .Argument("input", argument => argument.Type<NonNullType<UpdateUserInputType>>().UseFluentValidation());
    }
}
