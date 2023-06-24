using Microsoft.AspNetCore.Authentication.Cookies;
using StreamRoom.WebApi.Configs;

namespace StreamRoom.WebApi.Setup;

public static class CookieAuthenticationOptionsCollectionExtensions
{
    public static IServiceCollection RegisterCookieAuthentication(this IServiceCollection services, IConfiguration configuration)
    {
        var cookieOptionsConfig = configuration.Get<CookieOptionsConfig>() ?? throw new InvalidOperationException("Failed to retrieve CookieOptions from configuration.");

        services
            .AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
            .AddCookie(cookieOptions =>
            {
                cookieOptions.Cookie.Name = cookieOptionsConfig.Name;
                cookieOptions.Cookie.SameSite = Enum.Parse<SameSiteMode>(cookieOptionsConfig.SameSite);
                cookieOptions.SlidingExpiration = cookieOptionsConfig.SlidingExpiration;
                cookieOptions.ExpireTimeSpan = TimeSpan.FromSeconds(cookieOptionsConfig.ExpireTimeSeconds);
            });

        return services;
    }
}
