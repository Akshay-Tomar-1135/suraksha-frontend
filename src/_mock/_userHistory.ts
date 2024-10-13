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

export const _travelMode = (index: number) => [
  'foot',
  'cab',
  'bus',
  'foot',
  'cab',
  'bus',
  'foot',
  'cab',
  'bus',
  'foot',
  'cab',
  'bus',
  'foot',
  'cab',
][index];


export interface History {
  id: string;
  source: string;
  destination: string;
  rating: number;
  travelMode: string;
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
      travelMode: _travelMode(index), 
    });
  }
  return data;
};


export const getAllMockData = (): History[] => mockData(100);
