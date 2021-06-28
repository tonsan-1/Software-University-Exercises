using SharedTrip.Models.Users;

namespace SharedTrip.Services
{
    public interface IUsersService
    {
        string GetUserId(string username, string password);

        void Create(RegisterFormModel model);

        bool IsUsernameAvailable(string username);

        bool IsEmailAvailable(string email);
    }
}
