namespace ecommerce.Models
{
    public class Product
    {
        public int Id { get; set; }
        public string Category { get; set; }
        public string ProductCode { get; set; }
        public string Name { get; set; }
        public string Image { get; set; }
        public double Price { get; set; }
        public int MinQuantity { get; set; }
        public double DiscountRate { get; set; } 

    }
}
