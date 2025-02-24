using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace NotapediaAPI.Models
{
    public class TypeEffectiveness
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int TypeEffectivenessId { get; set; }

        [Required]
        [MaxLength(100)]
        public string Type { get; set; }

        public string Normal { get; set; }
        public string Fire { get; set; }
        public string Water { get; set; }
        public string Plant { get; set; }
        public string Wind { get; set; }
        public string Electric { get; set; }
        public string Mineral { get; set; }
        public string Ghost { get; set; }
        public string Psychic { get; set; }
    }
}