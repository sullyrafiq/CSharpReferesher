using GradeBook.Tests.CommandPattern.After;
using GradeBook.Tests.CommandPattern.Before;
using Xunit;
using Xunit.Abstractions;

namespace GradeBook.Tests.CommandPattern
{
    public class CommandPatternTests
    {
        private readonly ITestOutputHelper _testOutputHelper;

        public CommandPatternTests(ITestOutputHelper testOutputHelper)
        {
            _testOutputHelper = testOutputHelper;
        }

        [Fact]
        public void it_adds_product_to_cart_and_prints_it_out_using_repository_pattern()
        {
            // Arrange
            var shoppingCartRepository = new ShoppingCartRepository();
            var productsRepository = new ProductsRepository();

            Product product = productsRepository.FindBy("SM7B");

            shoppingCartRepository.Add(product);
            shoppingCartRepository.IncreaseQuantity(product.ArticleId);
            shoppingCartRepository.IncreaseQuantity(product.ArticleId);
            shoppingCartRepository.IncreaseQuantity(product.ArticleId);
            shoppingCartRepository.IncreaseQuantity(product.ArticleId);

            PrintCart(shoppingCartRepository);
        }

        [Fact]
        public void it_adds_product_to_cart_and_prints_it_out_using_command_pattern()
        {
            // Arrange
            var shoppingCartRepository = new ShoppingCartRepository();
            var productsRepository = new ProductsRepository();

            Product product = productsRepository.FindBy("SM7B");

            var addToCartCommand = new AddToCartCommand(shoppingCartRepository,
                productsRepository,
                product);

            var increaseQuantityCommand = new ChangeQuantityCommand(ChangeQuantityCommand.Operation.Increase,
                shoppingCartRepository,
                productsRepository,
                product);

            var manager = new CommandManager();
            manager.Invoke(addToCartCommand);
            manager.Invoke(increaseQuantityCommand);
            manager.Invoke(increaseQuantityCommand);
            manager.Invoke(increaseQuantityCommand);
            manager.Invoke(increaseQuantityCommand);

            PrintCart(shoppingCartRepository);
            
            manager.Undo();
            
            PrintCart(shoppingCartRepository);
        }
        
        [Fact]
        public void it_()
        {
            // Arrange
            var shoppingCartRepository = new ShoppingCartRepository();
            var productsRepository = new ProductsRepository();

            Product product = productsRepository.FindBy("SM7B");

            var addToCartCommand = new AddToCartCommand(shoppingCartRepository,
                productsRepository,
                product);

            var increaseQuantityCommand = new ChangeQuantityCommand(ChangeQuantityCommand.Operation.Increase,
                shoppingCartRepository,
                productsRepository,
                product);

            var removeAllFromCart = new RemoveAllFromCart(shoppingCartRepository, 
                productsRepository,
                product);

            var manager = new CommandManager();
            manager.Invoke(addToCartCommand);
            manager.Invoke(increaseQuantityCommand);
            manager.Invoke(increaseQuantityCommand);
            manager.Invoke(increaseQuantityCommand);
            manager.Invoke(increaseQuantityCommand);

            PrintCart(shoppingCartRepository);
            
            manager.Undo();
            
            PrintCart(shoppingCartRepository);
            
            manager.Invoke(addToCartCommand);
            manager.Invoke(increaseQuantityCommand);
            manager.Invoke(increaseQuantityCommand);
            manager.Invoke(increaseQuantityCommand);
            manager.Invoke(increaseQuantityCommand);
            
            PrintCart(shoppingCartRepository);

            manager.Invoke(removeAllFromCart);

            PrintCart(shoppingCartRepository);
        }

        private void PrintCart(ShoppingCartRepository shoppingCartRepository)
        {
            _testOutputHelper.WriteLine("**************************");
            
            var totalPrice = 0m;

            foreach (var lineItem in shoppingCartRepository.All())
            {
                var price = lineItem.Value.product.Price * lineItem.Value.Quantity;

                _testOutputHelper.WriteLine($"{lineItem.Key} " +
                                            $"£{lineItem.Value.product.Price} x {lineItem.Value.Quantity} = ${price}");

                totalPrice += price;
            }

            _testOutputHelper.WriteLine($"Total price:\t${totalPrice}");
            
        }
    }
}