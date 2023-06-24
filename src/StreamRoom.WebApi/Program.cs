using StreamRoom.Application.GraphQL.Setup;
using StreamRoom.Infrastructure.Authentication.AspNet.Setup;
using StreamRoom.Infrastructure.Redis.Setup;
using StreamRoom.WebApi.Setup;

var builder = WebApplication.CreateBuilder(args);

builder.Services
    .AddGraphQLServer()
    .AddAuthorization()
    .AddInMemorySubscriptions()
    .RegisterGraphQL();

builder.Services
    .RegisterRedis(builder.Configuration)
    .RegisterJsonOptions()
    .AddCors()
    .RegisterValidation()
    .RegisterAspNetCookieAuth()
    .RegisterCookieAuthentication(builder.Configuration);
;

var app = builder.Build();

var frontendHost = app.Configuration["FrontendHost"] ?? throw new InvalidOperationException("Failed to retrieve FrontendHost from configuration.");

app.UseCors(policy =>
{
    policy.WithOrigins(frontendHost)
          .AllowCredentials()
          .AllowAnyHeader()
          .AllowAnyMethod();
});

app.UseRouting();

app.UseAuthentication();
app.UseAuthorization();

app.UseWebSockets();

app.MapGraphQL();

app.Run();
