using System.Collections.Generic;

namespace ecommerce.Repository
{
    public interface IProductRepository<TEntity>
    {
        IEnumerable<TEntity> GetAll();
        TEntity Get(long id);
        int Add(TEntity entity);
        int Update(TEntity dbEntity, TEntity entity);
        int Delete(int id);
    }
}
