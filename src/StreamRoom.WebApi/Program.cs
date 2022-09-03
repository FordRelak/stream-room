using StreamRoom.Application.GraphQL.Setup;
using StreamRoom.Infrastructure.Redis.Setup;
using StreamRoom.WebApi.Setup;

var builder = WebApplication.CreateBuilder(args);

builder.Services.RegisterRedis(builder.Configuration);
builder.Services.RegisterJsonOptions();
builder.Services.RegisterGraphQL();

builder.Services.AddGraphQLServer();

var app = builder.Build();

app.UseRouting();

app.UseEndpoints(endpoints =>
{
    endpoints.MapGraphQL();
});

app.Run();
