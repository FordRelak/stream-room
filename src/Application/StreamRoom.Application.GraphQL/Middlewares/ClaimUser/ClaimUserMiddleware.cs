using HotChocolate.Resolvers;
using System.Security.Claims;

namespace StreamRoom.Application.GraphQL.Middlewares.ClaimUser;

internal class ClaimUserMiddleware
{
    public const string CLAIM_USER_CONTEXT_DATA_KEY = "ClaimUser";

    private const string _claimsPrincipalKey = "ClaimsPrincipal";
    private readonly FieldDelegate _next;

    public ClaimUserMiddleware(FieldDelegate next)
    {
        _next = next;
    }

    public async Task Invoke(IMiddlewareContext context)
    {
        if(context.ContextData.TryGetValue(_claimsPrincipalKey, out var rawClaimsPrincipal)
            && rawClaimsPrincipal is ClaimsPrincipal claimsPrincipal)
        {
            var claimUserGetter = context.Service<IClaimUserGetter>();

            if(claimUserGetter is not null)
            {
                var user = await claimUserGetter.GetAsync(claimsPrincipal);

                if(user is not null)
                {
                    context.ContextData.Add(CLAIM_USER_CONTEXT_DATA_KEY, user);
                }
            }
        }

        await _next(context);
    }
}
