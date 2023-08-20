using FluentValidation;

namespace StreamRoom.Application.GraphQL.Mutations.SetRoomSource;
public class SetRoomSourceValidator : AbstractValidator<SetRoomSourceInput>
{
    public SetRoomSourceValidator()
    {
        RuleFor(input => input.RoomId)
            .NotNull();

        RuleFor(input => input.Source)
            .NotNull()
            .NotEmpty();
    }
}
