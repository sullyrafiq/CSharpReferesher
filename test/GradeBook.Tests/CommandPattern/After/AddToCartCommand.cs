using GradeBook.Tests.CommandPattern.Before;

namespace GradeBook.Tests.CommandPattern.After
{
    public class AddToCartCommand : ICommand
    {
        private readonly IShoppingCartRepository shoppingCartRepository;
        private readonly IProductsRepository productsRepository;
        private readonly Product product;

        public AddToCartCommand(IShoppingCartRepository shoppingCartRepository,
            IProductsRepository productsRepository,
            Product product)
        {
            this.shoppingCartRepository = shoppingCartRepository;
            this.productsRepository = productsRepository;
            this.product = product;
        }

        public void Execute()
        {
            if (product == null) return;

            productsRepository.DecreaseStockBy(product.ArticleId, 1);
            
            shoppingCartRepository.Add(product);
        }

        public bool CanExecute()
        {
            if (product == null) return false;

            return productsRepository.GetStockFor(product.ArticleId) > 0;
        }

        public void Undo()
        {
            if(product == null) return;

            var lineItem = shoppingCartRepository.Get(product.ArticleId);
            
            productsRepository.IncreaseStockBy(product.ArticleId, lineItem.Quantity);
          
            shoppingCartRepository.Remove(product.ArticleId);
        }
    }
}