using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Http;
using StreamRoom.Application.Services;
using System.Security.Claims;

namespace StreamRoom.Infrastructure.Authentication.AspNet.Cookies;

internal class CookieAspNetSignInService : ISignInService
{
    private readonly IHttpContextAccessor _httpContextAccessor;

    public CookieAspNetSignInService(IHttpContextAccessor httpContextAccessor)
    {
        _httpContextAccessor = httpContextAccessor;
    }

    public Task CookieSignInAsync(ClaimsPrincipal claimsPrincipal)
    {
        return _httpContextAccessor.HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, claimsPrincipal);
    }

    public Task SignOutAsync()
    {
        return _httpContextAccessor.HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
    }
}
