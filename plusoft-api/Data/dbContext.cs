using plusoftapi.Models;
using Microsoft.EntityFrameworkCore;

namespace plusoftapi.Data
{
    public class dbContext : DbContext
    {
        public dbContext(DbContextOptions<dbContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<Feedback> Feedbacks { get; set; }
    }
}
