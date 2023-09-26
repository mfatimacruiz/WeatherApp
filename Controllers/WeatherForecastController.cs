using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Options;
using Newtonsoft.Json.Linq;
using WeatherApp.Models;
using WeatherApp.Services;

namespace WeatherApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        private readonly IOptions<OpenWeatherOptions> _options;
        private readonly RateLimitManager _rateLimitManager;

        public WeatherForecastController(IOptions<OpenWeatherOptions> options, IMemoryCache cache)
        {
            _options = options;
            _rateLimitManager = new RateLimitManager(cache);
        }

        [HttpGet("{city}/{country}")]
        public async Task<IActionResult> GetWeather(string city, string country, [FromHeader(Name = "X-API-KEY")] string apiKey)
        {
            if (!_options.Value.ApiKeys.Contains(apiKey))
            {
                return Unauthorized("Invalid API Key");
            }

            if (_rateLimitManager.IsRateLimitExceeded(apiKey))
            {
                return StatusCode(429, "Rate limit exceeded");
            }

            string openWeatherApiKey = apiKey;

            using (HttpClient client = new HttpClient())
            {
                var response = await client.GetStringAsync($"http://api.openweathermap.org/data/2.5/weather?q={city},{country}&APPID={openWeatherApiKey}");
                var description = JObject.Parse(response)["weather"][0]["description"].ToString();
                return Ok(new { description = description });
            }
        }
    }
}