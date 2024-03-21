// Import the removeTask function from the Firestore functions file
import { removeTask } from './ourFirestoreFunctionsFile'; // Import the functions you want to test

// Import necessary Firestore functions
import { getFirestore, doc, deleteDoc } from 'firebase/firestore'; // Import necessary Firestore functions

// Mock the Firebase Firestore module to provide fake implementations of Firestore functions
jest.mock('firebase/firestore', () => ({
  getFirestore: jest.fn(), // Mock getFirestore function
  doc: jest.fn(), // Mock doc function
  deleteDoc: jest.fn(), // Mock deleteDoc functionS
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

  // Describe block for testing the removeTask function
  describe('removeTask', () => {
    // Test case: should remove a task from the database
    it('should remove a task from the database', async () => {
      // Mock the deleteDoc function to resolve
      deleteDoc.mockResolvedValueOnce();
      
      // Call the removeTask function with sample task ID
      await removeTask('taskId123');

      // Expect the deleteDoc function to have been called with the correct arguments
      expect(deleteDoc).toHaveBeenCalledWith(doc(mockDb, 'tasks', 'taskId123'));
    });

    // Test case: should handle errors when removing a task
    it('should handle errors when removing a task', async () => {
      // Define an error message for testing
      const errorMessage = 'Error removing task';

      // Mock the deleteDoc function to reject with an error
      deleteDoc.mockRejectedValueOnce(new Error(errorMessage));
      
      // Expect the removeTask function to throw an error with the specified error message
      await expect(removeTask('taskId123')).rejects.toThrow(errorMessage);
    });
  });
});
