import {
  ErrorResponse,
  RequestBuddyQuery,
  RequestBuddyResponse,
  SearchRequestQuery,
  SearchRequestResponse,
} from 'src/interface/FindMyBuddyConfig';

class FindMyBuddyService {
  private baseUrl = import.meta.env.VITE_BACKEND_URL;

  public async addRequest(query: RequestBuddyQuery): Promise<RequestBuddyResponse> {
    const response = await fetch(`${this.baseUrl}/add_request`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
      },
      body: JSON.stringify(query),
    });

    if (!response.ok) {
      const data: ErrorResponse = await response.json();
      throw new Error(data.message || `Error: ${response.statusText}`);
    }

    return response.json();
  }

  public async searchRequest(query: SearchRequestQuery): Promise<SearchRequestResponse> {
    const response = await fetch(`${this.baseUrl}/search_request`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
      },
      body: JSON.stringify(query),
    });

    if (!response.ok) {
      const data: ErrorResponse = await response.json();
      throw new Error(data.message || `Error: ${response.statusText}`);
    }

    const res = await response.json();
    return res;
  }
}

export const findMyBuddyService = new FindMyBuddyService();
