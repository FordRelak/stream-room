using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using StreamRoom.Application.Factories;
using StreamRoom.Application.Services;
using StreamRoom.Infrastructure.Authentication.AspNet.Cookies;

namespace StreamRoom.Infrastructure.Authentication.AspNet.Setup;

public static class DIRegisterAuth
{
    public static IServiceCollection RegisterAspNetCookieAuth(this IServiceCollection services)
    {
        services.RemoveAll<ISignInService>();
        services.RemoveAll<IClaimFactory>();

        services.AddHttpContextAccessor();

        services.AddScoped<ISignInService, CookieAspNetSignInService>();
        services.AddSingleton<IClaimFactory, CookieAspNetClaimFactory>();

        return services;
    }
}
