using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace StreamRoom.WebApi.Setup;
public static class DIRegisterJsonOptions
{
    public static IServiceCollection RegisterJsonOptions(this IServiceCollection services)
    {
        services
            .Configure<JsonSerializerOptions>(ConfigureJsonOptions)
            .Configure<JsonOptions>(jsonOptions => ConfigureJsonOptions(jsonOptions.JsonSerializerOptions));

        return services;
    }

    private static void ConfigureJsonOptions(JsonSerializerOptions options)
    {
        options.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;
        options.WriteIndented = true;
        options.Converters.Add(new JsonStringEnumConverter());
        options.DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull;
        options.ReferenceHandler = ReferenceHandler.IgnoreCycles;
    }
}
