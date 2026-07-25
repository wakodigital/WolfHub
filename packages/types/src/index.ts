// User types
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Workspace types
export interface Workspace {
  id: string;
  name: string;
  description?: string;
  ownerId: string;
  isPublic: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Board types
export interface Board {
  id: string;
  workspaceId: string;
  name: string;
  order: number;
  createdAt: Date;
}

// List types
export interface List {
  id: string;
  boardId: string;
  name: string;
  order: number;
  createdAt: Date;
}

// Task types
export interface Task {
  id: string;
  listId: string;
  title: string;
  description?: string;
  dueDate?: Date;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

// Comment types
export interface Comment {
  id: string;
  taskId: string;
  userId: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Auth types
export interface AuthPayload {
  userId: string;
  email: string;
  iat?: number;
  exp?: number;
}
