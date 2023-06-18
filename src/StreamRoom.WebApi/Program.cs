using Microsoft.AspNetCore.Authentication.Cookies;
using StreamRoom.Application.GraphQL.Setup;
using StreamRoom.Infrastructure.Authentication.AspNet.Setup;
using StreamRoom.Infrastructure.Redis.Setup;
using StreamRoom.WebApi.Setup;

var builder = WebApplication.CreateBuilder(args);

builder.Services.RegisterRedis(builder.Configuration);
builder.Services.RegisterJsonOptions();
builder.Services.AddCors();

builder.Services.AddAuthorization();

builder.Services.AddGraphQLServer()
                .AddAuthorization()
                .AddInMemorySubscriptions()
                .RegisterGraphQL();

builder.Services.RegisterValidation();
builder.Services.RegisterAspNetCookieAuth();

builder.Services
    .AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
    .AddCookie(cookieOptions =>
    {
        cookieOptions.Cookie.Name = "StreamRoomCookie";
        cookieOptions.Cookie.SameSite = SameSiteMode.Strict;
        cookieOptions.SlidingExpiration = true;
        cookieOptions.ExpireTimeSpan = TimeSpan.FromSeconds(5);
    });

var app = builder.Build();

app.UseCors(policy =>
{
    policy.WithOrigins("http://localhost:4200")
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
