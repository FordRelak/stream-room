using FluentValidation;

namespace StreamRoom.Application.GraphQL.Mutations.AddUser;

public class AddUserInputValidator : AbstractValidator<AddUserInput>
{
    public AddUserInputValidator()
    {
        RuleFor(addUserInput => addUserInput.Name)
            .NotEmpty()
            .WithMessage("{PropertyName} must be non empty.");

        RuleFor(addUserInput => addUserInput.Name)
            .MinimumLength(5)
            .WithMessage("{PropertyName} must be greater than {MinLength}.");
    }
}
