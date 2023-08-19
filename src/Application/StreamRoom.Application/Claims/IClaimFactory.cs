using StreamRoom.Domain;
using System.Security.Claims;

namespace StreamRoom.Application.Claims;

public interface IClaimFactory
{
    public Task<ClaimsPrincipal> CreateAsync(User user);
}
