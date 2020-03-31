using System;
using GradeBook.Tests.CommandPattern.Before;

namespace GradeBook.Tests.CommandPattern.After
{
    public class ChangeQuantityCommand : ICommand
    {
        private readonly Operation operation;
        private readonly IShoppingCartRepository shoppingCartRepository;
        private readonly IProductsRepository productsRepository;
        private readonly Product product;

        public enum Operation
        {
            Increase,
            Decrease
        }

        public ChangeQuantityCommand(Operation operation,
            IShoppingCartRepository shoppingCartRepository,
            IProductsRepository productsRepository,
            Product product)
        {
            this.operation = operation;
            this.shoppingCartRepository = shoppingCartRepository;
            this.productsRepository = productsRepository;
            this.product = product;
        }

        public void Execute()
        {
            switch (operation)
            {
                case Operation.Increase:
                    productsRepository.DecreaseStockBy(product.ArticleId, 1);
                    shoppingCartRepository.IncreaseQuantity(product.ArticleId);
                    break;
                case Operation.Decrease:
                    productsRepository.IncreaseStockBy(product.ArticleId, 1);
                    shoppingCartRepository.DecreaseQuantity(product.ArticleId);
                    break;
                default:
                    throw new ArgumentOutOfRangeException();
            }
        }

        public bool CanExecute()
        {
            switch (operation)
            {
                case Operation.Increase:
                    return (productsRepository.GetStockFor(product.ArticleId) - 1) > 0;
                case Operation.Decrease:
                    return shoppingCartRepository.Get(product.ArticleId).Quantity != 0;
                default:
                    throw new ArgumentOutOfRangeException();
            }
        }

        public void Undo()
        {
            switch (operation)
            {
                case Operation.Increase:
                    productsRepository.IncreaseStockBy(product.ArticleId, 1);
                    shoppingCartRepository.DecreaseQuantity(product.ArticleId);

                    break;
                case Operation.Decrease:
                    productsRepository.DecreaseStockBy(product.ArticleId, 1);
                    shoppingCartRepository.IncreaseQuantity(product.ArticleId);

                    break;
                default:
                    throw new ArgumentOutOfRangeException();
            }
        }
    }
}