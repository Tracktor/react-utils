/**
 * Deep compare two objects
 * @param objectA First object to compare
 * @param objectB Second object to compare
 * @param seenObjects Map to track circular references
 * @throws {Error} When circular references are detected
 */
const isDeepEqualObject = <T>(objectA: T, objectB: T, seenObjects: WeakMap<object, Set<object>> = new WeakMap()): boolean => {
  // Handle primitive object
  if (objectA === objectB) {
    return true;
  }
  // Handle primitive null
  if (objectA === null || objectB === null) {
    return false;
  }

  // Handle non-object types
  if (typeof objectA !== "object" || typeof objectB !== "object") {
    return false;
  }

  // Handle Dates
  if (objectA instanceof Date && objectB instanceof Date) {
    return objectA.getTime() === objectB.getTime();
  }

  // Handle Arrays
  if (Array.isArray(objectA) && Array.isArray(objectB)) {
    if (objectA.length !== objectB.length) return false;
    return objectA.every((val, index) => isDeepEqualObject(val, objectB[index], seenObjects));
  }

  // Check for circular references
  if (!seenObjects.has(objectA)) {
    seenObjects.set(objectA, new Set());
  }

  const seenB = seenObjects.get(objectA)!;

  if (seenB.has(objectB)) {
    throw new Error("Circular reference detected");
  }

  seenB.add(objectB);

  // Get constructor names (handles different types of objects)
  if (objectA.constructor !== objectB.constructor) {
    return false;
  }

  // Compare properties
  const keysA = Object.keys(objectA);
  const keysB = new Set(Object.keys(objectB));

  if (keysA.length !== keysB.size) {
    return false;
  }

  try {
    return keysA.every((key) => {
      if (!keysB.has(key)) {
        return false;
      }
      return isDeepEqualObject((objectA as any)[key], (objectB as any)[key], seenObjects);
    });
  } finally {
    // Clean up the seen set for this comparison
    seenB.delete(objectB);
  }
};

export default isDeepEqualObject;
