declare global {
  // node_modules\typescript\lib\lib.es2018.asynciterable.d.ts:50
  // node_modules\typescript\lib\lib.esnext.iterator.d.ts:39
  interface AsyncIteratorObject<T = unknown, TReturn = any, TNext = any> {
    /**
     * Returns this iterator.
     */
    [Symbol.asyncIterator](): AsyncIteratorObject<T, TReturn, TNext>

    /**
     * Creates an iterator whose values are the result of applying the callback to the values from this iterator.
     * @param callbackfn A function that accepts up to two arguments to be used to transform values from the underlying iterator.
     */
    map<U>(callbackfn: (value: T, index: number) => U): AsyncIteratorObject<U, undefined, unknown>

    /**
     * Creates an iterator whose values are those from this iterator for which the provided predicate returns true.
     * @param predicate A function that accepts up to two arguments to be used to test values from the underlying iterator.
     */
    filter<S extends T>(
      predicate: (value: T, index: number) => value is S
    ): AsyncIteratorObject<S, undefined, unknown>

    /**
     * Creates an iterator whose values are those from this iterator for which the provided predicate returns true.
     * @param predicate A function that accepts up to two arguments to be used to test values from the underlying iterator.
     */
    filter(
      predicate: (value: T, index: number) => unknown
    ): AsyncIteratorObject<T, undefined, unknown>

    /**
     * Creates an iterator whose values are the values from this iterator, stopping once the provided limit is reached.
     * @param limit The maximum number of values to yield.
     */
    take(limit: number): AsyncIteratorObject<T, undefined, unknown>

    /**
     * Creates an iterator whose values are the values from this iterator after skipping the provided count.
     * @param count The number of values to drop.
     */
    drop(count: number): AsyncIteratorObject<T, undefined, unknown>

    /**
     * Creates an iterator whose values are the result of applying the callback to the values from this iterator and then flattening the resulting iterators or iterables.
     * @param callback A function that accepts up to two arguments to be used to transform values from the underlying iterator into new iterators or iterables to be flattened into the result.
     */
    flatMap<U>(
      callback: (
        value: T,
        index: number
      ) => Iterator<U, unknown, undefined> | Iterable<U, unknown, undefined>
    ): AsyncIteratorObject<U, undefined, unknown>

    /**
     * Calls the specified callback function for all the elements in this iterator. The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function.
     * @param callbackfn A function that accepts up to three arguments. The reduce method calls the callbackfn function one time for each element in the iterator.
     * @param initialValue If initialValue is specified, it is used as the initial value to start the accumulation. The first call to the callbackfn function provides this value as an argument instead of a value from the iterator.
     */
    reduce(callbackfn: (previousValue: T, currentValue: T, currentIndex: number) => T): Promise<T>
    reduce(
      callbackfn: (previousValue: T, currentValue: T, currentIndex: number) => T,
      initialValue: T
    ): Promise<T>

    /**
     * Calls the specified callback function for all the elements in this iterator. The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function.
     * @param callbackfn A function that accepts up to three arguments. The reduce method calls the callbackfn function one time for each element in the iterator.
     * @param initialValue If initialValue is specified, it is used as the initial value to start the accumulation. The first call to the callbackfn function provides this value as an argument instead of a value from the iterator.
     */
    reduce<U>(
      callbackfn: (previousValue: U, currentValue: T, currentIndex: number) => U,
      initialValue: U
    ): Promise<U>

    /**
     * Creates a new array from the values yielded by this iterator.
     */
    toArray(): Promise<T[]>

    /**
     * Performs the specified action for each element in the iterator.
     * @param callbackfn  A function that accepts up to two arguments. forEach calls the callbackfn function one time for each element in the iterator.
     */
    forEach(callbackfn: (value: T, index: number) => void): Promise<void>

    /**
     * Determines whether the specified callback function returns true for any element of this iterator.
     * @param predicate A function that accepts up to two arguments. The some method calls
     * the predicate function for each element in this iterator until the predicate returns a value
     * true, or until the end of the iterator.
     */
    some(predicate: (value: T, index: number) => unknown): Promise<boolean>

    /**
     * Determines whether all the members of this iterator satisfy the specified test.
     * @param predicate A function that accepts up to two arguments. The every method calls
     * the predicate function for each element in this iterator until the predicate returns
     * false, or until the end of this iterator.
     */
    every(predicate: (value: T, index: number) => unknown): Promise<boolean>

    /**
     * Returns the value of the first element in this iterator where predicate is true, and undefined
     * otherwise.
     * @param predicate find calls predicate once for each element of this iterator, in
     * order, until it finds one where predicate returns true. If such an element is found, find
     * immediately returns that element value. Otherwise, find returns undefined.
     */
    find<S extends T>(predicate: (value: T, index: number) => value is S): Promise<S | undefined>
    find(predicate: (value: T, index: number) => unknown): Promise<T | undefined>

    readonly [Symbol.toStringTag]: string
  }
}

export {}
