using plusoftapi.Data;
using plusoftapi.Models;
using plusoftapi.Reposotory.Inteface;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace plusoftapi.Reposotory
{
    public class FeedbackRepository : IFeedbackRepository
    {
        private readonly dbContext dbContext;

        public FeedbackRepository(dbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public async Task<Feedback> AddFeedback(Feedback feedback)
        {
            var result = await dbContext.Feedbacks.AddAsync(feedback);
            await dbContext.SaveChangesAsync();
            return result.Entity;
        }

        public async void DeleteFeedback(int id)
        {
            var result = await dbContext.Feedbacks.FirstOrDefaultAsync(
                x => x.FeedbackId == id);
            if (result != null)
            {
                dbContext.Feedbacks.Remove(result);
                await dbContext.SaveChangesAsync();
            }
        }

        public async Task<Feedback> GetFeedback(int id)
        {
            return await dbContext.Feedbacks.FirstOrDefaultAsync(
                x => x.FeedbackId == id);
        }

        public async Task<IEnumerable<Feedback>> GetFeedbacks()
        {
            // Ordena os feedbacks pelos mais recentes primeiro
            return await dbContext.Feedbacks
                                 .OrderByDescending(f => f.CreatedAt) // Ordena pelo campo CreatedAt em ordem decrescente
                                 .ToListAsync();
        }

        public async Task<Feedback> UpdateFeedback(Feedback feedback)
        {
            var result = await dbContext.Feedbacks.FirstOrDefaultAsync(
                x => x.FeedbackId == feedback.FeedbackId);

            if (result != null)
            {
                // Atualizar apenas os campos que não são nulos
                if (!string.IsNullOrEmpty(feedback.Content))
                    result.Content = feedback.Content;

                if (feedback.Sentiment.HasValue)
                    result.Sentiment = feedback.Sentiment;

                if (!string.IsNullOrEmpty(feedback.Issue))
                    result.Issue = feedback.Issue;

                if (!string.IsNullOrEmpty(feedback.Product))
                    result.Product = feedback.Product;

                if (!string.IsNullOrEmpty(feedback.Company))
                    result.Company = feedback.Company;

                if (!string.IsNullOrEmpty(feedback.SaleSuggestion))
                    result.SaleSuggestion = feedback.SaleSuggestion;

                if (!string.IsNullOrEmpty(feedback.SaleCategory))
                    result.SaleCategory = feedback.SaleCategory;

                if (feedback.SaleValue.HasValue)
                    result.SaleValue = feedback.SaleValue;

                if (!string.IsNullOrEmpty(feedback.SaleReasoning))
                    result.SaleReasoning = feedback.SaleReasoning;

                if (!string.IsNullOrEmpty(feedback.SaleStatus))
                    result.SaleStatus = feedback.SaleStatus;

                // Atualizar o campo de data da última atualização
                result.DateLastUpdated = DateTime.Now;

                // Salvar as alterações no banco de dados
                await dbContext.SaveChangesAsync();

                return result;
            }

            return null;
        }

        // Filtra os feedbacks pelo email do usuário
        public async Task<IEnumerable<Feedback>> GetFeedbacksByUserEmail(string userEmail)
        {
            // Filtra os feedbacks pelo email do usuário e ordena pelos mais recentes
            return await dbContext.Feedbacks
                                 .Where(f => f.UserEmail == userEmail)
                                 .OrderByDescending(f => f.CreatedAt) // Ordena pelo campo CreatedAt em ordem decrescente
                                 .ToListAsync();
        }

        // Retorna os feedbacks de forma paginada
        public async Task<IEnumerable<Feedback>> GetFeedbacksPaged(int page, int limit)
        {
            return await dbContext.Feedbacks
                                 .OrderByDescending(f => f.CreatedAt) // Ordena pelos mais recentes
                                 .Skip((page - 1) * limit)            // Pula os feedbacks das páginas anteriores
                                 .Take(limit)                         // Pega apenas o número de feedbacks especificado
                                 .ToListAsync();
        }


    }
}
