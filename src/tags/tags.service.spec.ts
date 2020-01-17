import { TagsService } from './tags.service';
import { TagsRepository } from './repositories/tags.repository';
import { TestingModule, Test } from '@nestjs/testing';
import { NotFoundException, ConflictException } from '@nestjs/common';

const mockTagsRepository = () => ({
  find: jest.fn(),
  findOne: jest.fn(),
  save: jest.fn(),
});

const mockTag = {
  id: 0,
  title: 'Test tag',
};

const mockTagDto = {
  title: 'Test tag title',
};

describe('TagsService', () => {
  let tagsService: TagsService;
  let tagsRepository: TagsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TagsService, { provide: TagsRepository, useFactory: mockTagsRepository }],
    }).compile();

    tagsService = module.get<TagsService>(TagsService);
    tagsRepository = module.get<TagsRepository>(TagsRepository);
  });

  it('should be defined', () => {
    expect(tagsService).toBeDefined();
    expect(tagsRepository).toBeDefined();
  });

  describe('getAllTags', () => {
    it('Should get all the tags', async () => {
      (tagsRepository.find as jest.Mock).mockResolvedValue('Get all tags');
      const result = await tagsService.getAllTags();
      expect(result).toEqual('Get all tags');
    });
  });

  describe('getSingleTag', () => {
    it('Should get a single tag', async () => {
      (tagsRepository.findOne as jest.Mock).mockResolvedValue(mockTag);
      const result = await tagsService.getSingleTag(0);
      expect(result).toEqual(mockTag);
    });
    it('Should throw an error when the tag does not exist', () => {
      (tagsRepository.findOne as jest.Mock).mockResolvedValue(null);
      expect(tagsService.getSingleTag(1)).rejects.toThrowError(NotFoundException);
    });
  });

  describe('addTag', () => {
    it('Should add a new tag to the repository', async () => {
      (tagsRepository.findOne as jest.Mock).mockResolvedValue(null);
      (tagsRepository.save as jest.Mock).mockResolvedValue(mockTag);
      const result = await tagsService.addTag(mockTagDto);
      expect(result).toEqual(mockTag);
    });
    it('Should throw a conflict error if a tag already exists', () => {
      (tagsRepository.findOne as jest.Mock).mockResolvedValue(mockTag);
      expect(tagsService.addTag(mockTagDto)).rejects.toThrowError(ConflictException);
    });
  });

  describe('updateTag', () => {
    it('Should update a tag', async () => {
      (tagsRepository.findOne as jest.Mock).mockResolvedValue(mockTag);
      (tagsRepository.save as jest.Mock).mockResolvedValue(mockTag);
      const result = await tagsService.updateTag(mockTagDto, 0);
      expect(result).toEqual(mockTag);
    });
    it(`Should throw a conflict error if the tag doesn't exist`, () => {
      (tagsRepository.findOne as jest.Mock).mockResolvedValue(null);
      expect(tagsService.updateTag(mockTagDto, 1)).rejects.toThrowError(NotFoundException);
    });
  });

  describe('deleteTag', () => {
    it('Should delete a tag', async () => {
      (tagsRepository.findOne as jest.Mock).mockResolvedValue(mockTag);
      (tagsRepository.save as jest.Mock).mockResolvedValue('Soft delete tag');
      await tagsService.deleteTag(0);
      expect(tagsRepository.findOne).toHaveBeenCalled();
      expect(tagsRepository.save).toHaveBeenCalled();
    });

    it('Should throw an error if the tag does not exist', () => {
      (tagsRepository.findOne as jest.Mock).mockResolvedValue(null);
      expect(tagsService.deleteTag(0)).rejects.toThrowError(NotFoundException);
    });
  });
});
