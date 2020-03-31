namespace GradeBook.Tests.CommandPattern.After
{
    public interface ICommand
    {
        void Execute();
        bool CanExecute();
        void Undo();
    }
}