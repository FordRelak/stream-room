using HotChocolate;
using StreamRoom.Application.GraphQL.Exceptions;

namespace StreamRoom.Application.GraphQL.Filters;

public class AppErrorFilter : IErrorFilter
{
    public IError OnError(IError error)
    {
        if(error.Exception is AppException appException)
        {
            error = error
                .WithCode(appException.Code)
                .WithMessage(appException.Message)
                .RemoveExtensions()
                .RemoveLocations();
        }

        return error;
    }
}
