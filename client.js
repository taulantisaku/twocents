const API_BASE_URL = 'https://api.twocents.money/prod';

class TwocentsAPI {
  constructor() {
    this.baseUrl = API_BASE_URL;
  }

  async call(method, params = {}) {
    const requestBody = {
      jsonrpc: '2.0',
      method: method,
      params: params,
      id: Date.now()
    };

    console.log('API Request:', requestBody);

    try {
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          jsonrpc: "2.0",
          id: 1,
          method: "getTopPosts",
          params: { limit: 100 }
        })
      });

      console.log('API Response status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error Response:', errorText);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('API Response data:', data);
      
      if (data.error) {
        throw new Error(`API error: ${data.error.message}`);
      }

      return data.result;
    } catch (error) {
      console.error('API call failed:', error);
      throw error;
    }
  }

  async discoverMethods() {
    const discoveryMethods = ['system.listMethods', 'rpc.discover', 'help', 'methods'];
    
    for (const method of discoveryMethods) {
      try {
        console.log(`Trying discovery method: ${method}`);
        const result = await this.call(method, {});
        console.log(`Discovery SUCCESS with ${method}:`, result);
        return result;
      } catch (error) {
        console.log(`Discovery failed with ${method}:`, error.message);
      }
    }
    return null;
  }


  async testMethods() {
    console.log('=== Trying to discover available methods ===');
    const discoveredMethods = await this.discoverMethods();
    if (discoveredMethods) {
      console.log('Available methods discovered:', discoveredMethods);
    }
    
    console.log('=== Testing common method patterns ===');
    const methodsToTry = [
      '/v1/posts/top',
      '/v1/posts/get',
      '/v1/polls/get',
      '/v1/users/get',
      '/v1/users/posts',
      'v1/posts/top',
      'v1/posts/get', 
      'v1/polls/get',
      'v1/users/get',
      'v1/users/posts'
    ];
    
    for (const method of methodsToTry) {
      try {
        console.log(`Trying method: ${method}`);
        const result = await this.call(method, { limit: 10 });
        console.log(`SUCCESS with method: ${method}`, result);
        return { method, result };
      } catch (error) {
        console.log(`Failed with method: ${method}`, error.message);
      }
    }
    console.warn('No API method found, using mock data');
    return {
      method: 'mock',
      result: this.getMockPosts()
    };
  }

  getMockPosts() {
    return [
      {
        uuid: '1',
        type: 'text',
        content: 'This is a sample post from the twocents feed. The API methods are still being discovered.',
        created_at: new Date().toISOString(),
        user: {
          uuid: 'user1',
          net_worth: 150000,
          age: 28,
          gender: 'M',
          location: 'San Francisco'
        },
        reply_count: 5,
        like_count: 12
      },
      {
        uuid: '2',
        type: 'poll',
        content: 'What\'s your favorite investment strategy?',
        created_at: new Date(Date.now() - 3600000).toISOString(),
        user: {
          uuid: 'user2',
          net_worth: 2500000,
          age: 35,
          gender: 'F',
          location: 'New York'
        },
        reply_count: 23,
        like_count: 45,
        poll_options: ['Stocks', 'Real Estate', 'Crypto', 'Bonds']
      },
      {
        uuid: '3',
        type: 'text',
        content: 'Just reached my first $100K milestone! 🎉',
        created_at: new Date(Date.now() - 7200000).toISOString(),
        user: {
          uuid: 'user3',
          net_worth: 100000,
          age: 24,
          gender: 'F',
          location: 'Austin'
        },
        reply_count: 8,
        like_count: 67
      }
    ];
  }

  // Get top posts for the home feed
  async getTopPosts(limit = 100) {
    return await this.call('getTopPosts', { limit });
  }

  // Get a specific post with replies
  async getPost(postUuid) {
    return await this.call('v1/posts/get', { post_uuid: postUuid });
  }

  // Get poll results for a post
  async getPollResults(postUuid) {
    return await this.call('v1/polls/get', { post_uuid: postUuid });
  }

  // Get user information
  async getUser(userUuid) {
    return await this.call('v1/users/get', { user_uuid: userUuid });
  }

  // Get posts by a specific user
  async getUserPosts(userUuid) {
    return await this.call('v1/users/posts', { user_uuid: userUuid });
  }
}

export default new TwocentsAPI();
