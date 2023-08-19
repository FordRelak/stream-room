using StreamRoom.Domain;
using System.Security.Claims;

namespace StreamRoom.Application.Claims;
public interface IClaimUserGetter
{
    Task<User?> GetAsync(ClaimsPrincipal claimsPrincipal);
}
