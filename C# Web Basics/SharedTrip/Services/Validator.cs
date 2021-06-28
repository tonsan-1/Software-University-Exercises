namespace SharedTrip.Services
{
    using SharedTrip.Models.Trips;
    using SharedTrip.Models.Users;
    using System;
    using System.Collections.Generic;
    using System.Globalization;
    using System.Text.RegularExpressions;

    using static SharedTrip.Data.DataConstants;

    public class Validator : IValidator
    {
        public ICollection<string> ValidateUser(RegisterFormModel model)
        {
            var errors = new List<string>();

            if (string.IsNullOrEmpty(model.Username) ||
                model.Username.Length < UserMinUsername || 
                model.Username.Length > DefaultMaxLength)
            {
                errors.Add($"Username '{model.Username}' is not valid. It must be between {UserMinUsername} and {DefaultMaxLength} characters long.");
            }

            if (!Regex.IsMatch(model.Email, UserEmailRegularExpression))
            {
                errors.Add($"Email {model.Email} is not a valid e-mail address.");
            }

            if (model.Password.Length < UserMinPassword || model.Password.Length > DefaultMaxLength)
            {
                errors.Add($"The provided password is not valid. It must be between {UserMinPassword} and {DefaultMaxLength} characters long.");
            }

            if (model.Password != model.ConfirmPassword)
            {
                errors.Add($"Password and its confirmation are different.");
            }

            return errors;
        }
        public ICollection<string> ValidateAddTrip(AddTripFormModel model)
        {
            var errors = new List<string>();

            if (string.IsNullOrEmpty(model.StartPoint))
            {
                errors.Add("A trip must have a start point.");
            }

            if (string.IsNullOrEmpty(model.EndPoint))
            {
                errors.Add("A trip must have an end point.");
            }

            if (!DateTime.TryParseExact(
                model.DepartureTime,
                "dd.MM.yyyy HH:mm",
                CultureInfo.InvariantCulture,
                DateTimeStyles.None,
                out _))
            {
                errors.Add("Invalid departure time. Please use dd.MM.yyyy HH:mm format.");
            }

            if (model.Seats < 2 || model.Seats > 6)
            {
                errors.Add("Seats count should be between 2 and 6.");
            }

            if (string.IsNullOrEmpty(model.Description) || model.Description.Length > 80)
            {
                errors.Add("Description should be between 1 and 80 characters.");
            }

            if (string.IsNullOrEmpty(model.ImagePath) || !Uri.IsWellFormedUriString(model.ImagePath, UriKind.RelativeOrAbsolute))
            {
                errors.Add($"Image {model.ImagePath} is not a valid URL.");
            }

            return errors;
        }
    }
}
