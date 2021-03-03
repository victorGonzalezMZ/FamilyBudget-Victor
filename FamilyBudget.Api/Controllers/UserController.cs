using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

using FamilyBudget.Entities;
using FamilyBudget.Api.Services.Interfaces;

namespace FamilyBudget.Api.Controllers
{
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet]
        [Route("api/[controller]")]
        public async Task<ActionResult<IEnumerable<User>>> GetAll()
        {
            var users = await _userService.GetAll();
            return Ok(users); // 200 
        }

        [HttpGet]
        [Route("api/[controller]/{id}")]
        public async Task<ActionResult<User>> GetById(int id)
        {
            var user = await _userService.GetById(id);
            return Ok(user);
        }

        [HttpPost]
        [Route("api/[controller]")]
        public async Task<ActionResult<User>> Add([FromBody]User user)
        {
            await _userService.Add(user);
            return Created($"api/user/{user.Id}",user);   
        }

        [HttpPut]
        [Route("api/[controller]")]
        public async Task<ActionResult<User>> Update([FromBody]User user)
        {
            await _userService.Update(user);
            return Created($"api/user/{user.Id}",user);   
        }

        [HttpDelete]
        [Route("api/[controller]/{id}")]
        public async Task<ActionResult<bool>> Delete(int id)
        {
            var result = await _userService.Delete(id);
            return result;
        }
        
    }
}