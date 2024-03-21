// Import the editTask function from the Firestore functions file
import { editTask } from './ourFirestoreFunctionsFile'; // Import the functions you want to test

// Import necessary Firestore functions
import { getFirestore, doc, setDoc} from 'firebase/firestore'; // Import necessary Firestore functions

// Mock the Firebase Firestore module to provide fake implementations of Firestore functions
jest.mock('firebase/firestore', () => ({
  getFirestore: jest.fn(), // Mock getFirestore function
  doc: jest.fn(), // Mock doc function
  setDoc: jest.fn() // Mock setDoc function
}));

// Describe block for testing Firestore functions
describe('Firestore Functions', () => {
  let mockDb; // Declare a variable to hold the mocked Firestore instance

  // Before all tests, initialize the mocked Firestore instance
  beforeAll(() => {
    mockDb = getFirestore(); // Initialize the mocked Firestore instance
  });

  // After each test, clear all mock function calls
  afterEach(() => {
    jest.clearAllMocks(); // Clear all mock function calls
  });

  // Describe block for testing the editTask function
  describe('editTask', () => {
    // Test case: should edit a task in the database
    it('should edit a task in the database', async () => {
      // Mock the setDoc function to resolve
      setDoc.mockResolvedValueOnce();
      
      // Call the editTask function with sample task ID and updated task name
      await editTask('taskId123', 'Updated Task 1');

      // Expect the setDoc function to have been called with the correct arguments
      expect(setDoc).toHaveBeenCalledWith(
        doc(mockDb, 'tasks', 'taskId123'), // Firestore document reference
        { taskName: 'Updated Task 1' }, // Updated task data
        { merge: true } // Merge option to update existing task
      );
    });

    // Test case: should handle errors when editing a task
    it('should handle errors when editing a task', async () => {
      // Define an error message for testing
      const errorMessage = 'Error editing task';

      // Mock the setDoc function to reject with an error
      setDoc.mockRejectedValueOnce(new Error(errorMessage));
      
      // Expect the editTask function to throw an error with the specified error message
      await expect(editTask('taskId123', 'Updated Task 1')).rejects.toThrow(errorMessage);
    });
  });
});
