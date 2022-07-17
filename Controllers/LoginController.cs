using ecommerce.Models;
using ecommerce.Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;

namespace ecommerce.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly IDataRepository<User> _dataRepository;
        public LoginController(IDataRepository<User> dataRepository)
        {
            _dataRepository = dataRepository;
        }
        // GET: api/Login
        [HttpGet]
        public IActionResult Get()
        {
            IEnumerable<User> employees = _dataRepository.GetAll();
            return Ok(employees);
        }
        //[HttpPost]
        //public IActionResult UserLogin([FromBody]UserVM login)
        //{
        //    var log = _dataRepository.GetAll().Where(x => x.Email.Equals(login.Email) && x.Password.Equals(login.Password)).FirstOrDefault();

        //    if (log == null)
        //    {
        //        return Ok(new { status = 401, isSuccess = false, message = "Invalid User", });
        //    }
        //    else

        //        return Ok(new { status = 200, isSuccess = true, message = "User Login successfully", UserDetails = log });
        //}
        // GET: api/Login/5
        [HttpGet("{id}", Name = "Get")]
        public IActionResult Get(long id)
        {
            User employee = _dataRepository.Get(id);
            if (employee == null)
            {
                return NotFound("The Employee record couldn't be found.");
            }
            return Ok(employee);
        }
        // POST: api/Login
        [HttpPost]
        public IActionResult Post([FromBody] UserVM login)
        {
            var log = _dataRepository.GetAll().Where(x => x.UserName.Equals(login.Email) && x.Password.Equals(login.Password)).FirstOrDefault();

            if (log == null)
            {
                return Ok(new { status = 401, isSuccess = false, message = "Invalid User", });
            }
            else

                return Ok(new { status = 200, isSuccess = true, message = "User Login successfully", UserDetails = log });

        }

    }
}
