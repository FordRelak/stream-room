namespace StreamRoom.Domain;
public class Room : Base
{
    public string Name { get; set; } = string.Empty;
    public string? Src { get; set; }
    public IEnumerable<User> Users { get; set; } = new List<User>();
}
