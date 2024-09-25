using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace plusoftapi.Models
{
    public class Feedback
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int FeedbackId { get; set; }
        public string? UserEmail { get; set; }
        public DateTime? CreatedAt { get; set; }
        public DateTime? DateLastUpdated { get; set; } = DateTime.Now;
        public string? Content { get; set; } 
        public float? Sentiment { get; set; }
        public string? Issue { get; set; } 
        public string? Product { get; set; } 
        public string? Company { get; set; } 
        public string? SaleSuggestion { get; set; } 
        public string? SaleCategory { get; set; } 
        public float? SaleValue { get; set; } 
        public string? SaleReasoning { get; set; }
        public string? SaleStatus { get; set; }

    }
}
