﻿namespace StreamRoom.Application.GraphQL.Types;

public class UserType : ObjectType<User>
{
    protected override void Configure(IObjectTypeDescriptor<User> descriptor)
    {
        descriptor
            .Field(type => type.Id)
            .Type<UuidType>()
            .Description("User Id.");

        descriptor
            .Field(type => type.Nickname)
            .Type<StringType>()
            .Description("User nickname.");
    }
}
