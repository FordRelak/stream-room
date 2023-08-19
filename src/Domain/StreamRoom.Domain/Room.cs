namespace StreamRoom.Domain;

public class Room : Base
{
    public string Name { get; set; } = string.Empty;

    public string Src { get; set; } = string.Empty;

    public HashSet<Guid> UserIds { get; set; } = new HashSet<Guid>();

    public Guid AdminId { get; set; }

    public bool IsAdmin(Guid userId)
    {
        return AdminId == userId;
    }
}
