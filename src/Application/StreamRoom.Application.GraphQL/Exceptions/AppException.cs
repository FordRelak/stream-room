namespace StreamRoom.Application.GraphQL.Exceptions;

public abstract class AppException : Exception
{

    protected AppException(string? message, string code) : base(message)
    {
        Code = code;
    }

    protected AppException(string? message, Exception? innerException, string code) : base(message, innerException)
    {
        Code = code;
    }

    public string Code { get; set; }
}
