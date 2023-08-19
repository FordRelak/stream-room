namespace StreamRoom.Application.GraphQL.Middlewares.ClaimUser;

internal class ClaimUserAttribute : GlobalStateAttribute
{
    public ClaimUserAttribute() : base(ClaimUserMiddleware.CLAIM_USER_CONTEXT_DATA_KEY)
    {
    }
}
