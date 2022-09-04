namespace StreamRoom.Application.GraphQL.Exceptions;

public class NotFoundException : AppException
{
    private const string CODE = "NOT_FOUND";

    public NotFoundException(string? message) : base(message, CODE)
    {
    }

    public NotFoundException(
        string? message,
        Exception? innerException) : base(message, innerException, CODE)
    {
    }
}
