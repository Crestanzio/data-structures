// optional methods: union, intersection, difference

export class HashSet<T extends string | number> {
  private capacity: number;
  private buckets: Array<T[]>;
  private loadFactor: number;
  private size: number;

  constructor(capacity = 16) {
    this.capacity = capacity;
    this.buckets = Array.from({ length: capacity }, () => []);
    this.loadFactor = 0.75;
    this.size = 0;
  }

  // O(1) average, O(n) worst
  private hash(value: T): number {
    let hashValue = 0;
    const str = String(value);

    for (let index = 0; index < str.length; index++) {
      hashValue = (hashValue << 5) - hashValue + str.charCodeAt(index); // Multiply by 31 (prime number) to avoid collisions
      hashValue = hashValue | 0; // Convert to 32bit integer to avoid float overflow
    }

    return Math.abs(hashValue) % this.capacity; // Convert to possitive number, ensure a valid index array
  }

  // O(1) average, O(n) worst
  private getEntry(value: T) {
    const index = this.hash(value);
    const bucket = this.buckets[index];

    return bucket?.find(entry => entry === value);
  }

  // O(n)
  private resize(): void {
    const oldBuckets = this.buckets;
    this.capacity = this.capacity * 2;
    this.buckets = Array.from({ length: this.capacity }, () => []);

    oldBuckets.forEach(bucket => bucket.forEach(entry => {
      const index = this.hash(entry);
      this.buckets[index]!.push(entry);
    }));
  }

  // O(1) average, O(n) worst
  add(value: T): boolean {
    if (this.has(value)) return false;
    if (this.size / this.capacity >= this.loadFactor) this.resize();

    const index = this.hash(value);
    this.buckets[index]!.push(value);
    this.size++;

    return true;
  }

  // O(1) average, O(n) worst
  has(value: T): boolean {
    return this.getEntry(value) !== undefined;
  }

  // O(1) average, O(n) worst
  delete(value: T): boolean {
    const index = this.hash(value);
    const bucket = this.buckets[index]!;

    const entryIndex = bucket.findIndex(entry => entry === value);
    if (entryIndex === -1) return false;

    bucket.splice(entryIndex, 1);
    this.size--;

    return true;
  }

  // O(n)
  values(): T[] {
    return this.buckets.flat();
  }

  // O(n + m)
  union(other: HashSet<T>): HashSet<T> {
    const capacity = Math.max(this.capacity, other.capacity);
    const result = new HashSet<T>(capacity);

    this.buckets.forEach(bucket => bucket.forEach(value => result.add(value)));
    other.buckets.forEach(bucket => bucket.forEach(value => result.add(value)));

    return result;
  }

  // O(min(n, m))
  intersection(other: HashSet<T>): HashSet<T> {
    const capacity = Math.min(this.capacity, other.capacity);
    const result = new HashSet<T>(capacity);

    const [smaller, larger] = this.size <= other.size ? [this, other] : [other, this];

    smaller.buckets.forEach(bucket => bucket.forEach(value => {
      if (larger.has(value)) result.add(value);
    }))

    return result;
  }

  // O(n)
  difference(other: HashSet<T>): HashSet<T> {
    const result = new HashSet<T>(this.capacity);

    this.buckets.forEach(bucket => bucket.forEach(entry => {
      if (!other.has(entry)) result.add(entry);
    }));

    return result;
  }

  // O(1)
  get length(): number {
    return this.size;
  }
}