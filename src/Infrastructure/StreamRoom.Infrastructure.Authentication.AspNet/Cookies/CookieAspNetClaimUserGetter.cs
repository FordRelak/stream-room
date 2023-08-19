using StreamRoom.Application.Claims;
using StreamRoom.Application.Repositories;
using StreamRoom.Domain;
using System.Security.Claims;

namespace StreamRoom.Infrastructure.Authentication.AspNet.Cookies;
internal class CookieAspNetClaimUserGetter : IClaimUserGetter
{
    private readonly IUserRepository _userRepository;

    public CookieAspNetClaimUserGetter(IUserRepository userRepository)
    {
        _userRepository = userRepository;
    }

    public async Task<User?> GetAsync(ClaimsPrincipal claimsPrincipal)
    {
        if(claimsPrincipal.Identity is ClaimsIdentity identity)
        {
            var claim = identity.Claims.FirstOrDefault(claim => claim.Type == Constants.USER_ID);

            if(claim is null)
            {
                return null;
            }

            var userId = claim.Value;

            if(string.IsNullOrWhiteSpace(userId))
            {
                return null;
            }

            if(Guid.TryParse(userId, out var parsedUserId))
            {
                return await _userRepository.GetAsync(parsedUserId);
            }
        }

        return null;
    }
}
