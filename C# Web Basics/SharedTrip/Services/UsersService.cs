using SharedTrip.Data;
using SharedTrip.Data.Models;
using SharedTrip.Models.Users;
using System.Linq;

namespace SharedTrip.Services
{
    public class UsersService : IUsersService
    {
        private readonly ApplicationDbContext db;
        private readonly IPasswordHasher passwordHasher;

        public UsersService(ApplicationDbContext db, 
                            IPasswordHasher passwordHasher)
        {
            this.db = db;
            this.passwordHasher = passwordHasher;
        }
        public void Create(RegisterFormModel model)
        {
            var user = new User
            {
                Username = model.Username,
                Email = model.Email,
                Password = this.passwordHasher.HashPassword(model.Password)
            };

            this.db.Users.Add(user);
            this.db.SaveChanges();
        }

        public string GetUserId(string username, string password)
            => this.db.Users
                   .Where(x => x.Username == username && x.Password == this.passwordHasher.HashPassword(password))
                   .Select(x => x.Id)
                   .FirstOrDefault();

        public bool IsEmailAvailable(string email)
            => !this.db.Users.Any(x => x.Email == email);
        public bool IsUsernameAvailable(string username)
            => !this.db.Users.Any(x => x.Username == username);
    }
}
