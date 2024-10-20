export const _id = (index: number) => `e99f09a7-dd88-49d5-b1c8-1daf80c2d7b${index}`;

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

export const _ratings = (index: number) => [
  -5, -1, -3, -4, -2, -1, -3, -5, -2, -4, -3, -1, -2, -5,
][index];

export const _distance = (index: number) => {
  const distances = ['10 km', '15 km', '20 km', '25 km', '30 km'];
  return distances[index % distances.length];
};

export const _timeTaken = (index: number) => {
  const times = ['1 hr', '2 hrs', '3 hrs', '4 hrs', '5 hrs'];
  return times[index % times.length];
};

export interface History {
  id: string;
  source: string;
  destination: string;
  rating: number;
  distance: string;  // New field
  timeTaken: string; // New field
}

export const mockData = (length: number): History[] => {
  const data: History[] = [];
  const totalAvailable = 14;

  for (let i = 0; i < length; i += 1) {
    const index = i % totalAvailable;
    data.push({
      id: _id(i),
      source: _source(index) || '',
      destination: _destination(index) || '',
      rating: _ratings(index),
      distance: _distance(i),    // Added distance
      timeTaken: _timeTaken(i),  // Added time taken
    });
  }
  return data;
};

export const getAllMockData = (): History[] => mockData(100);
