using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace NotapediaAPI.Models
{
    public class Notamon
    {
        [Key]
        public int NotamonId { get; set; }

        [Required]
        public string Name { get; set; }

        public int Number { get; set; }

        [Required]
        public string Type { get; set; }

        public int TypeId { get; set; }
    }
}