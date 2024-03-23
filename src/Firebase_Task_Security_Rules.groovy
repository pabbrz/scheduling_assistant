rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {

    // Allow read and write access to the 'tasks' collection for authenticated users
    match /tasks/{taskId} {
      allow read, write: if request.auth != null;
    }

    // Allow users to create new tasks
    match /tasks/{taskId} {
      allow create: if request.auth != null &&
                      request.resource.data.keys().hasAll(['taskName', 'createdBy', 'createdAt']);
    }

    // Allow users to update their own tasks
    match /tasks/{taskId} {
      allow update: if request.auth != null &&
                      request.resource.data.keys().hasAll(['taskName']) &&
                      resource.data.createdBy == request.auth.uid;
    }

    // Allow users to delete their own tasks
    match /tasks/{taskId} {
      allow delete: if request.auth != null &&
                      resource.data.createdBy == request.auth.uid;
    }

    // Allow users to query the 'tasks' collection based on certain conditions
    match /tasks/{taskId} {
      allow list: if request.auth != null &&
                     request.query.limit <= 10; // For example, limit the number of tasks returned
    }

  }
}
