using Microsoft.AspNetCore.Authentication.Cookies;
using StreamRoom.Application.Factories;
using StreamRoom.Domain;
using System.Security.Claims;

namespace StreamRoom.Infrastructure.Authentication.AspNet.Cookies;

internal class CookieAspNetClaimFactory : IClaimFactory
{
    public Task<ClaimsPrincipal> CreateAsync(User user)
    {
        var claims = new List<Claim>()
        {
            new Claim("userId", user.Id.ToString()),
        };

        var claimsIdentity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);

        return Task.FromResult(new ClaimsPrincipal(claimsIdentity));
    }
}
