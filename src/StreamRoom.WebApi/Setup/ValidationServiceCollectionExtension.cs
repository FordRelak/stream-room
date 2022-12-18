using FluentValidation;
using FluentValidation.AspNetCore;
using StreamRoom.Application.GraphQL.Mutations.AddUser;

namespace StreamRoom.WebApi.Setup;

public static class ValidationServiceCollectionExtension
{
    public static IServiceCollection RegisterValidation(this IServiceCollection services)
    {
        return services
            .AddFluentValidationAutoValidation()
            .AddFluentValidationClientsideAdapters()
            .AddValidatorsFromAssemblyContaining<AddUserInputValidator>();
    }
}
