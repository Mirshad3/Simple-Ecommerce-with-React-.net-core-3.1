using ecommerce.Models;
using ecommerce.Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace ecommerce.Controllers
{
    //[Route("api/[controller]")]
    //[ApiController]
    public class ProductController : Controller
    {
        private readonly IProductRepository<Product> _dataRepository;
        public ProductController(IProductRepository<Product> dataRepository)
        {
            _dataRepository = dataRepository;
        }
        [HttpGet]
        [Route("api/Product/Index")]
        public IEnumerable<Product> Index()
        {
            return _dataRepository.GetAll();
        }

        [HttpPost]
        [Route("api/Product/Create")]
        public int Create(Product employee)
        {
            return _dataRepository.Add(employee);
        }

        [HttpGet]
        [Route("api/Product/Details/{id}")]
        public Product Details(int id)
        {
            return _dataRepository.Get(id);
        }

        [HttpPut]
        [Route("api/Product/Edit")]
        public int Edit(Product employee)
        {
            return _dataRepository.Update(employee,employee);
        }

        [HttpDelete]
        [Route("api/Product/Delete/{id}")]
        public int Delete(int id)
        {
            return _dataRepository.Delete(id);
        }

    }
}
