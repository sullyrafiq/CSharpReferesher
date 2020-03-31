using System.Linq;
using GradeBook.Tests.CommandPattern.Before;

namespace GradeBook.Tests.CommandPattern.After
{
    public class RemoveAllFromCart : ICommand
    {
        private readonly IShoppingCartRepository shoppingCartRepository;
        private readonly IProductsRepository productsRepository;
        private readonly Product product;

        public RemoveAllFromCart(IShoppingCartRepository shoppingCartRepository,
            IProductsRepository productsRepository,
            Product product)
        {
            this.shoppingCartRepository = shoppingCartRepository;
            this.productsRepository = productsRepository;
            this.product = product;
        }

        public bool CanExecute()
        {
            return shoppingCartRepository.All().Any();
        }

        public void Execute()
        {
            var items = shoppingCartRepository.All();

            foreach (var lineItem in items)
            {
                var lineItemProduct = lineItem.Value.product;
                
                productsRepository.IncreaseStockBy(lineItemProduct.ArticleId, lineItem.Value.Quantity);
                
                shoppingCartRepository.Remove(lineItemProduct.ArticleId);
            }
        }

        public void Undo()
        {
            throw new System.NotImplementedException();
        }
    }
}