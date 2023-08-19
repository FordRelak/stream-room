using HotChocolate.Types.Descriptors;
using System.Reflection;
using System.Runtime.CompilerServices;

namespace StreamRoom.Application.GraphQL.Middlewares.ClaimUser;

[AttributeUsage(AttributeTargets.Parameter, AllowMultiple = false)]
internal class UseClaimUserAttribute : ObjectFieldDescriptorAttribute
{
    public UseClaimUserAttribute([CallerLineNumber] int order = 0)
    {
        Order = order;
    }

    protected override void OnConfigure(IDescriptorContext context, IObjectFieldDescriptor descriptor, MemberInfo member)
    {
        descriptor.Use<ClaimUserMiddleware>();
    }
}
