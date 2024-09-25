using plusoftapi.Models;

namespace plusoftapi.Reposotory.Inteface
{
    public interface IFeedbackRepository
    {
        Task<IEnumerable<Feedback>> GetFeedbacks();
        Task<Feedback> GetFeedback(int id);
        Task<Feedback> AddFeedback(Feedback feedback);
        Task<Feedback> UpdateFeedback(Feedback feedback);
        void DeleteFeedback(int id);

        // método para buscar feedbacks por UserId
        Task<IEnumerable<Feedback>> GetFeedbacksByUserEmail(string userEmail);

        // método para buscar feedbacks páginado
        Task<IEnumerable<Feedback>> GetFeedbacksPaged(int page, int limit);
    }
}
