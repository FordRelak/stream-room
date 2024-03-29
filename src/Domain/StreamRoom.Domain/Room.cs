﻿namespace StreamRoom.Domain;

public class Room : Base
{
    public string Name { get; set; } = string.Empty;

    public string? Src { get; set; }

    public HashSet<Guid> UserIds { get; set; } = new HashSet<Guid>();
}
