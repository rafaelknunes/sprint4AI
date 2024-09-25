using plusoftapi.Models;
using plusoftapi.Reposotory;
using plusoftapi.Reposotory.Inteface;
using plusoftapi.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Configuration;
using System.Threading.Tasks;

namespace plusoftapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FeedbacksController : ControllerBase
    {
        private readonly IFeedbackRepository _feedbackRepository;
        private readonly IUserRepository _userRepository;
        private readonly AppConfigurationManager _configManager;


        public FeedbacksController(IFeedbackRepository feedbackRepository, IUserRepository userRepository, AppConfigurationManager configManager)
        {
            _feedbackRepository = feedbackRepository;
            _userRepository = userRepository;
            
            _configManager = configManager;  
        }

        /// <summary>
        /// Retorna todos os Feedbacks. Com paginação
        /// </summary>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Feedback>>> GetFeedbacks([FromQuery] int page = 1, [FromQuery] int limit = 10)
        {
            try
            {
                var feedbacks = await _feedbackRepository.GetFeedbacksPaged(page, limit);

                if (feedbacks == null || !feedbacks.Any())
                {
                    return NotFound("Nenhum feedback encontrado.");
                }

                return Ok(feedbacks);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Erro ao obter feedbacks");
            }
        }



        /// <summary>
        /// Retorna o Feedback por id
        /// </summary>
        [HttpGet("{id:int}")]
        public async Task<ActionResult<Feedback>> GetFeedback(int id)
        {
            try
            {
                var result = await _feedbackRepository.GetFeedback(id);
                if (result == null) return NotFound();

                return result;
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Erro ao obter Feedback");
            }
        }

        /// <summary>
        /// Cria um Feedback.
        /// </summary>
        [HttpPost]
        public async Task<ActionResult<Feedback>> AddFeedback([FromBody] Feedback feedback)
        {
            try
            {
                if (feedback == null) return BadRequest();

                var createFeedback = await _feedbackRepository.AddFeedback(feedback);

                return CreatedAtAction(nameof(GetFeedback),
                    new { id = createFeedback.FeedbackId }, createFeedback);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Erro ao criar feedback");
            }
        }

        /// <summary>
        /// Atualiza o feedback por id
        /// </summary>
        [HttpPut("{id:int}")]
        public async Task<ActionResult<Feedback>> UpdateFeedback(int id, [FromBody] Feedback feedback)
        {
            try
            {
                if (id != feedback.FeedbackId) return BadRequest("ID do feedback não corresponde");

                var feedbackToUpdate = await _feedbackRepository.GetFeedback(id);

                if (feedbackToUpdate == null) return NotFound($"Feedback com id {id} não encontrado");

                return await _feedbackRepository.UpdateFeedback(feedback);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Erro ao atualizar feedback");
            }
        }

        /// <summary>
        /// Deleta um feedback por id
        /// </summary>
        [HttpDelete("{id:int}")]
        public async Task<ActionResult> DeleteFeedback(int id)
        {
            try
            {
                var feedbackToDelete = await _feedbackRepository.GetFeedback(id);

                if (feedbackToDelete == null) return NotFound($"Feedback com id {id} não encontrado");

                _feedbackRepository.DeleteFeedback(id);

                return Ok($"Feedback com id {id} deletado");
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Erro ao deletar feedback");
            }
        }

        /// <summary>
        /// Obtem todos os feedbacks de um determinado email do usuário
        /// </summary>
        [HttpGet("user/{userEmail}")]
        public async Task<ActionResult<IEnumerable<Feedback>>> GetFeedbacksByUserEmail(string userEmail)
        {
            try
            {
                var feedbacks = await _feedbackRepository.GetFeedbacksByUserEmail(userEmail);

                if (feedbacks == null || !feedbacks.Any())
                {
                    return NotFound($"Nenhum feedback encontrado para o usuário com email {userEmail}");
                }

                return Ok(feedbacks);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Erro ao obter feedbacks do usuário");
            }
        }

    }
}
