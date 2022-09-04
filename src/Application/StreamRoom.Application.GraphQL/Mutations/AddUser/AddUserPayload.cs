namespace StreamRoom.Application.GraphQL.Mutations.AddUser;

public class AddUserPayload : Payload
{
    public AddUserPayload(Guid id)
    {
        Id = id;
    }

    public Guid Id { get; set; }
}
