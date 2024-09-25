using plusoftapi.Models;
using plusoftapi.Reposotory.Inteface;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace plusoftapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserRepository _userRepository;

        public UserController(IUserRepository user)
        {
            _userRepository = user;
        }

        /// <summary>
        /// Retorna os usuários
        /// </summary>
        [HttpGet]
        public async Task<ActionResult<User>> GetUser()
        {
            try
            {
                return Ok(await _userRepository.GetUsers());
            }
            catch(Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Erro ao obter usuário");
            }
        }

        /// <summary>
        /// Cria um user.
        /// </summary>
        [HttpPost]
        public async Task<ActionResult<User>> AddUsers([FromBody]User user)
        {
            try
            {
                if (user == null) return BadRequest();

                var createUser = await _userRepository.AddUser(user);

                return CreatedAtAction(nameof(GetUser),
                    new { id = createUser.UserId }, createUser);

            }
            catch (Exception) {
                return StatusCode(StatusCodes.Status500InternalServerError, "Erro ao criar");
            }
        }

        /// <summary>
        /// Retorna um user por id
        /// </summary>
        [HttpGet("{id:int}")]
        public async Task<ActionResult<User>> GetUser(int id)
        {
            try
            {
                var result = await _userRepository.GetUser(id);
                if (result == null) return NotFound();

                return result;
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Erro ao obter user");
            }
        }

        /// <summary>
        /// Atualiza um user por id
        /// </summary>
        [HttpPut("{id:int}")]
        public async Task<ActionResult<User>> UpdateUser([FromBody] User user)
        {
            try
            {
                var userToUpdate = await _userRepository.GetUser(user.UserId);

                if (userToUpdate == null) return NotFound($"Usuário com id {user.UserId} não encontrado");

                return await _userRepository.UpdateUser(user);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Erro ao atualizar user");
            }
        }

        /// <summary>
        /// Deleta um user por id
        /// </summary>
        [HttpDelete("{id:int}")]
        public async Task<ActionResult> DeleteUser(int id)
        {
            try
            {
                var userToDelete = await _userRepository.GetUser(id);

                if (userToDelete == null) return NotFound($"Usuário com id {id} não encontrado");

                _userRepository.DeleteUser(id);

                return Ok($"Usuário com id {id} deletado");
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Erro ao deletar user");
            }
        }
    }
}
