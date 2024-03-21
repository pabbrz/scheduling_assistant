import { removeTask } from './ourFirestoreFunctionsFile'; // Import the functions you want to test
import { getFirestore, doc, deleteDoc } from 'firebase/firestore'; // Import necessary Firestore functions

jest.mock('firebase/firestore', () => ({
  getFirestore: jest.fn(),
  collection: jest.fn(),
  addDoc: jest.fn(),
  doc: jest.fn(),
  setDoc: jest.fn(),
  deleteDoc: jest.fn(),
  getDocs: jest.fn(),
}));

describe('Firestore Functions', () => {
  let mockDb;

  beforeAll(() => {
    mockDb = getFirestore();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('removeTask', () => {
    it('should remove a task from the database', async () => {
      deleteDoc.mockResolvedValueOnce();
      
      await removeTask('taskId123');

      expect(deleteDoc).toHaveBeenCalledWith(doc(mockDb, 'tasks', 'taskId123'));
    });

    it('should handle errors when removing a task', async () => {
      const errorMessage = 'Error removing task';
      deleteDoc.mockRejectedValueOnce(new Error(errorMessage));
      
      await expect(removeTask('taskId123')).rejects.toThrow(errorMessage);
    });
  });
});
