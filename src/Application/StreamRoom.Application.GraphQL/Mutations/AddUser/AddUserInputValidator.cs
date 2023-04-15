using FluentValidation;

namespace StreamRoom.Application.GraphQL.Mutations.AddUser;

public class AddUserInputValidator : AbstractValidator<AddUserInput>
{
    public AddUserInputValidator()
    {
        RuleFor(addUserInput => addUserInput.Nickname)
            .NotEmpty()
            .WithMessage("{PropertyName} must be non empty.");

        RuleFor(addUserInput => addUserInput.Nickname)
            .MinimumLength(5)
            .WithMessage("{PropertyName} must be greater than {MinLength}.");
    }
}
