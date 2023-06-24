using System.Security.Claims;

namespace StreamRoom.Application.Services;

public interface ISignInService
{
    public Task CookieSignInAsync(ClaimsPrincipal claimsPrincipal);

    Task SignOutAsync();
}
