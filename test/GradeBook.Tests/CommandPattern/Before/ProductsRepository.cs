using System.Collections.Generic;
using System.Linq;
using System.Net.Sockets;

namespace GradeBook.Tests.CommandPattern.Before
{
    public class ProductsRepository : IProductsRepository
    {
        private Dictionary<string, (Product Product, int Stock)> products { get; }

        public ProductsRepository()
        {
            products = new Dictionary<string, (Product Product, int Stock)>();

            Add(new Product("EOSR1", "Canon EOS R", 1099), 2);
            Add(new Product("EOS70D", "Canon EOS 70D", 699), 1);
            Add(new Product("ATOMOSNV", "Atomos Ninja V", 1099), 0);
            Add(new Product("SM7B", "Shur SM7b", 1099), 5);
        }

        private void Add(Product product, int stock)
        {
            products[product.ArticleId] = (product, stock);
        }

        public Product FindBy(string articleId)
        {
            if (products.ContainsKey(articleId))
            {
                return products[articleId].Product;
            }

            return null;
        }

        public int GetStockFor(string articleId)
        {
            if (products.ContainsKey(articleId))
            {
                return products[articleId].Stock;
            }

            return 0;
        }

        public List<Product> All()
        {
            return products.Select(x => x.Value.Product)
                .ToList();
        }

        public void DecreaseStockBy(string articleId, int amount)
        {
            if (!products.ContainsKey(articleId)) return;

            products[articleId] = 
                (products[articleId].Product, products[articleId].Stock - amount);
        }

        public void IncreaseStockBy(string articleId, int amount)
        {
            if (!products.ContainsKey(articleId)) return;

            products[articleId] = 
                (products[articleId].Product, products[articleId].Stock + amount);

        }
    }

    public interface IProductsRepository
    {
        Product FindBy(string articleId);
        int GetStockFor(string articleId);
        List<Product> All();
        void DecreaseStockBy(string articleId, int amount);
        void IncreaseStockBy(string articleId, int amount);
    }
}