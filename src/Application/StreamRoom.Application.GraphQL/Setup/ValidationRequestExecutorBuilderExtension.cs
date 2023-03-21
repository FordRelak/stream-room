using AppAny.HotChocolate.FluentValidation;
using HotChocolate.Execution.Configuration;

namespace StreamRoom.Application.GraphQL.Setup;

public static class ValidationRequestExecutorBuilderExtension
{
    public static IRequestExecutorBuilder RegisterValidationGraphQLInputs(this IRequestExecutorBuilder requestExecutorBuilder)
    {
        requestExecutorBuilder.AddFluentValidation();

        return requestExecutorBuilder;
    }
}
