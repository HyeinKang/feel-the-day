import axios from "axios";

/**
 * Centralized error handler for API-related catches.
 * - Throws cancellation separately
 * - Returns a clean Error instance otherwise
 */
export function handleApiError(error: unknown): Error | "cancel" {
  if (axios.isCancel(error)) {
    return "cancel";
  }

  if (error instanceof Error) {
    return error;
  }

  return new Error("Unknown error occurred");
}
