using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace NotapediaAPI.Models
{
    public class NotamonDto
    {
        public int NexomonId { get; set; }
        public string Name  { get; set; }
        public int Number { get; set; }
        public string NexomonType { get; set; }
        public int NexomonTypeId { get; set; }
    }
}