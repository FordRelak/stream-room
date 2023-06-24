namespace StreamRoom.WebApi.Configs;

public class CookieOptionsConfig
{
    public string Name { get; set; } = "StreamRoomCookie";

    public string SameSite { get; set; } = "Strict";

    public bool SlidingExpiration { get; set; } = true;

    public int ExpireTimeSeconds { get; set; } = 60 * 60 * 24; //24 hours
}
