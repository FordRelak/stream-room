﻿namespace StreamRoom.Common;

public static class StringExtension
{
    private static readonly string[] _endingsOfWords = { "Async", "Mutation", "Query", "Subscription", "ById" };

    public static string ToGqlName(this string name)
    {
        var newName = name.TrimStart("Get");

        newName = _endingsOfWords.Aggregate(newName, (current, word) => current.TrimEnd(word));

        return newName?.FirstCharToLowerCase() ?? throw new ArgumentNullException($"{name} - После удаления пустая.");
    }

    public static string? FirstCharToLowerCase(this string? str)
    {
        return !string.IsNullOrEmpty(str) && char.IsUpper(str[0])
            ? str.Length == 1 ? char.ToLower(str[0]).ToString() : char.ToLower(str[0]) + str[1..]
            : str;
    }

    public static string TrimStart(this string source, string value)
    {
        return !source.StartsWith(value) ? source : source.Remove(0, value.Length);
    }

    public static string TrimEnd(this string source, string value)
    {
        return !source.EndsWith(value) ? source : source.Remove(source.LastIndexOf(value));
    }
}
