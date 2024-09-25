namespace plusoftapi.Services
{
    public class AppConfigurationManager
    {
        private readonly IConfiguration _configuration;

        public AppConfigurationManager(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        // Método para obter um valor de configuração
        public string GetApplicationSetting(string key)
        {
            return _configuration[key];
        }
    }


}
