
using ecommerce.Models;
using System.Collections.Generic;
using System.Linq;

namespace ecommerce.Repository
{
    public class DataRepository : IDataRepository<User>
    {
        readonly EcomDbContext _userContext;
        public DataRepository(EcomDbContext context)
        {
            _userContext = context;
        }
        public IEnumerable<User> GetAll()
        {
            return _userContext.Users.ToList();
        }
        public User Get(long id)
        {
            return _userContext.Users
                  .FirstOrDefault(e => e.Id == id);
        }
        public void Add(User entity)
        {
            _userContext.Users.Add(entity);
            _userContext.SaveChanges();
        }
      
    }
}
