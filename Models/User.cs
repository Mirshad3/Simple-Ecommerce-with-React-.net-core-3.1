using System;
using System.ComponentModel.DataAnnotations;

namespace ecommerce.Models
{
    public class User
    {
        public int Id { get; set; }
        [Required(ErrorMessage = "User Name is required")]
        [EmailAddress(ErrorMessage = "Invalid User Name")]
        public string UserName { get; set; } 

        [Required(ErrorMessage = "Password is required")]
        [DataType(DataType.Password)]
        public string Password { get; set; }
        [Required(ErrorMessage = "Email is required")]
        [EmailAddress(ErrorMessage = "Invalid email address")]
        public string Email { get; set; }
        public DateTime LastLoginTime { get; set; }   
    }
}
