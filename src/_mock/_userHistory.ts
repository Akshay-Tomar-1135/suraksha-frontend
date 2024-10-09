// _userHistory.ts
export const _id = (index: number) => `e99f09a7-dd88-49d5-b1c8-1daf80c2d7b${index}`;

// Function to get a source city based on the index
export const _source = (index: number) => [
  'New York',
  'Los Angeles',
  'Chicago',
  'Houston',
  'Phoenix',
  'Philadelphia',
  'San Antonio',
  'San Diego',
  'Dallas',
  'San Jose',
  'Austin',
  'Jacksonville',
  'Fort Worth',
  'Columbus',
][index];

// Function to get a destination city based on the index
export const _destination = (index: number) => [
  'Miami',
  'Atlanta',
  'Las Vegas',
  'Orlando',
  'Tampa',
  'Minneapolis',
  'New Orleans',
  'Salt Lake City',
  'Memphis',
  'Cleveland',
  'Baltimore',
  'Pittsburgh',
  'Cincinnati',
  'Kansas City',
][index];

// Function to get a rating based on the index
export const _ratings = (index: number) => [
  -5, -1, -3, -4, -2, -1, -3, -5, -2, -4, -3, -1, -2, -5,
][index];

// Define your History type
export interface History {
  id: string; // Ensure id is included
  source: string;
  destination: string;
  rating: number;
}

export const mockData = (length: number): History[] => {
  const data: History[] = []; // Specify the type here
  const totalAvailable = 14; // Assuming you have 14 available entries

  for (let i = 0; i < length; i+=1) {
    const index = i % totalAvailable; // Cycle through the available entries
    data.push({
      id: _id(i), // Ensure this function generates a unique id
      source: _source(index) || '',
      destination: _destination(index) || '',
      rating: _ratings(index), // Cycle through the ratings as well
    });
  }
  return data; // Return the mock data
};

// Allow a call without a specific length to return all available entries
export const getAllMockData = (): History[] => mockData(100); // or any appropriate number that represents "all available entries"