using System.Collections.Generic;
using System.Linq;

namespace GradeBook.Tests.CommandPattern.Before
{
    public class ShoppingCartRepository : IShoppingCartRepository
    {
        private readonly Dictionary<string, (Product product, int Quantity)> _lineItems
            = new Dictionary<string, (Product product, int Quantity)>();

        public (Product Product, int Quantity) Get(string articleId)
        {
            return _lineItems[articleId];
        }

        public Dictionary<string, (Product product, int Quantity)> All()
        {
            return _lineItems;
        }

        public void Add(Product product)
        {
            if (_lineItems.ContainsKey(product.ArticleId))
            {
                IncreaseQuantity(product.ArticleId);
            }
            else
            {
                _lineItems[product.ArticleId] = (product, 1);
            }
        }

        public void Remove(string articleId)
        {
            _lineItems.Remove(articleId);
        }

        public void IncreaseQuantity(string articleId)
        {
            if (_lineItems.ContainsKey(articleId))
            {
                var lineItem = _lineItems[articleId];
                _lineItems[articleId] = (lineItem.product, lineItem.Quantity + 1);
            }
        }

        public void DecreaseQuantity(string articleId)
        {
            if (_lineItems.ContainsKey(articleId))
            {
                var lineItem = _lineItems[articleId];

                if (lineItem.Quantity == 1)
                {
                    _lineItems.Remove(articleId);
                }
                else
                {
                    _lineItems[articleId] = (lineItem.product, lineItem.Quantity - 1);
                }
            }
        }
    }

    public interface IShoppingCartRepository
    {
        (Product Product, int Quantity) Get(string articleId);
        Dictionary<string, (Product product, int Quantity)> All();
        void Add(Product product);
        void Remove(string articleId);
        void IncreaseQuantity(string articleId);
        void DecreaseQuantity(string articleId);
    }
}