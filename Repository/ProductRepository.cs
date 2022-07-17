
using ecommerce.Models;
using System.Collections.Generic;
using System.Linq;

namespace ecommerce.Repository
{
    public class ProductRepository : IProductRepository<Product>
    {
        readonly EcomDbContext _productContext;
        public ProductRepository(EcomDbContext context)
        {
            _productContext = context;
        }
        public IEnumerable<Product> GetAll()
        {
            return _productContext.Products.ToList();
        }
        public Product Get(long id)
        {
            return _productContext.Products
                  .FirstOrDefault(e => e.Id == id);
        }
        public int Add(Product entity)
        {
            _productContext.Products.Add(entity);
            _productContext.SaveChanges();
            return 1;
        }
        public int Update(Product products, Product entity)
        {
           var product = _productContext.Products
                  .FirstOrDefault(e => e.Id == products.Id);
            product.Name = entity.Name;
            product.Price = entity.Price ;
            product.ProductCode = entity.ProductCode;
            product.MinQuantity = entity.MinQuantity;
            product.DiscountRate = entity.DiscountRate;
            product.Category = entity.Category;
            product.Image = entity.Image;
            _productContext.SaveChanges();
            return 1;
        }
        public int Delete(int id)
        {
           var product =  _productContext.Products
                     .FirstOrDefault(e => e.Id == id);
            _productContext.Products.Remove(product);
            _productContext.SaveChanges();
            return 1;
        }

    }
}
