using GradeBook.Tests.CommandPattern.Before;

namespace GradeBook.Tests.CommandPattern.After
{
    public class RemoveFromCartCommand : ICommand
    {
        private readonly IShoppingCartRepository shoppingCartRepository;
        private readonly IProductsRepository productsRepository;
        private readonly Product product;

        public RemoveFromCartCommand(IShoppingCartRepository shoppingCartRepository,
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

            var lineItem = shoppingCartRepository.Get(product.ArticleId);

            productsRepository.IncreaseStockBy(product.ArticleId, lineItem.Quantity);
         
            shoppingCartRepository.Remove(product.ArticleId);
        }

        public bool CanExecute()
        {
            if (product == null) return false;

            return shoppingCartRepository.Get(product.ArticleId).Quantity > 0;
        }

        public void Undo()
        {
            throw new System.NotImplementedException();
        }
    }
}