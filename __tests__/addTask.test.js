// Import the addTask function from the Firestore functions file
import { addTask } from './ourFirestoreFunctionsFile'; // Import the functions you want to test

// Import necessary Firestore functions
import { getFirestore, collection, addDoc} from 'firebase/firestore'; // Import necessary Firestore functions

// Mock the Firebase Firestore module to provide fake implementations of Firestore functions
jest.mock('firebase/firestore', () => ({
  getFirestore: jest.fn(), // Mock getFirestore function
  collection: jest.fn(), // Mock collection function
  addDoc: jest.fn(), // Mock addDoc function
  doc: jest.fn() // Mock doc function
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

  // Describe block for testing the addTask function
  describe('addTask', () => {
    // Test case: should add a task to the database
    it('should add a task to the database', async () => {
      // Mock the addDoc function to resolve with a fake task ID
      addDoc.mockResolvedValueOnce({ id: 'newTaskId' });
      
      // Call the addTask function with sample task data
      await addTask('Task 1', 'User1', new Date());

      // Expect the addDoc function to have been called with the correct arguments
      expect(addDoc).toHaveBeenCalledWith(collection(mockDb, 'tasks'), {
        taskName: 'Task 1',
        createdBy: 'User1',
        createdAt: expect.any(Date), // Check that createdAt is an instance of Date
      });
    });

    // Test case: should handle errors when adding a task
    it('should handle errors when adding a task', async () => {
      // Define an error message for testing
      const errorMessage = 'Error adding task';

      // Mock the addDoc function to reject with an error
      addDoc.mockRejectedValueOnce(new Error(errorMessage));
      
      // Expect the addTask function to throw an error with the specified error message
      await expect(addTask('Task 1', 'User1', new Date())).rejects.toThrow(errorMessage);
    });
  });
});
