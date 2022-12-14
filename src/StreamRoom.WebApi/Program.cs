using StreamRoom.Application.GraphQL.Setup;
using StreamRoom.Infrastructure.Redis.Setup;
using StreamRoom.WebApi.Setup;

var builder = WebApplication.CreateBuilder(args);

builder.Services.RegisterRedis(builder.Configuration);
builder.Services.RegisterJsonOptions();
builder.Services.AddCors();

builder.Services.AddGraphQLServer()
                .RegisterGraphQL();

var app = builder.Build();

app.UseCors(policy =>
{
    policy.WithOrigins("http://localhost:4200")
          .AllowCredentials()
          .AllowAnyHeader()
          .AllowAnyMethod();
});

app.UseRouting();

app.UseWebSockets();

app.UseEndpoints(endpoints =>
{
    endpoints.MapGraphQL();
});

app.Run();
