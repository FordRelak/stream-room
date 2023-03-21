using FluentValidation;

namespace StreamRoom.Application.GraphQL.Mutations.UpdateUser;

public class UpdateUserInputValidator : AbstractValidator<UpdateUserInput>
{
    public UpdateUserInputValidator()
    {
        RuleFor(updateUserInput => updateUserInput.Id)
            .NotEmpty()
            .WithMessage("{PropertyName} must be non empty.");

        RuleFor(updateUserInput => updateUserInput.Name)
            .NotEmpty()
            .WithMessage("{PropertyName} must be non empty.");

        RuleFor(updateUserInput => updateUserInput.Name)
            .MinimumLength(5)
            .WithMessage("{PropertyName} must be greater than {MinLength}.");
    }
}
