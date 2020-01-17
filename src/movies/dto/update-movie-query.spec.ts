import { UpdateMovieQueryDto } from './update-movie-query.dto';

const mockMovie = {
  id: 0,
  title: 'Test title',
  description: 'Test description',
  salePrice: 0,
  stock: 0,
  availability: true,
  likes: 0,
  poster: 'test poster',
  trailer: 'test trailer',
  tags: [],
};

describe('UpdateMovieQueryDto', () => {
  describe('constructor', () => {
    it('Should instantiate a UpdateMovieQueryDto', () => {
      const result = new UpdateMovieQueryDto(mockMovie);
      expect(result).toBeInstanceOf(UpdateMovieQueryDto);
    });
  });
});
