using plusoftapi.Models;

namespace plusoftapi.Reposotory.Inteface
{
    public interface IUserRepository
    {
        // Usamos Task para indicar um processamento assíncrono.
        Task<IEnumerable<User>> GetUsers();
        Task<User> GetUser(int userId);
        Task<User> AddUser(User empregado);
        Task<User> UpdateUser(User empregado);
        void DeleteUser(int userId);
    }
}
