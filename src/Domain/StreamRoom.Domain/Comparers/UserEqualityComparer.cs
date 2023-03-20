using System.Diagnostics.CodeAnalysis;

namespace StreamRoom.Domain.Comparers;

public class UserEqualityComparer : IEqualityComparer<User>
{
    public bool Equals(User? x, User? y)
    {
        if(x is null)
        {
            throw new ArgumentNullException(nameof(x));
        }

        if(y is null)
        {
            throw new ArgumentNullException(nameof(y));
        }

        return x.Id.CompareTo(y.Id) == 0;
    }

    public int GetHashCode([DisallowNull] User obj)
    {
        return obj.Id.GetHashCode();
    }
}
