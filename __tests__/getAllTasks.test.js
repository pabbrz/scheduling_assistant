// Import the getAllTasks function from the Firestore functions file
import { getAllTasks } from './ourFirestoreFunctionsFile'; // Import the functions you want to test

// Import necessary Firestore functions
import { getFirestore, collection, getDocs } from 'firebase/firestore'; // Import necessary Firestore functions

// Mock the Firebase Firestore module to provide fake implementations of Firestore functions
jest.mock('firebase/firestore', () => ({
  getFirestore: jest.fn(), // Mock getFirestore function
  collection: jest.fn(), // Mock collection function
  getDocs: jest.fn(), // Mock getDocs function
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

  // Describe block for testing the getAllTasks function
  describe('getAllTasks', () => {
    // Test case: should get all tasks from the database
    it('should get all tasks from the database', async () => {
      // Create a mock Firestore snapshot with a forEach method
      const mockSnapshot = {
        forEach: jest.fn(),
      };

      // Mock the getDocs function to resolve with the mock snapshot
      getDocs.mockResolvedValueOnce(mockSnapshot);
      
      // Call the getAllTasks function
      await getAllTasks();

      // Expect the getDocs function to have been called with the correct arguments
      expect(getDocs).toHaveBeenCalledWith(collection(mockDb, 'tasks'));
    });

    // Test case: should handle errors when getting all tasks
    it('should handle errors when getting all tasks', async () => {
      // Define an error message for testing
      const errorMessage = 'Error getting tasks';

      // Mock the getDocs function to reject with an error
      getDocs.mockRejectedValueOnce(new Error(errorMessage));
      
      // Expect the getAllTasks function to throw an error with the specified error message
      await expect(getAllTasks()).rejects.toThrow(errorMessage);
    });
  });
});
