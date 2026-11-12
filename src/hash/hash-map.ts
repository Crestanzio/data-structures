// optional methods: resize

export class HashEntry<T> {
  key: string;
  value: T;

  constructor(key: string, value: T) {
    this.key = key;
    this.value = value;
  }
}

export class HashMap<T> {
  private capacity: number;
  private buckets: Array<HashEntry<T>[]>;
  private loadFactor: number;
  private size: number;

  constructor(capacity = 16) {
    this.capacity = capacity;
    this.buckets = Array.from({ length: capacity }, () => []);
    this.loadFactor = 0.75;
    this.size = 0;
  }

  // O(k) k = key length (djb2 hash algorithm)
  private hash(key: string): number {
    let hashValue = 0;

    for (let index = 0; index < key.length; index++) {
      hashValue = (hashValue << 5) - hashValue + key.charCodeAt(index); // Multiply by 31 (prime number) to avoid collisions
      hashValue = hashValue | 0; // Convert to 32bit integer to avoid float overflow
    }

    return Math.abs(hashValue) % this.capacity; // Convert to possitive number, ensure a valid array index
  }

  // O(1) average, O(n) worst
  private getEntry(key: string): HashEntry<T> | undefined {
    const index = this.hash(key);
    const bucket = this.buckets[index];

    return bucket?.find(entry => entry.key === key);
  }

  // O(n)
  private resize(): void {
    const oldBuckets = this.buckets;
    this.capacity = this.capacity * 2;
    this.buckets = Array.from({ length: this.capacity }, () => []);

    oldBuckets.forEach(bucket => bucket.forEach(entry => {
      const index = this.hash(entry.key);
      this.buckets[index]!.push(entry);
    }));
  }

  // O(1) average, O(n) worst
  set(key: string, value: T): void {
    const entry = this.getEntry(key);

    if (entry) {
      entry.value = value;
      return;
    }

    if (this.size / this.capacity >= this.loadFactor) this.resize();

    const index = this.hash(key);
    this.buckets[index]!.push(new HashEntry(key, value));
    this.size++;
  }

  // O(1) average, O(n) worst
  get(key: string): T | undefined {
    return this.getEntry(key)?.value;
  }

  // O(1) average, O(n) worst
  has(key: string): boolean {
    return this.getEntry(key) !== undefined;
  }

  // O(1) average, O(n) worst
  delete(key: string): boolean {
    const index = this.hash(key);
    const bucket = this.buckets[index];

    if (!bucket) return false;

    const entryIndex = bucket.findIndex(entry => entry.key === key);
    if (entryIndex === -1) return false;

    bucket.splice(entryIndex, 1);
    this.size--;

    return true;
  }

  // O(n)
  keys(): string[] {
    return this.buckets.flatMap(bucket => bucket.map(entry => entry.key));
  }

  // O(n)
  values(): T[] {
    return this.buckets.flatMap(bucket => bucket.map(entry => entry.value));
  }

  // O(1)
  get length() {
    return this.size;
  }
}