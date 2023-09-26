using Microsoft.Extensions.Caching.Memory;

namespace WeatherApp.Services
{
    public class RateLimitManager
    {
        private readonly IMemoryCache _cache;
        public RateLimitManager(IMemoryCache cache)
        {
            _cache = cache;
        }
        public bool IsRateLimitExceeded(string apiKey)
        {
            if (_cache.TryGetValue(apiKey, out List<DateTime> requestTimes))
            {
                requestTimes.RemoveAll(x => (DateTime.UtcNow - x).TotalHours >= 1);
                if (requestTimes.Count >= 5) return true;
            }
            else
            {
                requestTimes = new List<DateTime>();
            }
            requestTimes.Add(DateTime.UtcNow);
            _cache.Set(apiKey, requestTimes, new MemoryCacheEntryOptions { SlidingExpiration = TimeSpan.FromHours(1) });
            return false;
        }
    }
}