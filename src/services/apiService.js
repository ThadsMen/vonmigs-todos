export function fetchTodos (){
    return  [
        {
          task_id: 1,
          title: "Buy groceries",
          description: "Milk, eggs, bread, and fruits",
          completed: false,
          dueDate: "2025-01-10T12:00:00Z",
          assignedTo: "John Doe"
        },
        {
          task_id: 2,
          title: "Complete React project",
          description: "Finish the to-do app with proper styling and testing",
          completed: true,
          dueDate: "2025-01-07T17:00:00Z",
          assignedTo: "Jane Smith"
        },
        {
          task_id: 3,
          title: "Read a book",
          description: "Read at least 50 pages of 'The Great Gatsby'",
          completed: false,
          dueDate: "2025-01-12T09:00:00Z",
          assignedTo: "John Doe"
        },
        {
          task_id: 4,
          title: "Go for a run",
          description: "Run for at least 30 minutes in the park",
          completed: false,
          dueDate: "2025-01-06T07:00:00Z",
          assignedTo: "Jane Smith"
        },
        {
          task_id: 5,
          title: "Pay bills",
          description: "Pay electricity, internet, and water bills",
          completed: false,
          dueDate: "2025-01-15T18:00:00Z",
          assignedTo: "John Doe"
        }
      ];
}

export function fetchStatuses(){
  return ['Not Started','In Progress','Completed','Cancelled']
}