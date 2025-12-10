using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;

namespace DearDiaryNew.Models
    
{
    public class Journal
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public DateTime JournalDate { get; set; }
        public string Content { get; set; }

        [JsonIgnore]
        [ValidateNever]

        public User User { get; set; } // navigation property
    }
}
