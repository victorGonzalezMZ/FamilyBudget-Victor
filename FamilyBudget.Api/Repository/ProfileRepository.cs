using System.Threading.Tasks;
using System.Collections.Generic;
using FamilyBudget.Entities;
using FamilyBudget.Api.Repository.Interfaces;
using MySqlConnector;
using Dapper;
using Dapper.Contrib.Extensions;
using System.Linq;

namespace FamilyBudget.Api.Repository
{
    public class ProfileRepository : IProfileRepository
    {
        private const string _conStr = 
            "server=localhost;user=root;pwd=root123;database=familybudget;port=3307";

        private MySqlConnection _conn;

        
        public async Task<Profile> Add(Profile profile)
        {
            _conn = new MySqlConnection(_conStr);
            _conn.Open();

            profile.Deleted = false;
            await _conn.InsertAsync<Profile>(profile);

            _conn.Close();

            return profile;
        }

        public async Task<bool> Delete(int id)
        {
            _conn = new MySqlConnection(_conStr);
            _conn.Open();

            var profile = await GetById(id);

            if(profile == null)
                return false;

            profile.Deleted = true;

            await _conn.UpdateAsync<Profile>(profile);

            _conn.Close();
            
            return true;
        }

        public async Task<IEnumerable<Profile>> GetAll()
        {
            _conn = new MySqlConnection(_conStr);
            _conn.Open();

            //var profiles = await _conn.GetAllAsync<Profile>();
            //profiles = profiles.Where(p => p.Deleted == false);

            var template = new Profile { Deleted = false };
            var parameters = new DynamicParameters(template);

            var sql = "SELECT * FROM Profile where Deleted = @Deleted";

            var profiles = await _conn.QueryAsync<Profile>(sql, parameters);

            _conn.Close();
           
           return profiles;
        }

        public async Task<Profile> GetById(int id)
        {
            _conn = new MySqlConnection(_conStr);
            _conn.Open();

            var template = new Profile { Id = id,  Deleted = false };
            var parameters = new DynamicParameters(template);

            var sql = "SELECT * FROM Profile WHERE Id = @Id AND  Deleted = @Deleted";

            var profiles = await _conn.QueryAsync<Profile>(sql, parameters);

            var profile = profiles.FirstOrDefault();

            _conn.Close();
           
           return profile;
        }

        public async Task<Profile> Update(Profile profile)
        {
            _conn = new MySqlConnection(_conStr);
            _conn.Open();

            await _conn.UpdateAsync<Profile>(profile);

            _conn.Close();
           
           return profile;
        }
    }
}