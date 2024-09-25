using plusoftapi.Data;
using plusoftapi.Models;
using plusoftapi.Reposotory.Inteface;
using Microsoft.EntityFrameworkCore;

namespace plusoftapi.Reposotory
{
    public class UserRepository : IUserRepository
    {
        private readonly dbContext dbContext;

        public UserRepository(dbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public async Task<User> AddUser(User empregado)
        {
            var result = await dbContext.Users.AddAsync(empregado);
            await dbContext.SaveChangesAsync();
            return result.Entity;
        }

        public async void DeleteUser(int empId)
        {
            var result = await dbContext.Users.FirstOrDefaultAsync(
                x => x.UserId == empId);
            if(result != null)
            {
                dbContext.Users.Remove(result);
                await dbContext.SaveChangesAsync();
            }
        }

        public async Task<User> GetUser(int empId)
        {
            return await dbContext.Users.FirstOrDefaultAsync(
                x => x.UserId == empId);
        }

        public async Task<IEnumerable<User>> GetUsers()
        {
            return await dbContext.Users.ToListAsync();
        }

        public async Task<User> UpdateUser(User user)
        {
            var result = await dbContext.Users.FirstOrDefaultAsync(
                x => x.UserId == user.UserId);

            if (result != null)
            {
                // Atualizar apenas os campos que não são nulos ou vazios
                if (!string.IsNullOrEmpty(user.Email))
                    result.Email = user.Email;

                if (!string.IsNullOrEmpty(user.Name))
                    result.Name = user.Name;

                if (user.Admin.HasValue)
                    result.Admin = user.Admin;

                if (!string.IsNullOrEmpty(user.Address))
                    result.Address = user.Address;

                // Salvar as alterações no banco de dados
                await dbContext.SaveChangesAsync();

                return result;
            }

            return null;
        }

    }
}
