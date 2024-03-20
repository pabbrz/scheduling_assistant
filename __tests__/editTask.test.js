import { editTask } from './yourFirestoreFunctionsFile'; // Import the functions you want to test
import { getFirestore, doc, setDoc} from 'firebase/firestore'; // Import necessary Firestore functions

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

  describe('editTask', () => {
    it('should edit a task in the database', async () => {
      setDoc.mockResolvedValueOnce();
      
      await editTask('taskId123', 'Updated Task 1');

      expect(setDoc).toHaveBeenCalledWith(doc(mockDb, 'tasks', 'taskId123'), { taskName: 'Updated Task 1' }, { merge: true });
    });

    it('should handle errors when editing a task', async () => {
      const errorMessage = 'Error editing task';
      setDoc.mockRejectedValueOnce(new Error(errorMessage));
      
      await expect(editTask('taskId123', 'Updated Task 1')).rejects.toThrow(errorMessage);
    });
  });
});